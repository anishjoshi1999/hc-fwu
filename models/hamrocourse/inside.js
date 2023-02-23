const mongoose = require('mongoose');
const insideSchema = new mongoose.Schema({
    chapter:{
        type: Number,
        required: 'This field is required.'
    },
    subtitle: {
        type: Array,
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
module.exports = mongoose.model('Inside', insideSchema);