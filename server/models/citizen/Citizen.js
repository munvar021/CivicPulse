const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Counter = require('../general/Counter');

const citizenSchema = mongoose.Schema(
  {
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
    citizenId: {
      type: String,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      default: 'citizen',
    },
  },
  {
    timestamps: true,
  }
);

citizenSchema.index({ createdAt: -1 });

citizenSchema.pre('validate', async function (next) {
  if (this.isNew && !this.citizenId) {
    const counter = await Counter.findOneAndUpdate(
      { role: 'citizen' },
      { $inc: { sequence: 1 } },
      { new: true, upsert: true }
    );
    this.citizenId = `CZ-${String(counter.sequence).padStart(6, '0')}`;
  }
  next();
});

citizenSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

citizenSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Citizen = mongoose.model('Citizen', citizenSchema);

module.exports = Citizen;