const express = require('express');
const router = express.Router();
const {
  getZones,
  createZone,
  updateZone,
  deleteZone,
} = require('../../controllers/superAdmin/zoneController');
const { protect, authorize } = require('../../middleware/authMiddleware');

router.use(protect, authorize(['superAdmin']));

router.route('/')
  .get(getZones)
  .post(createZone);

router.route('/:id')
  .put(updateZone)
  .delete(deleteZone);

module.exports = router;