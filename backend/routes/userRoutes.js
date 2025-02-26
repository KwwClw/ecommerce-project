const express = require("express");
const { registerUser } = require("../controllers/userController");

const router = express.Router();

// กำหนดเส้นทางสำหรับการสมัครสมาชิก
router.post("/register", registerUser);

module.exports = router;
