const express = require('express');
const router = express.Router();
const {
  getCitizenProfile,
  updateCitizenProfile,
  getCitizenDashboardData,
  getMyComplaints,
} = require('../../controllers/citizen/citizenController');
const { protect, authorize } = require('../../middleware/authMiddleware');

router.use(protect, authorize(['citizen']));

router.route('/profile').get(getCitizenProfile).put(updateCitizenProfile);
router.get('/dashboard', getCitizenDashboardData);
router.get('/complaints/my', getMyComplaints);

module.exports = router;