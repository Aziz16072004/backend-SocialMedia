const express = require('express')
const  homeController  = require('../controller/homeController')
const router = express.Router()

router.get("/" , homeController.getProducts)
router.post("/" , homeController.addRating)
router.post("/addProduct" , homeController.addProduct)



module.exports = router