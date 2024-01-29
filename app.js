
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors")
const http = require('http')
const app = express();
const {Server} = require("socket.io")
app.use(cors());
app.use(express.json())

app.use("/home" , require("./routes/productRoute"))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use("/" , require("./routes/homeRoute"))
app.use("/user" , require("./routes/userRoute"))
app.use("/posts" , require("./routes/postRoute"))
app.use("/message" , require("./routes/messageRoute"))
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
connectDB()

const PORT = process.env.PORT ||8000;
const server = http.createServer(app) 
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});
server.listen(PORT, () => {
    console.log("listening for requests");
})

let users = new Map();

io.on("connection", (socket) => {
    socket.on("add-user", (userId) => {
        users.set(userId, socket.id);
    });
    socket.on("sending-message", (user) => {
        const recipientSocketId = users.get(user);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("receiving-message", true);
        } else {
            console.log("User not found");
        }
    });
    socket.on("send-message", (data) => {
        const recipientSocketId = users.get(data.to);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("receive-message", { fromSelf: false, message: data.message });
        } else {
            console.log("User not found");
        }
    });

    socket.on("disconnect", () => {
        users.forEach((socketId, userId) => {
            if (socketId === socket.id) {
                users.delete(userId);
            }
        });
    });
});

