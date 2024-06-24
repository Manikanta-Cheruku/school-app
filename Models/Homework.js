const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type : date,
        required : true
    },
    userId : {
        type: String,
        required : true
    },
    subject : {
        type : String,
        required : true,
        enum : ["Telugu","Hindi","English","Maths","Science","Social"]
    }
})



module.exports = mongoose.model('Homework',homeworkSchema);