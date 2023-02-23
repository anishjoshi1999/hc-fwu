const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    code: {
        type: String,
        required: 'This field is required.'
    },
    chapter:{
        type:Number
    },
    semester: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: 'This field is required.'
    },
    noteURL:{
        type:String,
        required:"This field is required"
    },
    noteCreator: {
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
module.exports = mongoose.model('Note', noteSchema);