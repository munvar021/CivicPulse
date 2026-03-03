const express = require('express');
const router = express.Router();
const {
  authSuperAdmin,
  getSuperAdminDashboardData,
  getSuperAdminReports,
  exportSuperAdminReports,
  getSystemMonitoringData,
  verifyComplaint,
} = require('../../controllers/superAdmin/superAdminController');
const { protect, authorize } = require('../../middleware/authMiddleware');

router.post('/login', authSuperAdmin);

router.use(protect, authorize(['superAdmin']));

router.get('/dashboard', getSuperAdminDashboardData);
router.get('/reports', getSuperAdminReports);
router.get('/reports/export', exportSuperAdminReports);
router.get('/monitoring', getSystemMonitoringData);
router.put('/complaints/:id/verify', verifyComplaint);

module.exports = router;
