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
        type : Date,
        required : true
    },
    userId : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required : true
    },
    subject : {
        type : String,
        required : true,
        enum : ["Telugu","Hindi","English","Maths","Science","Social"]
    }
})



module.exports = mongoose.model('Homework',homeworkSchema);