const mongoose = require('mongoose');
// const ratingSchema = require("./rating")
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  postMarkes :[{
    post : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    }}
],
  profileImg : {
    type:String,
    default : "uploads/unknown.jpg"
  },
  friends : [{
    user : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }}  
  ],
  pending : [{
    user : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }}  
  ],
  requests : [{
    user : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }}  
  ],
  newNotifi : {
    type: Number , 
    default : 0
  },
});

module.exports = mongoose.model('User', userSchema);
