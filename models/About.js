const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  text: String,
  dateOfBirth: String,
  phone: String,
  location: String,
  education: String,
  cvLink: String,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('About', aboutSchema);
