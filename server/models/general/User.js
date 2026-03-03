const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['citizen', 'officer', 'admin', 'superAdmin'],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ createdAt: -1 });
userSchema.index({ role: 1, createdAt: -1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
