const Admin = require("../../models/admin/Admin");
const Officer = require("../../models/officer/Officer");
const User = require("../../models/general/User");
const Complaint = require("../../models/general/Complaint");
const asyncHandler = require("express-async-handler");
const { authenticateUser, setCookieToken } = require("../../utils/authHelper");
const { validateUniqueFields } = require("../../utils/validationHelper");
const {
  syncUserEmail,
  ensureUserExists,
  deleteUserByEmail,
} = require("../../utils/userHelper");
const {
  buildComplaintQuery,
  getPaginationParams,
  buildPaginatedResponse,
} = require("../../utils/queryHelper");

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authenticateUser(Admin, email, password);

  setCookieToken(res, token);

  const admin = await Admin.findOne({ email }).select("name phone").lean();

  res.json({
    _id: user._id,
    name: admin?.name,
    email: user.email,
    phone: admin?.phone,
    role: user.role,
    token,
  });
});

const getOfficers = asyncHandler(async (req, res) => {
  const officers = await Officer.find({ department: req.user.department })
    .populate("department", "name")
    .sort({ createdAt: -1 })
    .lean();
  res.json(officers);
});

const createOfficer = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  await validateUniqueFields(Officer, { email, phone });

  const officer = await Officer.create({
    name,
    email,
    password,
    phone,
    department: req.user.department,
    role: "officer",
  });

  await User.create({
    email,
    role: "officer",
    department: req.user.department,
  });

  const populatedOfficer = await Officer.findById(officer._id)
    .populate("department", "name")
    .lean();

  res.status(201).json(populatedOfficer);
});

const updateOfficer = asyncHandler(async (req, res) => {
  const officer = await Officer.findById(req.params.id);

  if (!officer) {
    res.status(404);
    throw new Error("Officer not found");
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
  officer.email = updateData.email || officer.email;
  officer.phone = updateData.phone || officer.phone;

  if (req.body.password) {
    officer.password = req.body.password;
  }

  await officer.save();

  if (updateData.email) {
    await syncUserEmail(oldEmail, updateData.email, "officer");
  } else {
    await ensureUserExists(oldEmail, "officer");
  }

  const populatedOfficer = await Officer.findById(officer._id)
    .populate("department", "name")
    .lean();

  res.json(populatedOfficer);
});

const deleteOfficer = asyncHandler(async (req, res) => {
  const officer = await Officer.findById(req.params.id);

  if (
    !officer ||
    officer.department.toString() !== req.user.department.toString()
  ) {
    res.status(404);
    throw new Error("Officer not found or not in your department");
  }

  await deleteUserByEmail(officer.email);
  await officer.deleteOne();

  res.json({ message: "Officer removed" });
});

const getMe = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ email: req.user.email })
    .populate("department", "name")
    .populate("zone", "name")
    .select("-password")
    .lean();

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  res.json(admin);
});

const updateAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ email: req.user.email });

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  const updateData = {};
  if (req.body.email && req.body.email !== admin.email) {
    await validateUniqueFields(Admin, { email: req.body.email }, admin._id);
    updateData.email = req.body.email;
  }
  if (req.body.phone && req.body.phone !== admin.phone) {
    await validateUniqueFields(Admin, { phone: req.body.phone }, admin._id);
    updateData.phone = req.body.phone;
  }

  const oldEmail = admin.email;
  admin.name = req.body.name || admin.name;
  admin.phone = updateData.phone || admin.phone;
  admin.email = updateData.email || admin.email;

  if (req.body.password) {
    admin.password = req.body.password;
  }

  await admin.save();

  if (updateData.email) {
    await syncUserEmail(oldEmail, updateData.email, "admin", {
      department: admin.department,
    });
  }

  await admin.populate("department", "name");

  res.json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    employeeId: admin.employeeId,
    department: admin.department,
  });
});

