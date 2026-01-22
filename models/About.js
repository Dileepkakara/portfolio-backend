const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  text: String,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('About', aboutSchema);
