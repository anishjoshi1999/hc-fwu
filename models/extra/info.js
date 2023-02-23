const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  university: {
    type: Array,
    required: 'This field is required.'
  },
  faculty: {
    type:Array,
    required: 'This field is required.'
  },
  homePage: {
    type: String,
    required: 'This field is required.'
  },
  viewAll: {
    type: String,
    required: 'This field is required.'
  },
  bottom: {
    type: String,
    required: 'This field is required.'
  }
});
module.exports = mongoose.model('Info', infoSchema);