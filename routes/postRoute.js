const express = require("express")
const router = express.Router()
const postController  = require('../controller/postController')
const multer = require("multer")
const Post = require("../models/post");
const fs = require("fs")
const path = require("path")
// Set up Multer storage
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

const upload = multer({ storage: storage });




router.post("/upload" ,upload.single('image'),postController.uploadPost)
router.get("/" , postController.getPosts)
router.post("/addRate" , postController.addRate)
router.get("/showPost" , postController.showPost)
router.get("/showPostJustForProfile" , postController.showPostJustForProfile)
router.post("/addComment" , postController.addComment)
router.post("/postMarkes" , postController.postMarkes)
router.delete("/removeRate" , postController.RemoveRate)



module.exports = router

