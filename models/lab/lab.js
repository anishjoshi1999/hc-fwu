const mongoose = require('mongoose');
const labSchema = new mongoose.Schema({
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
    totallabs:{
        type: Number
    },
    semester: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
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
module.exports = mongoose.model('Lab', labSchema);