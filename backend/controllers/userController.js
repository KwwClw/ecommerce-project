const User = require("../models/User");

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
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { registerUser };
