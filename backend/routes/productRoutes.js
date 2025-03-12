// routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');  // เชื่อมต่อกับโมเดล Product
const router = express.Router();

// Route ดึงสินค้าทั้งหมด
router.get('/api/all-products', async (req, res) => {
    try {
        const products = await Product.find();  // ดึงสินค้าทั้งหมดจาก MongoDB
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route สำหรับดึงข้อมูล product ตาม id
router.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
