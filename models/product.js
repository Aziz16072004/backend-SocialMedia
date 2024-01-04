const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required : true
    },
    
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true 
    },
    image : {
        type : String,
    },
    ratings: {
        type: [{
            idUser: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
            },
            value: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            }
        }],
        default: []
    },
    averageRating: {
        type: Number,
        default: 0  
    }
    });

module.exports = mongoose.model("Product", ProductSchema);
