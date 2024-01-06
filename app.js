const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require("cors")
const app = express();


app.use(cors());
app.use(express.json())
app.use("/" , require("./routes/homeRoute"))
app.use("/home" , require("./routes/productRoute"))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

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

// Product model and schema
const postSchema = new mongoose.Schema({
    name: String,
    description : String,
    image: String
});

const Post = mongoose.model('Post', postSchema);
app.post('/posts/upload', upload.single('image'), async (req, res) => {
    try {
        const newPost = new Post({
            name: req.body.name,
            description: req.body.description,
            image: `uploads/${req.file}`
        });

        await newPost.save();
        res.status(201).send(newPost);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


mongoose.set("strictQuery" , false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host} `);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const PORT = process.env.PORT
//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})