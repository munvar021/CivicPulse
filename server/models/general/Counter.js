const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    enum: ['citizen', 'officer', 'admin', 'superAdmin'],
  },
  sequence: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
