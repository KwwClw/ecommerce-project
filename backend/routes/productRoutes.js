// routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');  // เชื่อมต่อกับโมเดล Product
const router = express.Router();

// Route ดึงสินค้าทั้งหมดพร้อมการแบ่งหน้า
router.get('/api/all-products', async (req, res) => {
    const page = parseInt(req.query.page) || 1;  // หน้าเริ่มต้นที่ 1
    const limit = parseInt(req.query.limit) || 10;  // จำนวนสินค้าที่แสดงในแต่ละหน้า

    try {
        const products = await Product.find()
            .skip((page - 1) * limit)  // ข้ามข้อมูลที่ผ่านไปแล้ว
            .limit(limit);  // จำกัดจำนวนข้อมูลในแต่ละหน้า

        // นับจำนวนสินค้าทั้งหมดเพื่อคำนวณจำนวนหน้า
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        res.json({
            products,
            totalPages,  // จำนวนหน้าทั้งหมด
            currentPage: page,  // หน้าปัจจุบัน
        });
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
