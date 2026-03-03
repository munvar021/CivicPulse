const SuperAdmin = require("../../models/superAdmin/SuperAdmin");
const asyncHandler = require("express-async-handler");
const Complaint = require("../../models/general/Complaint");
const Zone = require("../../models/superAdmin/Zone");
const Setting = require("../../models/general/Setting");
const { stringify } = require('csv-stringify');
const { authenticateUser, setCookieToken } = require("../../utils/authHelper");
const { generateToken } = require("../../utils/generateToken");

const registerSuperAdmin = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const existingSuperAdmin = await SuperAdmin.findOne({ email });
  if (existingSuperAdmin) {
    res.status(400);
    throw new Error("SuperAdmin with this email already exists");
  }

  const superAdmin = await SuperAdmin.create({
    name,
    email,
    phone,
    password,
    role: "superAdmin",
  });

  if (superAdmin) {
    const token = generateToken(superAdmin._id);
    setCookieToken(res, token);

    res.status(201).json({
      _id: superAdmin._id,
      name: superAdmin.name,
      email: superAdmin.email,
      phone: superAdmin.phone,
      role: superAdmin.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid SuperAdmin data");
  }
});

const authSuperAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authenticateUser(SuperAdmin, email, password);
  
  setCookieToken(res, token);
  
  res.json({
    _id: user._id,
    email: user.email,
    role: user.role,
  });
});

const getSuperAdminDashboardData = asyncHandler(async (req, res) => {
  const now = new Date();
  const resolutionTimelines = await Setting.findOne({ key: 'resolutionTimelines' }).lean();
  const timelines = resolutionTimelines?.value || { high: 24, medium: 72, low: 168 };

  const [totalComplaints, pendingComplaints, inProgressComplaints, resolvedComplaints, delayedComplaints, recentComplaints] = await Promise.all([
    Complaint.countDocuments(),
    Complaint.countDocuments({ status: 'pending' }),
    Complaint.countDocuments({ status: 'in_progress' }),
    Complaint.countDocuments({ status: 'resolved' }),
    Complaint.countDocuments({
      status: { $in: ['pending', 'in_progress', 'assigned'] },
      $expr: {
        $gt: [
          { $subtract: [now, "$createdAt"] },
          {
            $switch: {
              branches: [
                { case: { $eq: ["$severity", "high"] }, then: timelines.high * 60 * 60 * 1000 },
                { case: { $eq: ["$severity", "medium"] }, then: timelines.medium * 60 * 60 * 1000 },
                { case: { $eq: ["$severity", "low"] }, then: timelines.low * 60 * 60 * 1000 },
              ],
              default: timelines.medium * 60 * 60 * 1000
            }
          }
        ]
      }
    }),
    Complaint.find().sort({ createdAt: -1 }).limit(5).lean()
  ]);

  res.json({
    stats: {
      total: totalComplaints,
      pending: pendingComplaints,
      inProgress: inProgressComplaints,
      resolved: resolvedComplaints,
      delayed: delayedComplaints,
    },
    recentComplaints,
  });
});

const getSuperAdminReports = asyncHandler(async (req, res) => {
  const { period = 'monthly' } = req.query;

  const getStartDate = (period) => {
    const now = new Date();
    const dateMap = {
      weekly: () => new Date(now.setDate(now.getDate() - 7)),
      monthly: () => new Date(now.setMonth(now.getMonth() - 1)),
      quarterly: () => new Date(now.setMonth(now.getMonth() - 3)),
      yearly: () => new Date(now.setFullYear(now.getFullYear() - 1)),
    };
    return dateMap[period] ? dateMap[period]() : null;
  };

  const startDate = getStartDate(period);
  const dateFilter = startDate ? { createdAt: { $gte: startDate } } : {};

  const [totalComplaints, resolvedComplaints, complaintsForAvgTime, zones] = await Promise.all([
    Complaint.countDocuments(dateFilter),
    Complaint.countDocuments({ status: { $in: ['resolved', 'closed'] }, ...dateFilter }),
    Complaint.find({ status: { $in: ['resolved', 'closed'] }, ...dateFilter }).lean(),
    Zone.find({}).lean()
  ]);

  const pendingComplaints = totalComplaints - resolvedComplaints;

  let totalResolutionTime = 0;
  let resolvedComplaintsWithTime = 0;
  complaintsForAvgTime.forEach(c => {
    if (c.resolutionDate) {
      totalResolutionTime += c.resolutionDate.getTime() - c.createdAt.getTime();
      resolvedComplaintsWithTime++;
    }
  });
  const avgResolutionTime = resolvedComplaintsWithTime > 0 
    ? (totalResolutionTime / resolvedComplaintsWithTime / (1000 * 60 * 60 * 24)).toFixed(1) + " days" 
    : null;

  const zoneComparison = await Promise.all(zones.map(async (zone) => {
    const complaintsInZone = await Complaint.find({
      location: {
        $geoWithin: {
          $geometry: zone.location,
        },
      },
      ...dateFilter,
    }).lean();

    const total = complaintsInZone.length;
    const resolved = complaintsInZone.filter(c => c.status === 'resolved' || c.status === 'closed').length;

    return {
      zone: zone.name,
      total,
      resolved,
      efficiency: total > 0 ? `${((resolved / total) * 100).toFixed(0)}%` : '0%',
    };
  }));

  res.json({
    stats: {
      total: totalComplaints,
      resolved: resolvedComplaints,
      pending: pendingComplaints,
      avgTime: avgResolutionTime,
    },
    zoneComparison,
    filters: {
      period: ['weekly', 'monthly', 'quarterly', 'yearly']
    }
  });
});

