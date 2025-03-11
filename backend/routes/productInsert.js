const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import โมเดล Product

// API สำหรับเพิ่ม Product
router.post('/api/productinsert', async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    const newProduct = new Product({ name, price, image, description });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router; // อย่าลืม export router
