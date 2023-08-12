const jwt = require('json-web-token');
const bcyrpt = require("bcrypt");
const asyncHandler = require("express-async-handler")
const Tasks = require("../model/TasksModel")
const mongoose = require("mongoose");

const getTasks = asyncHandler(async(req,res) => {

    const tasks = await Tasks.find({user:req.user._id})
    res.status(200).json(tasks);

})

const setTask = asyncHandler(async (req,res) => {
    let {data} = req.body;
    
    const {_id} = req.user;

    data.forEach((obj) => {
        obj.text = obj.task;
        delete obj.task;
        delete obj.id;
        obj.user = _id;
    })

    console.log(data)

    const newTasks = await Tasks.insertMany(data)

    console.log(newTasks)

    res.json(newTasks)
})



const delTask = asyncHandler(async(req,res) =>{
    const targetTask = await Tasks.findById(req.params.id);
    if(targetTask.user == req.user.id){
        await Tasks.findByIdAndDelete(req.params.id)
        res.json(targetTask)
    }else{
        res.status(404);
        throw new Error("Invalid")
    }
})

module.exports = {
    getTasks,
    setTask,
    delTask
}