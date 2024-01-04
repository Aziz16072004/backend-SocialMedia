const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json())
app.use("/" , require("./routes/homeRoute"))
app.use("/home" , require("./routes/productRoute"))



mongoose.set("strictQuery" , false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const PORT = process.env.PORT || 8000
app.get("/", (req, res) => {
    res.send("helloooo1234"+PORT);
});
//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})