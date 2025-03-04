const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ สมัครสมาชิก (Register)
async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // ตรวจสอบ email ซ้ำก่อนบันทึก
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // ตรวจสอบ username ซ้ำก่อนบันทึก
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    // ถ้าไม่มีข้อมูลซ้ำ ให้สร้างผู้ใช้ใหม่
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✅ เข้าสู่ระบบ (Login)
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // ค้นหาผู้ใช้ในฐานข้อมูล
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // สร้าง Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // ตั้งค่า Cookie สำหรับเก็บ Token
    res.cookie("token", token, { httpOnly: true, secure: false });

    res.json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✅ ตรวจสอบข้อมูลผู้ใช้จาก Cookie
async function getUserData(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

// ✅ ออกจากระบบ (Logout)
async function logoutUser(req, res) {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully!" });
}

module.exports = { registerUser, loginUser, getUserData, logoutUser };
