const asyncHandler = require('express-async-handler');
const Complaint = require('../../models/general/Complaint');
const Citizen = require('../../models/citizen/Citizen');
const { uploadMultipleToCloudinary, deleteFromCloudinary } = require('../../utils/cloudinaryHelper');
const { buildComplaintQuery, getPaginationParams } = require('../../utils/queryHelper');

const getAllComplaints = asyncHandler(async (req, res) => {
  const { status, priority, department } = req.query;
  const query = buildComplaintQuery({}, { status, priority, department });
  
  const complaints = await Complaint.find(query)
    .populate('citizen', 'name email')
    .populate('department', 'name')
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 })
    .lean();
  
  res.json(complaints);
});

const createComplaint = asyncHandler(async (req, res) => {
  const { title, description, latitude, longitude, address, severity, category, department } = req.body;

  if (!title || !description || !latitude || !longitude || !address || !category) {
    res.status(400);
    throw new Error('Please include all required fields for the complaint.');
  }

  const citizen = await Citizen.findOne({ email: req.user.email }).lean();
  if (!citizen) {
    res.status(404);
    throw new Error('Citizen not found');
  }

  let uploadedImageUrls = [];
  if (req.files?.length > 0) {
    try {
      uploadedImageUrls = await uploadMultipleToCloudinary(req.files, 'civicpulse_complaints');
    } catch (uploadError) {
      res.status(500);
      throw new Error('Failed to upload images. Please try again.');
    }
  }

  const complaint = await Complaint.create({
    citizen: citizen._id,
    title,
    description,
    category,
    location: {
      type: 'Point',
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
      address,
    },
    severity,
    department,
    images: uploadedImageUrls,
  });

  res.status(201).json(complaint);
});

const getMyComplaints = asyncHandler(async (req, res) => {
  const citizen = await Citizen.findOne({ email: req.user.email }).lean();
  if (!citizen) {
    res.status(404);
    throw new Error('Citizen not found');
  }
  
  const complaints = await Complaint.find({ citizen: citizen._id })
    .populate('citizen', 'name email')
    .populate('department', 'name')
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 })
    .lean();
  
  res.json(complaints);
});

const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id)
    .populate('citizen', 'name email')
    .populate('department', 'name')
    .populate({
      path: 'assignedTo',
      populate: { path: 'department', select: 'name' }
    })
    .populate('progressUpdates.updatedBy', 'name employeeId')
    .populate('timeline.updatedBy', 'name employeeId')
    .populate('timeline.metadata.fromOfficer', 'name employeeId')
    .populate('timeline.metadata.toOfficer', 'name employeeId')
    .lean();

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  if (req.user.role === 'superAdmin') {
    return res.json(complaint);
  }

  const citizen = await Citizen.findOne({ email: req.user.email }).lean();
  if (!citizen) {
    res.status(404);
    throw new Error('Citizen not found');
  }

  if (!complaint.citizen || complaint.citizen._id.toString() !== citizen._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to view this complaint');
  }

  res.json(complaint);
});

const getNearbyComplaints = asyncHandler(async (req, res) => {
  const { latitude, longitude, radius } = req.query;

  if (!latitude || !longitude) {
    res.status(400);
    throw new Error('Please provide latitude and longitude for nearby search.');
  }

  const queryRadius = radius ? parseFloat(radius) * 1000 : 10000;

  const complaints = await Complaint.find({
    location: {
      $geoWithin: {
        $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], queryRadius / 6378.1],
      },
    },
  })
    .populate('citizen', 'name email')
    .populate('department', 'name')
    .lean();

  res.json(complaints);
});

const submitFeedback = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  
  const [complaint, citizen] = await Promise.all([
    Complaint.findById(req.params.id),
    Citizen.findOne({ email: req.user.email }).lean()
  ]);

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  if (!citizen) {
    res.status(404);
    throw new Error('Citizen not found');
  }

  if (complaint.citizen.toString() !== citizen._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to give feedback for this complaint');
  }

  if (complaint.status !== 'resolved') {
    res.status(400);
    throw new Error('Feedback can only be submitted for resolved complaints.');
  }

  complaint.feedback = { rating, comment };
  complaint.status = 'closed';
  await complaint.save();

  res.json(complaint);
});

const reopenComplaint = asyncHandler(async (req, res) => {
  const [complaint, citizen] = await Promise.all([
    Complaint.findById(req.params.id),
    Citizen.findOne({ email: req.user.email }).lean()
  ]);

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  if (!citizen) {
    res.status(404);
    throw new Error('Citizen not found');
  }

  if (complaint.citizen.toString() !== citizen._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to reopen this complaint');
  }

  if (complaint.status !== 'resolved' && complaint.status !== 'closed') {
    res.status(400);
    throw new Error('Only resolved or closed complaints can be reopened.');
  }

  complaint.status = 'pending';
  complaint.resolutionDetails = undefined;
  complaint.resolutionDate = undefined;
  complaint.feedback = undefined;
  complaint.assignedTo = undefined;

  await complaint.save();
  res.json(complaint);
});

