const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    value: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  });
  module.exports = mongoose.model('rating', ratingSchema);