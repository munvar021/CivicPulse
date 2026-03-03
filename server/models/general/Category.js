const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ createdAt: -1 });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
