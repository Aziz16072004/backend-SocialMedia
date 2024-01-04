const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
    res.send("helloooo");
});
app.use("/" , require("./routes/homeRoute"))
app.use("/home" , require("./routes/productRoute"))




mongoose.connect('mongodb://127.0.0.1:27017/data');
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
