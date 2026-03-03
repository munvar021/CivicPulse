const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const generateEmployeeId = require('../../utils/generateEmployeeId');

const adminSchema = new mongoose.Schema({
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
    required: true,
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
    required: true,
    default: 'admin',
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Department',
    index: true,
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Zone',
  },
},
{
  timestamps: true,
});

adminSchema.index({ createdAt: -1 });
adminSchema.index({ department: 1, createdAt: -1 });

adminSchema.pre('validate', async function (next) {
  if (this.isNew && !this.employeeId) {
    this.employeeId = await generateEmployeeId('AD', 'admin');
  }
  next();
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
