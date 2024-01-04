const Product = require("../models/product");
const getProducts = async (req, res) => {
    try {
      const images = await Product.find(); // Assuming 'Image' is your Mongoose model for storing images
      res.json(images);
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
const addProduct = async (req, res) => {
    try {
      const newImage = new Image({
        name: req.file.originalname,
        path: req.file.path,
        contentType: req.file.mimetype
      });
    await newImage.save();
  
    res.status(200).json({
        message: 'Image uploaded and saved successfully'
    });
    } catch (error) {
      console.error('Error:', error.message); // Log the error to console for debugging
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      });
    }
  }

module.exports = {getProducts , addProduct}