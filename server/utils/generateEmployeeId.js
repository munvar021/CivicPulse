const Counter = require('../models/general/Counter');

const generateEmployeeId = async (prefix, role) => {
  const counter = await Counter.findOneAndUpdate(
    { role },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true }
  );
  
  const paddedNumber = String(counter.sequence).padStart(6, '0');
  return `${prefix}-${paddedNumber}`;
};

module.exports = generateEmployeeId;
