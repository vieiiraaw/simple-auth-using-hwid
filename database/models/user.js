const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    hwid: { type: String, required: true },
    username: { type: String, required: true },
    expiry: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', user);
