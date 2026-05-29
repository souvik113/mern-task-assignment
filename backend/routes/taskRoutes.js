const express = require('express')
const router = express.Router()

const authMiddleWare = require("../middleware/authMiddleware")
const roleMiddleWare = require("../middleware/roleMiddleware")

const {createTask,getAllTasks,updatetask,deletetask,getTaskById,getTaskbyassignedEmployee} = require("../controllers/taskController")

router.post("/create",authMiddleWare,roleMiddleWare("manager"),createTask)
router.get("/all",authMiddleWare,getAllTasks)
router.get("/id/:id",authMiddleWare,roleMiddleWare("manager","employee"),getTaskById)
router.put("/update/:id",authMiddleWare,roleMiddleWare("manager"),updatetask)
router.delete("/delete/:id",authMiddleWare,roleMiddleWare("manager"),deletetask)
router.get("/assigned/:id",authMiddleWare,roleMiddleWare("manager","employee"),getTaskbyassignedEmployee)

module.exports = router