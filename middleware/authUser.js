const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/UsersModel")

const protect = asyncHandler(async (req,res,next) => {
    let token;
    
    //getauth

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_TOKEN);
            req.user = await User.findById(decoded.id).select("-password"); 
        
        }catch(e){
            res.status(401)
            throw new Error ("NOT AUTHORIZED! REFRESH PAGE TO LOGIN AGAIN AND MANAGE TASKS")
        }
    }

    if(!token){
        res.status(403)
        throw new Error("NOT AUTHORIZED! ERROR: NO TOKEN")
    }

    next();

})

module.exports = {protect}