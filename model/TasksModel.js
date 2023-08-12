const mongoose = require('mongoose');

const TasksSchema = mongoose.Schema({
    text:{
        type:String,
        required:true
    },  
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    
},{
    timestamps:true
})

module.exports = mongoose.model("Tasks",TasksSchema);