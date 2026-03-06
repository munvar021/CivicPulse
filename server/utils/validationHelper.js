const checkDuplicateField = async (Model, field, value, excludeId = null) => {
  const query = { [field]: value };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  const existing = await Model.findOne(query);
  if (existing) {
    const fieldLabel =
      field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1");
    const error = new Error(`${fieldLabel} already exists`);
    error.statusCode = 400;
    throw error;
  }
};

const validateUniqueFields = async (Model, data, excludeId = null) => {
  const Citizen = require("../models/citizen/Citizen");
  const Officer = require("../models/officer/Officer");
  const Admin = require("../models/admin/Admin");
  const SuperAdmin = require("../models/superAdmin/SuperAdmin");
  const User = require("../models/general/User");

  const allModels = [Citizen, Officer, Admin, SuperAdmin, User];

  if (data.email) {
    for (const UserModel of allModels) {
      const emailExists = await UserModel.findOne({
        email: data.email,
        ...(excludeId && { _id: { $ne: excludeId } }),
      });
      if (emailExists) {
        const error = new Error("Email already exists");
        error.statusCode = 400;
        throw error;
      }
    }
  }

  if (data.phone) {
    const roleModels = [Citizen, Officer, Admin, SuperAdmin];
    for (const UserModel of roleModels) {
      const phoneExists = await UserModel.findOne({
        phone: data.phone,
        ...(excludeId && { _id: { $ne: excludeId } }),
      });
      if (phoneExists) {
        const error = new Error("Phone number already exists");
        error.statusCode = 400;
        throw error;
      }
    }
  }
};

module.exports = {
  checkDuplicateField,
  validateUniqueFields,
};
