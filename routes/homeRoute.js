const express = require('express')
const userController  = require('../controller/userController')
const router = express.Router()

router.post("/" , userController.checkUser)
router.post("/signup" , userController.Add_InsertUser)
router.get("/getAllUsers" , userController.getAllUsers)
router.get("/getOneUser/:id" , userController.getOneUser)





module.exports = router