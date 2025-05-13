const express = require('express');
const router = express.Router();

const { create, list, remove } = require("../controllers/category")

// @ENDPOINT: /api/category
router.post("/category", create)
router.get("/category", list)
router.delete("/category/:id/:name", remove)

module.exports = router;