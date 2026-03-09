const Officer = require("../../models/officer/Officer");
const asyncHandler = require("express-async-handler");
const User = require("../../models/general/User");
const Complaint = require("../../models/general/Complaint");
const { uploadMultipleToCloudinary } = require("../../utils/cloudinaryHelper");
const { authenticateUser, setCookieToken } = require("../../utils/authHelper");
const { validateUniqueFields } = require("../../utils/validationHelper");
const { syncUserEmail } = require("../../utils/userHelper");

const authOfficer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authenticateUser(Officer, email, password);

  setCookieToken(res, token);

  const officer = await Officer.findOne({ email }).select("name phone").lean();

  res.json({
    _id: user._id,
    name: officer?.name,
    email: user.email,
    phone: officer?.phone,
    role: user.role,
    token,
  });
});

const getOfficerDashboardData = asyncHandler(async (req, res) => {
  const officerProfile = await Officer.findOne({ email: req.user.email })
    .select("_id")
    .lean();

  if (!officerProfile) {
    res.status(404);
    throw new Error("Officer profile not found");
  }

  const [total, inProgress, completed, blocked, activeTasks] = await Promise.all([
    Complaint.countDocuments({ assignedTo: officerProfile._id }),
    Complaint.countDocuments({
      assignedTo: officerProfile._id,
      status: "in_progress",
    }),
    Complaint.countDocuments({
      assignedTo: officerProfile._id,
      status: "resolved",
    }),
    Complaint.countDocuments({
      assignedTo: officerProfile._id,
      status: "blocked",
    }),
    Complaint.find({
      assignedTo: officerProfile._id,
      status: { $in: ["assigned", "reassigned", "in_progress"] },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("department", "name")
      .select("title department location status severity createdAt dueDate")
      .lean(),
  ]);

  res.json({ stats: { total, inProgress, completed, blocked }, activeTasks });
});

const getOfficerActiveTasks = asyncHandler(async (req, res) => {
  const officerProfile = await Officer.findOne({ email: req.user.email })
    .select("_id")
    .lean();

  if (!officerProfile) {
    res.status(404);
    throw new Error("Officer profile not found");
  }

  const activeTasks = await Complaint.find({
    assignedTo: officerProfile._id,
    status: { $in: ["assigned", "reassigned", "in_progress"] },
  })
    .sort({ createdAt: -1 })
    .populate("department", "name")
    .select("title department location status severity createdAt dueDate")
    .lean();

  res.json(activeTasks);
});

const getOfficerProfile = asyncHandler(async (req, res) => {
  const officer = await Officer.findOne({ email: req.user.email })
    .populate("department", "name zone")
    .select("-password")
    .lean();

  if (!officer) {
    res.status(404);
    throw new Error("Officer profile not found");
  }

  const [
    totalAssigned,
    completedComplaints,
    inProgressComplaints,
    resolvedWithRatings,
  ] = await Promise.all([
    Complaint.countDocuments({ assignedTo: officer._id }),
    Complaint.countDocuments({ assignedTo: officer._id, status: "resolved" }),
    Complaint.countDocuments({
      assignedTo: officer._id,
      status: "in_progress",
    }),
    Complaint.find({
      assignedTo: officer._id,
      status: "resolved",
      rating: { $exists: true, $ne: null },
    })
      .select("rating")
      .lean(),
  ]);

  const avgRating =
    resolvedWithRatings.length > 0
      ? (
          resolvedWithRatings.reduce((sum, c) => sum + c.rating, 0) /
          resolvedWithRatings.length
        ).toFixed(1)
      : 0;

  res.json({
    _id: officer._id,
    name: officer.name,
    email: officer.email,
    phone: officer.phone,
    employeeId: officer.employeeId,
    joinedDate: officer.createdAt,
    zone: officer.department ? officer.department.name : "N/A",
    stats: {
      total: totalAssigned,
      completed: completedComplaints,
      inProgress: inProgressComplaints,
      avgRating: parseFloat(avgRating),
    },
  });
});

const getOfficerWorkHistory = asyncHandler(async (req, res) => {
  const officerProfile = await Officer.findOne({ email: req.user.email })
    .select("_id")
    .lean();

  if (!officerProfile) {
    res.status(404);
    throw new Error("Officer profile not found");
  }

  const { page = 1, limit = 20, status } = req.query;
  const skip = (page - 1) * limit;

  const query = {
    $or: [
      { assignedTo: officerProfile._id },
      { "progressUpdates.updatedBy": officerProfile._id },
      { "reassignmentHistory.fromOfficer": officerProfile._id },
    ],
  };

  if (status && status !== "all") {
    if (status === "current") {
      query.assignedTo = officerProfile._id;
      query.status = { $nin: ["resolved", "closed", "reassigned"] };
    } else if (status === "completed") {
      query.status = { $in: ["resolved", "closed"] };
    } else if (status === "reassigned") {
      query.status = "reassigned";
      query.assignedTo = { $ne: officerProfile._id };
    }
  }

  const [workedOnTasks, total] = await Promise.all([
    Complaint.find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("department", "name")
      .populate("assignedTo", "name")
      .select(
        "title department status feedback rating updatedAt assignedTo category",
      )
      .lean(),
    Complaint.countDocuments(query),
  ]);

  const statsQuery = {
    $or: [
      { assignedTo: officerProfile._id },
      { "progressUpdates.updatedBy": officerProfile._id },
      { "reassignmentHistory.fromOfficer": officerProfile._id },
    ],
  };

  const totalCompleted = await Complaint.countDocuments({
    ...statsQuery,
    status: { $in: ["resolved", "closed"] },
  });

  const tasksWithRatings = await Complaint.find({
    ...statsQuery,
    rating: { $exists: true, $ne: null },
  })
    .select("rating")
    .lean();

  const avgRating =
    tasksWithRatings.length > 0
      ? (
          tasksWithRatings.reduce((sum, c) => sum + c.rating, 0) /
          tasksWithRatings.length
        ).toFixed(1)
      : 0;

  const totalFeedback = await Complaint.countDocuments({
    ...statsQuery,
    feedback: { $exists: true, $ne: null },
  });

  res.json({
    stats: {
      completed: totalCompleted,
      avgRating: parseFloat(avgRating),
      totalFeedback,
    },
    history: workedOnTasks.map((task) => ({
      _id: task._id,
      title: task.title,
      category: task.department?.name || "N/A",
      completedDate: task.updatedAt,
      feedback: task.feedback,
      rating: task.rating,
      status: task.status,
      assignedTo: task.assignedTo,
    })),
    currentPage: parseInt(page),
    totalPages: Math.ceil(total / limit),
    total,
  });
});

const getOfficerAssignedTasks = asyncHandler(async (req, res) => {
  const officerProfile = await Officer.findOne({ email: req.user.email })
    .select("_id")
    .lean();

  if (!officerProfile) {
    res.status(404);
    throw new Error("Officer profile not found");
  }

  const { status, page = 1, limit = 20 } = req.query;
  const query = { assignedTo: officerProfile._id };

  if (status && status !== "all") {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Complaint.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("department", "name")
      .select("title department location status severity createdAt dueDate")
      .lean(),
    Complaint.countDocuments(query),
  ]);

  res.json({
    tasks,
    currentPage: parseInt(page),
    totalPages: Math.ceil(total / limit),
    total,
  });
});

const getTaskById = asyncHandler(async (req, res) => {
  const officerProfile = await Officer.findOne({ email: req.user.email })
    .select("_id")
    .lean();

  if (!officerProfile) {
    res.status(404);
    throw new Error("Officer profile not found");
  }

  const task = await Complaint.findOne({
    _id: req.params.id,
    $or: [
      { assignedTo: officerProfile._id },
      { "progressUpdates.updatedBy": officerProfile._id },
      { "reassignmentHistory.fromOfficer": officerProfile._id },
    ],
  })
    .populate("citizen", "name email phone")
    .populate("department", "name")
    .populate("assignedTo", "name email")
    .populate("progressUpdates.updatedBy", "name employeeId")
    .populate("timeline.updatedBy", "name employeeId")
    .populate("timeline.metadata.fromOfficer", "name employeeId")
    .populate("timeline.metadata.toOfficer", "name employeeId")
    .lean();

  if (!task) {
    res.status(404);
    throw new Error("Task not found or you do not have access to view it");
  }

  res.json(task);
});

const updateTaskProgress = asyncHandler(async (req, res) => {
  const { status, remarks } = req.body;

  const officerProfile = await Officer.findOne({ email: req.user.email })
    .select("_id")
    .lean();

  if (!officerProfile) {
    res.status(404);
    throw new Error("Officer profile not found");
  }

  const task = await Complaint.findOne({
    _id: req.params.id,
    assignedTo: officerProfile._id,
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found or not assigned to you");
  }

  let uploadedImages = [];
  if (req.files && req.files.length > 0) {
    try {
      uploadedImages = await uploadMultipleToCloudinary(
        req.files,
        "civicpulse_progress",
      );
    } catch (error) {
      res.status(500);
      throw new Error("Failed to upload images");
    }
  }

  task.progressUpdates.unshift({
    status,
    remarks,
    images: uploadedImages,
    updatedBy: officerProfile._id,
  });

  if (status === "resolved") {
    task.status = "resolved";
    task.resolutionDetails = remarks;
    task.resolutionDate = new Date();

    task.timeline.unshift({
      eventType: "completed",
      status: "resolved",
      description: remarks || "Road repaired successfully",
      updatedBy: officerProfile._id,
      updatedByModel: "Officer",
      images: uploadedImages,
      date: new Date(),
    });
  } else {
    task.status = status;

    let eventType = "status_change";
    if (status === "in_progress") {
      eventType = "in_progress";
    } else if (status === "accepted" || status === "assigned") {
      eventType = "accepted";
    }

    task.timeline.unshift({
      eventType: eventType,
      status: status,
      description: remarks,
      updatedBy: officerProfile._id,
      updatedByModel: "Officer",
      images: uploadedImages,
      date: new Date(),
    });
  }

  await task.save();

  const updatedTask = await Complaint.findById(task._id)
    .populate("citizen", "name email phone")
    .populate("department", "name")
    .populate("progressUpdates.updatedBy", "name employeeId")
    .lean();

  res.json(updatedTask);
});

const updateOfficerProfile = asyncHandler(async (req, res) => {
  const officer = await Officer.findOne({ email: req.user.email });

  if (!officer) {
    res.status(404);
    throw new Error("Officer profile not found");
  }

  const updateData = {};
  if (req.body.email && req.body.email !== officer.email) {
    await validateUniqueFields(Officer, { email: req.body.email }, officer._id);
    updateData.email = req.body.email;
  }
  if (req.body.phone && req.body.phone !== officer.phone) {
    await validateUniqueFields(Officer, { phone: req.body.phone }, officer._id);
    updateData.phone = req.body.phone;
  }

  const oldEmail = officer.email;
  officer.name = req.body.name || officer.name;
  officer.phone = updateData.phone || officer.phone;
  officer.email = updateData.email || officer.email;

  if (req.body.password) {
    officer.password = req.body.password;
  }

  await officer.save();

  if (updateData.email) {
    await syncUserEmail(oldEmail, updateData.email, "officer", {
      department: officer.department,
    });
  }

  res.json({
    _id: officer._id,
    name: officer.name,
    email: officer.email,
    phone: officer.phone,
    employeeId: officer.employeeId,
  });
});

module.exports = {
  authOfficer,
  getOfficerDashboardData,
  getOfficerActiveTasks,
  getOfficerProfile,
  updateOfficerProfile,
  getOfficerWorkHistory,
  getOfficerAssignedTasks,
  getTaskById,
  updateTaskProgress,
};
