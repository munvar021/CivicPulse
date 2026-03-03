const mongoose = require('mongoose');

const zoneSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a zone name'],
      unique: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Polygon'],
        required: true
      },
      coordinates: {
        type: [[[Number]]],
        required: true
      }
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

zoneSchema.index({ location: '2dsphere' });
zoneSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Zone', zoneSchema);