const updateComplaint = asyncHandler(async (req, res) => {
  const [complaint, citizen] = await Promise.all([
    Complaint.findById(req.params.id),
    Citizen.findOne({ email: req.user.email }).lean()
  ]);

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  if (!citizen) {
    res.status(404);
    throw new Error('Citizen not found');
  }

  if (complaint.citizen.toString() !== citizen._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this complaint');
  }

  if (complaint.status !== 'pending') {
    res.status(400);
    throw new Error('Only pending complaints can be updated.');
  }

  const { title, description, severity, removedImages } = req.body;

  complaint.title = title || complaint.title;
  complaint.description = description || complaint.description;
  complaint.severity = severity || complaint.severity;

  if (removedImages) {
    const removedImagesArray = typeof removedImages === 'string' ? JSON.parse(removedImages) : removedImages;
    if (Array.isArray(removedImagesArray)) {
      await Promise.all(removedImagesArray.map(imageUrl => deleteFromCloudinary(imageUrl)));
      complaint.images = complaint.images.filter(img => !removedImagesArray.includes(img));
    }
  }

  if (req.files?.length > 0) {
    try {
      const uploadedImageUrls = await uploadMultipleToCloudinary(req.files, 'civicpulse_complaints');
      complaint.images = [...complaint.images, ...uploadedImageUrls];
    } catch (uploadError) {
      res.status(500);
      throw new Error('Failed to upload images. Please try again.');
    }
  }

  const updatedComplaint = await complaint.save();
  res.json(updatedComplaint);
});

const deleteComplaint = asyncHandler(async (req, res) => {
  const [complaint, citizen] = await Promise.all([
    Complaint.findById(req.params.id),
    Citizen.findOne({ email: req.user.email }).lean()
  ]);

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  if (!citizen) {
    res.status(404);
    throw new Error('Citizen not found');
  }

  if (complaint.citizen.toString() !== citizen._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this complaint');
  }

  if (complaint.status !== 'pending') {
    res.status(400);
    throw new Error('Only pending complaints can be deleted.');
  }

  if (complaint.images?.length > 0) {
    await Promise.all(complaint.images.map(imageUrl => deleteFromCloudinary(imageUrl)));
  }

  await complaint.deleteOne();
  res.json({ message: 'Complaint deleted successfully' });
});

const getNearbyComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id)
    .populate('citizen', 'name email')
    .populate('department', 'name')
    .populate({
      path: 'assignedTo',
      populate: { path: 'department', select: 'name' }
    })
    .populate('progressUpdates.updatedBy', 'name employeeId')
    .populate('timeline.updatedBy', 'name employeeId')
    .populate('timeline.metadata.fromOfficer', 'name employeeId')
    .populate('timeline.metadata.toOfficer', 'name employeeId')
    .lean();

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  res.json(complaint);
});

const assignComplaint = asyncHandler(async (req, res) => {
  const { officerId, dueDate } = req.body;
  
  const complaint = await Complaint.findById(req.params.id);
  
  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }
  
  complaint.assignedTo = officerId;
  complaint.dueDate = dueDate;
  complaint.status = 'assigned';
  
  await complaint.save();
  
  const updatedComplaint = await Complaint.findById(req.params.id)
    .populate('citizen', 'name email')
    .populate('department', 'name')
    .populate({
      path: 'assignedTo',
      populate: { path: 'department', select: 'name' }
    });
  
  res.json(updatedComplaint);
});

const reassignComplaint = asyncHandler(async (req, res) => {
  const { officerId, reason, dueDate } = req.body;
  
  const [complaint, Officer, SuperAdmin] = await Promise.all([
    Complaint.findById(req.params.id),
    require('../../models/officer/Officer'),
    require('../../models/superAdmin/SuperAdmin')
  ]);
  
  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }
  
  const newOfficer = await Officer.findById(officerId).lean();
  const previousOfficer = complaint.assignedTo;
  const superAdminProfile = await SuperAdmin.findOne({ email: req.user.email }).select('_id name').lean();
  
  complaint.assignedTo = officerId;
  complaint.dueDate = dueDate;
  complaint.status = 'reassigned';
  
  complaint.progressUpdates.unshift({
    status: 'reassigned',
    message: `Reassigned by Super Admin`,
    remarks: `Assigned to: ${newOfficer?.name || 'Officer'}\nDue date: ${new Date(dueDate).toLocaleDateString()}\nReason: ${reason}`,
    updatedBy: req.user._id,
    previousOfficer: previousOfficer,
  });
  
  complaint.timeline.unshift({
    eventType: 'reassigned',
    status: 'reassigned',
    description: reason || 'Area reassignment',
    updatedBy: superAdminProfile?._id || req.user._id,
    updatedByModel: 'SuperAdmin',
    metadata: {
      fromOfficer: previousOfficer,
      toOfficer: officerId,
      reason: reason,
    },
    date: new Date(),
  });
  
  await complaint.save();
  
  const updatedComplaint = await Complaint.findById(req.params.id)
    .populate('citizen', 'name email')
    .populate('department', 'name')
    .populate({
      path: 'assignedTo',
      populate: { path: 'department', select: 'name' }
    })
    .populate('progressUpdates.updatedBy', 'name')
    .lean();
  
  res.json(updatedComplaint);
});

module.exports = {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getNearbyComplaints,
  getNearbyComplaintById,
  submitFeedback,
  reopenComplaint,
  updateComplaint,
  deleteComplaint,
  getAllComplaints,
  assignComplaint,
  reassignComplaint,
};
