
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors")
const app = express();

app.use(cors());
app.use(express.json())

app.use("/home" , require("./routes/productRoute"))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use("/" , require("./routes/homeRoute"))
app.use("/user" , require("./routes/userRoute"))
app.use("/posts" , require("./routes/postRoute"))
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