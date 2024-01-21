const multer = require("multer")
const fs = require("fs")
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors")
const app = express();
const User = require("./models/user")
const Post = require("./models/post");

app.use(cors());
app.use(express.json())

app.use("/home" , require("./routes/productRoute"))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use("/" , require("./routes/homeRoute"))
app.use("/user" , require("./routes/userRoute"))
app.use("/posts" , require("./routes/postRoute"))


const upload = multer({ storage: storage });
;
// app.get('/getUser/:id', async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const userData = await User.findById(userId);

//         if (!userData) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json(userData);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
mongoose.set("strictQuery" , false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/data");
        console.log(`MongoDB Connected: ${conn.connection.host} `);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
const PORT = process.env.PORT ||8000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})