const express = require('express')
const router = express.Router();

const {signUp,login,verify} = require("../controllers/UsersController")

router.post("/",signUp);
router.post("/login",login)
router.post("/verifyToken",verify)

module.exports = router;