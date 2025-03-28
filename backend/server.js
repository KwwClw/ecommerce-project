require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const productInsert = require("./routes/productInsert");

const app = express();
app.use(express.json()); // ให้ Express อ่าน JSON ได้
app.use(cookieParser()); // อ่านค่าจาก Cookie
app.use(cors()); // อนุญาตให้ frontend เรียก API

connectDB(); // เชื่อมต่อฐานข้อมูล

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(productRoutes);
app.use(productInsert);

app.get("/api/index", (req, res) => {
  res.send("API is running...");
});

// app.get("/api/hello", (req, res) => {
//   res.status(200).json({ message: "Hello from the server!" });
// });

// app.get('/api/products', (req, res) => {
//   // Fetch products from database
//   res.json({ products: [] });
// });

const port = process.env.PORT || 5000; // กำหนดค่า default สำหรับ PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
