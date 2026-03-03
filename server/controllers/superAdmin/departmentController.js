const asyncHandler = require('express-async-handler');
const Department = require('../../models/general/Department');
const { checkDuplicateField } = require('../../utils/validationHelper');

const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({}).sort({ createdAt: -1 }).lean();
  res.json(departments);
});

const createDepartment = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  await checkDuplicateField(Department, 'name', name);

  const department = await Department.create({ name, description });
  res.status(201).json(department);
});

const updateDepartment = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (name) {
    await checkDuplicateField(Department, 'name', name, req.params.id);
  }

  const updatedDepartment = await Department.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true, runValidators: true }
  );

  if (!updatedDepartment) {
    res.status(404);
    throw new Error('Department not found');
  }

  res.json(updatedDepartment);
});

const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findByIdAndDelete(req.params.id);

  if (!department) {
    res.status(404);
    throw new Error('Department not found');
  }

  res.json({ message: 'Department removed' });
});

module.exports = {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
