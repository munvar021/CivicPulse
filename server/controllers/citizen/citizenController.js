const asyncHandler = require("express-async-handler");
const Citizen = require("../../models/citizen/Citizen");
const User = require("../../models/general/User");
const Complaint = require("../../models/general/Complaint");
const { authenticateUser, setCookieToken } = require("../../utils/authHelper");
const { validateUniqueFields } = require("../../utils/validationHelper");
const { syncUserEmail, ensureUserExists } = require("../../utils/userHelper");
const generateToken = require("../../utils/generateToken");

const registerCitizen = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  await validateUniqueFields(Citizen, { email, phone });

  const citizen = await Citizen.create({ name, email, password, phone });
  const user = await User.create({ email: citizen.email, role: "citizen" });
  const token = generateToken(user._id);

  setCookieToken(res, token);

  res.status(201).json({
    _id: user._id,
    name: citizen.name,
    email: citizen.email,
    phone: citizen.phone,
    role: user.role,
    token,
  });
});

const loginCitizen = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authenticateUser(Citizen, email, password);

  setCookieToken(res, token);

  const citizen = await Citizen.findOne({ email }).select("name phone").lean();

  res.json({
    _id: user._id,
    name: citizen.name,
    email: user.email,
    phone: citizen.phone,
    role: user.role,
    token,
  });
});

const getCitizenProfile = asyncHandler(async (req, res) => {
  const citizen = await Citizen.findOne({ email: req.user.email })
    .select("-password")
    .lean();

  if (!citizen) {
    res.status(404);
    throw new Error("Citizen not found");
  }

  res.json({
    _id: citizen._id,
    name: citizen.name,
    email: citizen.email,
    phone: citizen.phone,
    role: req.user.role,
    createdAt: citizen.createdAt,
  });
});

const updateCitizenProfile = asyncHandler(async (req, res) => {
  const citizen = await Citizen.findOne({ email: req.user.email });

  if (!citizen) {
    res.status(404);
    throw new Error("Citizen not found");
  }

  const updateData = {};
  if (req.body.email && req.body.email !== citizen.email) {
    await validateUniqueFields(Citizen, { email: req.body.email }, citizen._id);
    updateData.email = req.body.email;
  }
  if (req.body.phone && req.body.phone !== citizen.phone) {
    await validateUniqueFields(Citizen, { phone: req.body.phone }, citizen._id);
    updateData.phone = req.body.phone;
  }

  const oldEmail = citizen.email;
  citizen.name = req.body.name || citizen.name;
  citizen.phone = updateData.phone || citizen.phone;
  citizen.email = updateData.email || citizen.email;

  if (req.body.password) {
    citizen.password = req.body.password;
  }

  await citizen.save();

  if (updateData.email) {
    await syncUserEmail(oldEmail, updateData.email, "citizen");
  } else {
    await ensureUserExists(citizen.email, "citizen");
  }

  res.json({
    _id: citizen._id,
    name: citizen.name,
    email: citizen.email,
    phone: citizen.phone,
    role: req.user.role,
    createdAt: citizen.createdAt,
  });
});

const getCitizenDashboardData = asyncHandler(async (req, res) => {
  const citizen = await Citizen.findOne({ email: req.user.email })
    .select("_id")
    .lean();

  if (!citizen) {
    res.status(404);
    throw new Error("Citizen not found");
  }

  const citizenId = citizen._id;

  const [total, inProgress, resolved, escalated, recentComplaints] =
    await Promise.all([
      Complaint.countDocuments({ citizen: citizenId }),
      Complaint.countDocuments({ citizen: citizenId, status: "in_progress" }),
      Complaint.countDocuments({ citizen: citizenId, status: "resolved" }),
      Complaint.countDocuments({ citizen: citizenId, isEscalated: true }),
      Complaint.find({ citizen: citizenId })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

  res.json({
    stats: { total, inProgress, resolved, escalated },
    recentComplaints,
  });
});

const getMyComplaints = asyncHandler(async (req, res) => {
  const citizen = await Citizen.findOne({ email: req.user.email })
    .select("_id")
    .lean();

  if (!citizen) {
    res.status(404);
    throw new Error("Citizen not found");
  }

  const { status, page = 1, limit = 20 } = req.query;
  const query = { citizen: citizen._id };

  if (
    status &&
    [
      "pending",
      "assigned",
      "in_progress",
      "resolved",
      "closed",
      "rejected",
    ].includes(status)
  ) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const [complaints, total] = await Promise.all([
    Complaint.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("department", "name")
      .populate("assignedTo", "name")
      .lean(),
    Complaint.countDocuments(query),
  ]);

  res.json({
    complaints,
    currentPage: parseInt(page),
    totalPages: Math.ceil(total / limit),
    total,
  });
});

module.exports = {
  registerCitizen,
  loginCitizen,
  getCitizenProfile,
  updateCitizenProfile,
  getCitizenDashboardData,
  getMyComplaints,
};
