const express = require("express");
const { registerUser, loginUser, getUserData, logoutUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getUserData);
router.post("/logout", logoutUser);

module.exports = router;