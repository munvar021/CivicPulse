const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

departmentSchema.index({ createdAt: -1 });

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
