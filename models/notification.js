const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },  
    description : {
        type : String ,
    },
    read : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
