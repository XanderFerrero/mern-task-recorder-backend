const path = require('path')
const express = require('express');
const app = express();
const mongoose = require('mongoose');   
require("dotenv").config()
const cors = require('cors')

//Connect DB

mongoose.connect("mongodb+srv://xanderferrero2:savePOINTS@tasknoting.lpqqt2h.mongodb.net/")
 
//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/tasks", require("./routes/TasksRouter"));
app.use("/api/users", require("./routes/UsersRouter"));

// serve frontend

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'../client/dist')))
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'../','client','dist','index.html')))
}else{
    app.get('/',(req,res) => res.send("pls set to production"))
}

app.get("/hi",(req,res) => {
    res.status(400).send({error:"you shouldn't be here"});
})

app.use(require("./middleware/error"))
 

//Start server
app.listen(3001,() => {
    console.log(process.env.PORT)
    console.log("Hello World");
})