const mongoose = require('mongoose');
const chapterSchema = new mongoose.Schema({
    chapter: {
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
    createdBy:{
        type:String
    }
});
module.exports = mongoose.model('Chapter', chapterSchema);