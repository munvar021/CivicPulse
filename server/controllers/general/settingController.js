const asyncHandler = require('express-async-handler');
const Setting = require('../../models/general/Setting');
const Complaint = require('../../models/general/Complaint');

const getSettings = asyncHandler(async (req, res) => {
  const resolutionTimelines = await Setting.findOne({ key: 'resolutionTimelines' }).lean();
  
  const settings = {
    resolutionTimelines: resolutionTimelines?.value || { high: 24, medium: 72, low: 168 },
    statuses: Complaint.schema.path('status').enumValues,
    priorities: Complaint.schema.path('severity').enumValues,
  };

  res.json(settings);
});

const updateSettings = asyncHandler(async (req, res) => {
  const { key, value } = req.body;

  if (!key || !value) {
    res.status(400);
    throw new Error('Please provide a key and value');
  }

  const setting = await Setting.findOneAndUpdate(
    { key },
    { value },
    { new: true, upsert: true }
  );

  res.json(setting);
});

module.exports = {
  getSettings,
  updateSettings,
};
