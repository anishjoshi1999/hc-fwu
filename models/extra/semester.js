const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
});
module.exports = mongoose.model('Semester', semesterSchema);