const exportSuperAdminReports = asyncHandler(async (req, res) => {
  const { period = 'monthly' } = req.query;

  const getStartDate = (period) => {
    const now = new Date();
    const dateMap = {
      weekly: () => new Date(now.setDate(now.getDate() - 7)),
      monthly: () => new Date(now.setMonth(now.getMonth() - 1)),
      quarterly: () => new Date(now.setMonth(now.getMonth() - 3)),
      yearly: () => new Date(now.setFullYear(now.getFullYear() - 1)),
    };
    return dateMap[period] ? dateMap[period]() : null;
  };

  const startDate = getStartDate(period);
  const dateFilter = startDate ? { createdAt: { $gte: startDate } } : {};

  const [totalComplaints, resolvedComplaints, pendingComplaints, complaintsForAvgTime, zones] = await Promise.all([
    Complaint.countDocuments(dateFilter),
    Complaint.countDocuments({ status: 'resolved', ...dateFilter }),
    Complaint.countDocuments({ status: 'in_progress', ...dateFilter }),
    Complaint.find({ status: { $in: ['resolved', 'closed'] }, ...dateFilter }).lean(),
    Zone.find({}).lean()
  ]);

  let totalResolutionTime = 0;
  let resolvedComplaintsWithTime = 0;
  complaintsForAvgTime.forEach(c => {
    if (c.resolutionDate) {
      totalResolutionTime += c.resolutionDate.getTime() - c.createdAt.getTime();
      resolvedComplaintsWithTime++;
    }
  });
  const avgResolutionTime = resolvedComplaintsWithTime > 0 
    ? (totalResolutionTime / resolvedComplaintsWithTime / (1000 * 60 * 60 * 24)).toFixed(1) + " days" 
    : null;

  const reportRows = [
    ['Report Type', 'Period', 'Total Complaints', 'Resolved Complaints', 'Pending Complaints', 'Avg Resolution Time'],
    ['Overall Summary', period, totalComplaints, resolvedComplaints, pendingComplaints, avgResolutionTime],
    [],
    ['Zone', 'Total Complaints (Zone)', 'Resolved (Zone)', 'Efficiency (Zone)']
  ];

  const zoneRows = await Promise.all(zones.map(async (zone) => {
    const complaintsInZone = await Complaint.find({
      location: {
        $geoWithin: {
          $geometry: zone.location,
        },
      },
      ...dateFilter,
    }).lean();

    const total = complaintsInZone.length;
    const resolved = complaintsInZone.filter(c => c.status === 'resolved' || c.status === 'closed').length;
    const efficiency = total > 0 ? `${((resolved / total) * 100).toFixed(0)}%` : '0%';

    return [zone.name, total, resolved, efficiency];
  }));

  reportRows.push(...zoneRows);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="superadmin_reports_${period}.csv"`);

  stringify(reportRows, (err, output) => {
    if (err) {
      res.status(500).send('Error generating CSV');
      return;
    }
    res.send(output);
  });
});

const getSystemMonitoringData = asyncHandler(async (req, res) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.setDate(now.getDate() - 7));

  const [activeUsers, todaySubmissions, busiestDayResult, peakHourResult, firstComplaint, totalComplaints] = await Promise.all([
    Complaint.distinct('citizen', { createdAt: { $gte: weekAgo } }),
    Complaint.countDocuments({ createdAt: { $gte: today } }),
    Complaint.aggregate([
      { $group: { _id: { $dayOfWeek: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]),
    Complaint.aggregate([
      { $group: { _id: { $hour: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]),
    Complaint.findOne().sort({ createdAt: 1 }).lean(),
    Complaint.countDocuments()
  ]);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const busiestDay = busiestDayResult.length > 0 ? daysOfWeek[busiestDayResult[0]._id - 1] : null;
  const peakHour = peakHourResult.length > 0 ? `${peakHourResult[0]._id}:00 - ${peakHourResult[0]._id + 1}:00` : null;

  let averageDailyLoad = null;
  if (firstComplaint) {
    const timeDiff = new Date() - firstComplaint.createdAt;
    const daysSinceFirstComplaint = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if (daysSinceFirstComplaint > 0) {
      averageDailyLoad = (totalComplaints / daysSinceFirstComplaint).toFixed(1);
    }
  }

  res.json({
    activeUsers: activeUsers.length,
    todaySubmissions,
    avgResponseTime: null,
    systemUptime: null,
    peakHour,
    busiestDay,
    averageDailyLoad,
  });
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

  const superAdminProfile = await SuperAdmin.findOne({ email: req.user.email }).select('_id name').lean();

  complaint.timeline.unshift({
    eventType: 'verified',
    status: complaint.status,
    description: 'Complaint verified and approved',
    updatedBy: superAdminProfile?._id || req.user._id,
    updatedByModel: 'SuperAdmin',
    date: new Date(),
  });

  await complaint.save();

  res.json({ message: 'Complaint verified successfully' });
});

module.exports = {
  registerSuperAdmin,
  authSuperAdmin,
  getSuperAdminDashboardData,
  getSuperAdminReports,
  exportSuperAdminReports,
  getSystemMonitoringData,
  verifyComplaint,
};

