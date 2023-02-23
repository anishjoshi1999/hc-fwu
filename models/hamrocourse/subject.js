const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    code: {
        type: String,
        required: 'This field is required.'
    },
    totalmarks: {
        type: Number
    },
    passmarks: {
        type: Number
    },
    totalchapters: {
        type: Number,
        required: 'This field is required.'
    },
    semester: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: 'This field is required.'
    },
    image: {
        type: String,
        required: 'This field is required.'
    },
    lab: {
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
module.exports = mongoose.model('Subject', subjectSchema);