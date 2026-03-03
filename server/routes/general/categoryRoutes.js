const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../../controllers/general/categoryController');
const { protect, authorize } = require('../../middleware/authMiddleware');

router.use(protect, authorize(['superAdmin']));

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').put(updateCategory).delete(deleteCategory);

module.exports = router;
