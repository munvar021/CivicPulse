const mongoose = require('mongoose');

const settingSchema = mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

settingSchema.index({ createdAt: -1 });

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;
