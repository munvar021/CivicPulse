const checkDuplicateField = async (Model, field, value, excludeId = null) => {
  const query = { [field]: value };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  const existing = await Model.findOne(query);
  if (existing) {
    const fieldLabel = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
    const error = new Error(`${fieldLabel} already exists`);
    error.statusCode = 400;
    throw error;
  }
};

const validateUniqueFields = async (Model, data, excludeId = null) => {
  if (data.email) {
    const emailExists = await Model.findOne({
      email: data.email,
      ...(excludeId && { _id: { $ne: excludeId } })
    });
    if (emailExists) {
      const error = new Error('Email already exists');
      error.statusCode = 400;
      throw error;
    }
  }

  if (data.phone) {
    const phoneExists = await Model.findOne({
      phone: data.phone,
      ...(excludeId && { _id: { $ne: excludeId } })
    });
    if (phoneExists) {
      const error = new Error('Phone number already exists');
      error.statusCode = 400;
      throw error;
    }
  }
};

module.exports = {
  checkDuplicateField,
  validateUniqueFields,
};