const getAdminDashboardData = asyncHandler(async (req, res) => {
  if (!req.user.department) {
    res.status(404);
    throw new Error("Admin department not found");
  }

  const departmentId = req.user.department;
  const now = new Date();

  const [pending, reassigned, inProgress, resolved, delayed, recentComplaints] =
    await Promise.all([
      Complaint.countDocuments({ department: departmentId, status: "pending" }),
      Complaint.countDocuments({
        department: departmentId,
        status: "reassigned",
      }),
      Complaint.countDocuments({
        department: departmentId,
        status: "in-progress",
      }),
      Complaint.countDocuments({
        department: departmentId,
        status: "resolved",
      }),
      Complaint.countDocuments({
        department: departmentId,
        status: { $nin: ["resolved", "closed"] },
        dueDate: { $lt: now },
      }),
      Complaint.find({ department: departmentId })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("citizen", "name")
        .populate("department", "name")
        .select(
          "title description status severity priority category location createdAt",
        )
        .lean(),
    ]);

  res.json({
    stats: { pending, reassigned, inProgress, resolved, delayed },
    recentComplaints,
  });
});

const getRecentComplaints = asyncHandler(async (req, res) => {
  if (!req.user.department) {
    res.status(404);
    throw new Error("Admin department not found");
  }

  const recentComplaints = await Complaint.find({
    department: req.user.department,
  })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("citizen", "name")
    .populate("department", "name")
    .select(
      "title description status severity priority category location createdAt",
    )
    .lean();

  res.json(recentComplaints);
});

const getComplaints = asyncHandler(async (req, res) => {
  if (!req.user.department) {
    res.status(404);
    throw new Error("Admin department not found");
  }

  const { status, priority, category, page, limit } = req.query;
  const {
    skip,
    limit: limitNum,
    page: pageNum,
  } = getPaginationParams(page, limit);

  const query = buildComplaintQuery(
    { department: req.user.department },
    { status, priority, category },
  );

  const [complaints, total] = await Promise.all([
    Complaint.find(query)
      .populate("citizen", "name")
      .populate("assignedTo", "name")
      .populate("department", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Complaint.countDocuments(query),
  ]);

  res.json({
    complaints,
    currentPage: pageNum,
    totalPages: Math.ceil(total / limitNum),
    total,
  });
});

const getComplaintById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined" || id === "null") {
    res.status(400);
    throw new Error("Invalid complaint ID");
  }

  const complaint = await Complaint.findById(id)
    .populate("citizen", "name email")
    .populate("department", "name")
    .populate({
      path: "assignedTo",
      populate: { path: "department", select: "name" },
    })
    .populate("progressUpdates.updatedBy", "name employeeId")
    .populate("timeline.updatedBy", "name employeeId")
    .populate("timeline.metadata.fromOfficer", "name employeeId")
    .populate("timeline.metadata.toOfficer", "name employeeId")
    .lean();

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }

  res.json(complaint);
});

const getEscalatedComplaints = asyncHandler(async (req, res) => {
  if (!req.user.department) {
    res.status(404);
    throw new Error("Admin department not found");
  }

  const { page, limit } = req.query;
  const {
    skip,
    limit: limitNum,
    page: pageNum,
  } = getPaginationParams(page, limit);

  const query = {
    department: req.user.department,
    status: { $nin: ["resolved", "closed"] },
    dueDate: { $lt: new Date() },
  };

  const [complaints, total] = await Promise.all([
    Complaint.find(query)
      .populate("citizen", "name")
      .populate("assignedTo", "name")
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Complaint.countDocuments(query),
  ]);

  res.json({
    complaints,
    currentPage: pageNum,
    totalPages: Math.ceil(total / limitNum),
    total,
  });
});

