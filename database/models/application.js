const mongoose = require('mongoose');

const application = new mongoose.Schema({
  _id: { type: String, required: true },
  version: { type: String, required: true },
  key: { type: String, required: true },
});

module.exports = mongoose.model('application', application);
