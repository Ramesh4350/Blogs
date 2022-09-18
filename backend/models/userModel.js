const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "User name require"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Post must have body"]
    }
})

const User = mongoose.model("User",userSchema);
module.exports=User;