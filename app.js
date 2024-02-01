
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors")
const http = require('http')
const app = express();
const {Server} = require("socket.io");
const { log } = require('console');
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
        origin: ["http://localhost:3000","http://localhost:3001"],
        credentials: true
    }
});
server.listen(PORT, () => {
    console.log("listening for requests");
})

let users = []
const addUser = (userId,socketId)=>{
    !users.some((user)=>user.userId === userId) && users.push({userId , socketId})
}
io.on("connection", (socket) => {
    socket.on("add-user", (userId) => {
        addUser(userId , socket.id)
        io.emit("getUsers", users);
    });
    socket.on("sending-message", (user) => {
        const findUser = users.find(findUser => findUser.userId === user.to);

        if (findUser) {
            io.to(findUser.socketId).emit("receiving-message", true);
        } else {
            console.log("User not found");
        }
    });
    socket.on("send-message", (data) => {
        const findUser = users.find(findUser => findUser.userId === data.to);
        if (findUser) {
            io.to(findUser.socketId).emit("receive-message", { fromSelf: false, message: data.message });
        } else {
            console.log("User not found");
        }
    });
    socket.on("disconnect", () => {
        
    });
});

