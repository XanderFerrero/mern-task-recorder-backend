const express = require('express')
const router = express.Router();
const {protect} = require("../middleware/authUser")

const {
    getTasks,
    setTask,
    delTask
} = require("../controllers/TasksController");

router.use(protect)
router.get("/",getTasks);
router.post("/",setTask)
router.delete("/:id",delTask)

module.exports = router