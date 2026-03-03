const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const generateEmployeeId = require('../../utils/generateEmployeeId');

const superAdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    index: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  role: {
    type: String,
    default: 'superAdmin',
  },
  privileges: {
    type: String,
    default: 'Full System Access',
  },
}, {
  timestamps: true,
});

superAdminSchema.index({ createdAt: -1 });

superAdminSchema.pre('validate', async function (next) {
  if (this.isNew && !this.employeeId) {
    this.employeeId = await generateEmployeeId('SA', 'superAdmin');
  }
  next();
});

superAdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

superAdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

module.exports = SuperAdmin;
