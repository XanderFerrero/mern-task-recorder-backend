const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add a name"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please add an email"]
    },
    password:{
        type:String,
        required:[true,"Obviously every account needs a password"]
    }
})

module.exports = mongoose.model("Users",UsersSchema)