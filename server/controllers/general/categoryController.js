const asyncHandler = require('express-async-handler');
const Category = require('../../models/general/Category');
const { checkDuplicateField } = require('../../utils/validationHelper');

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 }).lean();
  res.json(categories);
});

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please enter a category name');
  }

  await checkDuplicateField(Category, 'name', name);

  const category = await Category.create({ name });
  res.status(201).json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (name) {
    await checkDuplicateField(Category, 'name', name, req.params.id);
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true, runValidators: true }
  );

  if (!updatedCategory) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.json(updatedCategory);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.json({ message: 'Category removed' });
});

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
