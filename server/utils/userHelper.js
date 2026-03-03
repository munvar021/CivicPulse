const User = require('../models/general/User');

const syncUserEmail = async (oldEmail, newEmail, role, additionalData = {}) => {
  let userRecord = await User.findOne({ email: oldEmail });
  
  if (!userRecord) {
    await User.create({ email: newEmail, role, ...additionalData });
  } else {
    userRecord.email = newEmail;
    await userRecord.save();
  }
};

const ensureUserExists = async (email, role, additionalData = {}) => {
  const userExists = await User.findOne({ email });
  if (!userExists) {
    await User.create({ email, role, ...additionalData });
  }
};

const deleteUserByEmail = async (email) => {
  await User.deleteOne({ email });
};

module.exports = {
  syncUserEmail,
  ensureUserExists,
  deleteUserByEmail,
};
