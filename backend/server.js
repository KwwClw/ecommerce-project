require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { readdirSync } = require("fs");

const app = express();

app.use(morgan("dev")); // ใช้ morgan สำหรับ log การเรียก API
app.use(express.json()); // ให้ Express อ่าน JSON ได้
app.use(cookieParser()); // อ่านค่าจาก Cookie
app.use(cors()); // อนุญาตให้ frontend เรียก API

// console.log(readdirSync('./routes'));

// readdirSync("./routes").map((item, index, arr) => console.log(item));

// readdirSync("./routes").map((item, index, arr) => {
//   app.use("/api", require("./routes/" + item))
//   console.log(`app.use("/api", require("./routes/${item}")`)
// });

readdirSync("./routes").forEach((item, index) => {
  const path = `./routes/${item}`;
  app.use("/api", require(path));
  // console.log(`index: ${index} Loaded: ${path}`);
});

// readdirSync("./routes").map((item,index,arr) =>
//   console.log(`app.use("/api", require("./routes/${item}")`)
// );

// app.use("/api", require("./routes/category"));

// app.use("/api", categoryRoutes);
// app.use("/api", authRoutes);

// app.use("/api/users", userRoutes);
// app.use(productRoutes);
// app.use(productInsert);

// app.get("/api/index", (req, res) => {
//   res.send("API is running...");
// });

// app.get("/api/hello", (req, res) => {
//   res.status(200).json({ message: "Hello from the server!" });
// });

// app.get('/api/products', (req, res) => {
//   // Fetch products from database
//   res.json({ products: [] });
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✔ Server is running on port ${port}`);
});
