require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes")

const app = express();
app.use(express.json()); // ให้ Express อ่าน JSON ได้
app.use(cors()); // อนุญาตให้ frontend เรียก API

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running... 5M");
});

// app.get('/api/products', (req, res) => {
//   // Fetch products from database
//   res.json({ products: [] });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
