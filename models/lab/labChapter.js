const mongoose = require('mongoose');
const labChapterSchema = new mongoose.Schema({
    lab: {
        type: Number,
        required: 'This field is required.'
    },
    marks: {
        type: Number
    },
    hours: {
        type: String
    },
    title: {
        type: String,
        required: 'This field is required.'
    },
    code: {
        type: String,
        required: 'This field is required.'
    },
    programme: {
        type: String,
        required: 'This field is required.'
    },
    university: {
        type: String,
        required: 'This field is required.'
    },
    createdBy:{
        type:String
    }
});
module.exports = mongoose.model('labChapter', labChapterSchema);