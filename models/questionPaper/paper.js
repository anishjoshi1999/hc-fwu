const mongoose = require('mongoose');
const paperSchema = new mongoose.Schema({
    code: {
        type: String,
        required: 'This field is required.'
    },
    year:{
        type:Number,
        required:"This field is required"
    },
    semester: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: 'This field is required.'
    },
    paperURL:{
        type:String,
        required:"This field is required"
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
module.exports = mongoose.model('Paper', paperSchema);