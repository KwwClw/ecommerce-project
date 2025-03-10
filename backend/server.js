require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json()); // ให้ Express อ่าน JSON ได้
app.use(cookieParser()); // อ่านค่าจาก Cookie
app.use(cors()); // อนุญาตให้ frontend เรียก API

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

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

app.get("/api/products", (req, res) => {
  const products = [
    { id: 1, name: "Jordan 1 Retro Low OG SP Travis Scott Canary (Women's)", price: 11000, image: "/images/jordan-1-retro-low-og-sp-travis-scott-canary-w-1.webp" },
    { id: 2, name: "Jordan 1 Retro Low OG SP Travis Scott Olive (Women's)", price: 28000, image: "/images/jordan-1-retro-low-og-sp-travis-scott-olive--w--1.webp" },
    { id: 3, name: "Jordan 1 Retro Low OG SP Travis Scott Velvet Brown", price: 13000, image: "/images/nike-jordan-1-retro-low-og-sp-travis-scott-velvet-brown-1.webp" },
    { id: 4, name: "Jordan 1 Retro Low OG SP Travis Scott Black Phantom", price: 17000, image: "/images/jordan-1-retro-low-og-sp-travis-scott-black-phantom-1.webp" },
    { id: 5, name: "Jordan 1 Retro Low OG SP Fragment x Travis Scott", price: 74000, image: "/images/jordan-1-low-fragment-design-x-travis-scott-1.webp" },
    { id: 6, name: "Jordan 1 Retro Low OG SP Travis Scott Mocha", price: 28000, image: "/images/air-jordan-1-retro-low-travis-scott-1.webp" },
  ];
  res.json(products);
});

const port = process.env.PORT || 5000; // กำหนดค่า default สำหรับ PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
