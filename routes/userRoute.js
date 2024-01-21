const express = require("express")
const router = express.Router()
const userController  = require('../controller/userController')
const multer = require("multer")
const fs = require("fs")
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = './uploads/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

router.post("/addFriend" , userController.addFriend)
router.post("/acceptfriend" , userController.acceptfriend)
router.delete("/rejectfriend" , userController.rejectfriend)
router.get("/getuser/:id" , userController.getUser)
router.get("/postMarkes/:id" , userController.postMarkes)
router.patch("/updateUser/:id", upload.single('profileImg'),userController.updateUser)



module.exports = router

