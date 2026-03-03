const express = require('express');
const router = express.Router();
const {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require('../../controllers/superAdmin/departmentController');
const { protect, authorize } = require('../../middleware/authMiddleware');

router.get('/', protect, getDepartments);

router.use(protect, authorize(['superAdmin']));

router.post('/', createDepartment);
router.route('/:id').put(updateDepartment).delete(deleteDepartment);

module.exports = router;
