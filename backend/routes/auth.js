const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// ✅ สมัครสมาชิก (Register)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // เช็คว่ามีอีเมลนี้อยู่ในระบบหรือไม่
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // แฮชรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้าง user ใหม่
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ เข้าสู่ระบบ (Login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ค้นหาผู้ใช้
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
