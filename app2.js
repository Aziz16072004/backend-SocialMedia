// server.js

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const app = express();
const homeRO = require('routes/')
const Add_InsertUser = require("controller/userController")
app.use(cors())
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://127.0.0.1:27017/imageApp', { useNewUrlParser: true, useUnifiedTopology: true });








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




app.use("/" , Add_InsertUser  )

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});

  
