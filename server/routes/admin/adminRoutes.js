const express = require('express');
const router = express.Router();
const {
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
} = require('../../controllers/admin/adminController');
const { protect, authorize } = require('../../middleware/authMiddleware');

router.post('/login', authAdmin);

router.use(protect, authorize(['admin']));

router.route('/me').get(getMe).put(updateAdminProfile);
router.get('/dashboard/stats', getAdminDashboardData);
router.get('/dashboard/recent-complaints', getRecentComplaints);
router.get('/complaints', getComplaints);
router.get('/complaints/:id', getComplaintById);
router.put('/complaints/:id/assign', assignComplaint);
router.put('/complaints/:id/due-date', updateDueDate);
router.put('/complaints/:id/assignment', updateAssignment);
router.put('/complaints/:id/reassign', reassignComplaint);
router.put('/complaints/:id/verify', verifyComplaint);
router.get('/escalations', getEscalatedComplaints);
router.get('/reports', getReports);
router.get('/profile/stats', getAdminProfileStats);
router.route('/officers').get(getOfficers).post(createOfficer);
router.route('/officers/:id').put(updateOfficer).delete(deleteOfficer);

module.exports = router;
