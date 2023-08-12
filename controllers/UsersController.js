const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler")
const User = require("../model/UsersModel")

const signUp = asyncHandler( async (req,res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("PLEASE FILL ALL FIELDS")
    }

    const user = await User.findOne({email:email})
    
    if(user){
        res.status(400);
        throw new Error("User already exists with this email")
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)

    const newUser = await User.create({...req.body, password:hashPassword})

    res.status(200).json({
        ...req.body,
        password:hashPassword,
        token:genToken(newUser._id)
    })

})

const login = asyncHandler(async (req, res) => {
    const {email,password} = req.body;
    const userExists = await User.findOne({email:email});
    if(userExists && (await bcrypt.compare(password, userExists.password))){
        res.status(200).json({
            ...req.body,
            name:userExists.name,
            password:userExists.password,
            token:genToken(userExists._id)
        });

    }else{
        res.status(400);
        throw new Error("User doesn't exist and/or password is incorrect")
    }
})

const verify = asyncHandler(async (req,res) => {
    let token = req.body.token;
    let jwt = require('jsonwebtoken');
    try{
        let decode = jwt.verify(token, process.env.JWT_TOKEN);
        
        res.json({success:true})
    }catch(e){
        res.json({success:false})

    }

})

const genToken = (id) => {
    return jwt.sign({id},process.env.JWT_TOKEN,{expiresIn:"12h"})
}

module.exports = {signUp,login,verify}