const getReports = asyncHandler(async (req, res) => {
  if (!req.user.department) {
    res.status(404);
    throw new Error("Admin department not found");
  }

  const { period } = req.query;
  const departmentId = req.user.department;

  let startDate;
  const endDate = new Date();

  switch (period) {
    case "weekly":
      startDate = new Date(endDate.setDate(endDate.getDate() - 7));
      break;
    case "monthly":
      startDate = new Date(endDate.setMonth(endDate.getMonth() - 1));
      break;
    case "quarterly":
      startDate = new Date(endDate.setMonth(endDate.getMonth() - 3));
      break;
    default:
      startDate = new Date(endDate.setMonth(endDate.getMonth() - 1));
  }

  const complaints = await Complaint.find({
    department: departmentId,
    createdAt: { $gte: startDate, $lte: new Date() },
  })
    .select("status createdAt resolutionDate severity")
    .lean();

  const stats = complaints.reduce(
    (acc, c) => {
      acc.received++;
      if (c.status === "resolved") acc.resolved++;
      if (c.status === "pending" || c.status === "in-progress") acc.pending++;
      if (c.status === "reassigned") acc.reassigned++;
      return acc;
    },
    { received: 0, resolved: 0, pending: 0, reassigned: 0 },
  );

  const priorityBreakdown = ["low", "medium", "high", "critical"].map(
    (priority) => {
      const priorityComplaints = complaints.filter(
        (c) => c.severity === priority,
      );
      const resolved = priorityComplaints.filter(
        (c) => c.status === "resolved",
      ).length;

      return {
        priority: priority.charAt(0).toUpperCase() + priority.slice(1),
        total: priorityComplaints.length,
        resolved,
        pending: priorityComplaints.length - resolved,
      };
    },
  );

  res.json({ overallStats: stats, priorityBreakdown });
});

const getAdminProfileStats = asyncHandler(async (req, res) => {
  if (!req.user.department) {
    res.status(404);
    throw new Error("Admin department not found");
  }

  const departmentId = req.user.department;

  const [totalManaged, resolved, pending, resolvedWithDates] =
    await Promise.all([
      Complaint.countDocuments({ department: departmentId }),
      Complaint.countDocuments({
        department: departmentId,
        status: "resolved",
      }),
      Complaint.countDocuments({
        department: departmentId,
        status: { $in: ["pending", "in-progress"] },
      }),
      Complaint.find({
        department: departmentId,
        status: "resolved",
        resolutionDate: { $exists: true, $ne: null },
      })
        .select("createdAt resolutionDate")
        .lean(),
    ]);

  const totalResolutionTimeMs = resolvedWithDates.reduce((sum, c) => {
    return sum + (c.resolutionDate.getTime() - c.createdAt.getTime());
  }, 0);

  const avgResolutionTime =
    resolvedWithDates.length > 0
      ? (
          totalResolutionTimeMs /
          resolvedWithDates.length /
          (1000 * 60 * 60 * 24)
        ).toFixed(1) + " days"
      : "0 days";

  res.json({ totalManaged, resolved, pending, avgResolutionTime });
});

const assignComplaint = asyncHandler(async (req, res) => {
  const { officer, priority, dueDate, instructions } = req.body;
  const { id } = req.params;

  if (!id || id === "undefined" || id === "null") {
    res.status(400);
    throw new Error("Invalid complaint ID");
  }

  const complaint = await Complaint.findById(id);

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }

  const adminProfile = await Admin.findOne({ email: req.user.email })
    .select("_id name")
    .lean();

  complaint.assignedTo = officer;
  complaint.severity = priority;
  complaint.dueDate = dueDate;
  complaint.instructions = instructions;
  complaint.status = "assigned";

  complaint.timeline.unshift({
    eventType: "assigned",
    status: "assigned",
    description: `Assigned to road maintenance officer`,
    updatedBy: adminProfile?._id || req.user._id,
    updatedByModel: "Admin",
    date: new Date(),
  });

  await complaint.save();

  await complaint.populate("assignedTo", "name email phone");

  res.json(complaint);
});

const updateDueDate = asyncHandler(async (req, res) => {
  const { dueDate, reason } = req.body;
  const { id } = req.params;

  if (!id || id === "undefined" || id === "null") {
    res.status(400);
    throw new Error("Invalid complaint ID");
  }

  const complaint = await Complaint.findById(id);

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }

  const adminProfile = await Admin.findOne({ email: req.user.email })
    .select("_id name")
    .lean();
  const oldDueDate = complaint.dueDate;

  complaint.dueDate = dueDate;

  complaint.timeline.unshift({
    eventType: "due_date_updated",
    status: complaint.status,
    description: reason || "Due date updated",
    updatedBy: adminProfile?._id || req.user._id,
    updatedByModel: "Admin",
    metadata: {
      oldDueDate: oldDueDate,
      newDueDate: dueDate,
      reason: reason || "Due date updated",
    },
    date: new Date(),
  });

  await complaint.save();

  res.json(complaint);
});

