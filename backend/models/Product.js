// models/Product.js
const mongoose = require('mongoose');

// Define Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;