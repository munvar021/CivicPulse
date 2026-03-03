const asyncHandler = require('express-async-handler');
const Zone = require('../../models/superAdmin/Zone');
const { checkDuplicateField } = require('../../utils/validationHelper');

const getZones = asyncHandler(async (req, res) => {
  const zones = await Zone.find({}).sort({ createdAt: -1 }).lean();
  res.json(zones);
});

const createZone = asyncHandler(async (req, res) => {
  const { name, description, status, location } = req.body;

  if (!name || !description || !location) {
    res.status(400);
    throw new Error('Please enter all required fields: name, description, and location');
  }

  await checkDuplicateField(Zone, 'name', name);

  const zone = await Zone.create({ name, description, status, location });
  res.status(201).json(zone);
});

const updateZone = asyncHandler(async (req, res) => {
  const { name, description, status, location } = req.body;

  if (name) {
    await checkDuplicateField(Zone, 'name', name, req.params.id);
  }

  const updatedZone = await Zone.findByIdAndUpdate(
    req.params.id,
    { name, description, status, location },
    { new: true, runValidators: true }
  );

  if (!updatedZone) {
    res.status(404);
    throw new Error('Zone not found');
  }

  res.json(updatedZone);
});

const deleteZone = asyncHandler(async (req, res) => {
  const zone = await Zone.findByIdAndDelete(req.params.id);

  if (!zone) {
    res.status(404);
    throw new Error('Zone not found');
  }

  res.json({ message: 'Zone removed' });
});

module.exports = {
  getZones,
  createZone,
  updateZone,
  deleteZone,
};