const updateAssignment = asyncHandler(async (req, res) => {
  const { officer, dueDate } = req.body;
  const { id } = req.params;

  if (!id || id === "undefined" || id === "null") {
    res.status(400);
    throw new Error("Invalid complaint ID");
  }

  const complaint = await Complaint.findById(id);

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }

  complaint.assignedTo = officer;
  complaint.dueDate = dueDate;

  await complaint.save();

  await complaint.populate([
    { path: "assignedTo", select: "name email phone" },
    { path: "citizen", select: "name email" },
    { path: "department", select: "name" },
  ]);

  res.json(complaint);
});

const reassignComplaint = asyncHandler(async (req, res) => {
  const { officer, reason, dueDate } = req.body;
  const { id } = req.params;

  if (!id || id === "undefined" || id === "null") {
    res.status(400);
    throw new Error("Invalid complaint ID");
  }

  const complaint = await Complaint.findById(id);

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }

  const newOfficer = await Officer.findById(officer);

  if (!newOfficer) {
    res.status(404);
    throw new Error("Officer not found");
  }

  const adminProfile = await Admin.findOne({ email: req.user.email })
    .select("_id name")
    .lean();

  complaint.reassignmentHistory.push({
    fromOfficer: complaint.assignedTo,
    toOfficer: officer,
    reason,
    newDueDate: dueDate,
    reassignedBy: adminProfile?._id || req.user._id,
    reassignedAt: new Date(),
  });

  complaint.assignedTo = officer;
  complaint.dueDate = dueDate;
  complaint.status = "reassigned";

  complaint.timeline.unshift({
    eventType: "reassigned",
    status: "reassigned",
    description: reason || "Area reassignment",
    updatedBy: adminProfile?._id || req.user._id,
    updatedByModel: "Admin",
    metadata: {
      fromOfficer: complaint.assignedTo,
      toOfficer: officer,
      reason: reason,
    },
    date: new Date(),
  });

  complaint.progressUpdates.unshift({
    status: "reassigned",
    remarks: `Reassigned By: ${adminProfile?.name || req.user.name || "Admin"}\nReassigned To: ${newOfficer.name}\nDue Date: ${new Date(dueDate).toLocaleDateString()}\nReason: ${reason.replace(/\n/g, " ")}`,
    updatedBy: adminProfile?._id || req.user._id,
  });

  await complaint.save();

  await complaint.populate([
    { path: "assignedTo", select: "name email phone" },
    { path: "citizen", select: "name email" },
    { path: "department", select: "name" },
    { path: "progressUpdates.updatedBy", select: "name" },
    { path: "reassignmentHistory.fromOfficer", select: "name employeeId" },
    { path: "reassignmentHistory.toOfficer", select: "name employeeId" },
    { path: "reassignmentHistory.reassignedBy", select: "name" },
  ]);

  res.json(complaint);
});

const verifyComplaint = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined" || id === "null") {
    res.status(400);
    throw new Error("Invalid complaint ID");
  }

  const complaint = await Complaint.findById(id);

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }

  const adminProfile = await Admin.findOne({ email: req.user.email })
    .select("_id name")
    .lean();

  complaint.timeline.unshift({
    eventType: "verified",
    status: complaint.status,
    description: "Complaint verified and approved",
    updatedBy: adminProfile?._id || req.user._id,
    updatedByModel: "Admin",
    date: new Date(),
  });

  await complaint.save();

  res.json({ message: "Complaint verified successfully" });
});

module.exports = {
  authAdmin,
  getOfficers,
  createOfficer,
  updateOfficer,
  deleteOfficer,
  getMe,
  updateAdminProfile,
  getAdminDashboardData,
  getRecentComplaints,
  getComplaints,
  getComplaintById,
  getEscalatedComplaints,
  getReports,
  getAdminProfileStats,
  assignComplaint,
  updateDueDate,
  updateAssignment,
  reassignComplaint,
  verifyComplaint,
};
