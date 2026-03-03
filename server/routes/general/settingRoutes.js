const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings,
} = require('../../controllers/general/settingController');
const { protect, authorize } = require('../../middleware/authMiddleware');

router.use(protect, authorize(['superAdmin']));

router.route('/').get(getSettings).put(updateSettings);

module.exports = router;
