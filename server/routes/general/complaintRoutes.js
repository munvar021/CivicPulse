const express = require('express');
const router = express.Router();
const {
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
} = require('../../controllers/general/complaintController');
const { updateAssignment } = require('../../controllers/admin/adminController');
const { protect, authorize } = require('../../middleware/authMiddleware');
const upload = require('../../middleware/uploadMiddleware');

router.use(protect);

router.post('/', authorize(['citizen']), upload, createComplaint);
router.get('/', authorize(['superAdmin']), getAllComplaints);
router.get('/my', authorize(['citizen']), getMyComplaints);
router.get('/nearby', authorize(['citizen']), getNearbyComplaints);
router.get('/nearby/:id', authorize(['citizen']), getNearbyComplaintById);
router.get('/:id', authorize(['citizen', 'superAdmin']), getComplaintById);
router.put('/:id', authorize(['citizen']), upload, updateComplaint);
router.delete('/:id', authorize(['citizen']), deleteComplaint);
router.put('/:id/assign', authorize(['superAdmin', 'admin']), assignComplaint);
router.put('/:id/assignment', authorize(['superAdmin', 'admin']), updateAssignment);
router.put('/:id/reassign', authorize(['superAdmin']), reassignComplaint);
router.post('/:id/feedback', authorize(['citizen']), submitFeedback);
router.put('/:id/reopen', authorize(['citizen']), reopenComplaint);

module.exports = router;