
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true
  },
  role : {
    type : String,
    enum : ["teacher","student","parent"]
  },
  password : {
    type : String,
    required : true
  }, 
  homeworks: [{type: mongoose.Schema.ObjectId, ref: "Homework"}]
})


module.exports = mongoose.model("User",userSchema)