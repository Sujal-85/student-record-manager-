const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  registrationNo: { type: String, required: true, unique: true },
  name: String,
  class: String,
  subject1_IAMarks: Number
});

module.exports = mongoose.model('Student', studentSchema);
