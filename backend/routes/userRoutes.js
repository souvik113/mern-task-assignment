const express = require('express')

const router = express.Router()

const authMiddleWare = require("../middleware/authMiddleware")
const roleMiddleWare = require("../middleware/roleMiddleware")

const {getAllUsers} = require("../controllers/userController")
const {deleteUsers} = require("../controllers/userController")


router.get("/all",authMiddleWare,roleMiddleWare("admin"),getAllUsers)
router.delete("/delete/:id",authMiddleWare,roleMiddleWare("admin"),deleteUsers)

module.exports = router