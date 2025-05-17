const express = require("express")
const router = express.Router()

const { create, list, update, remove, listby, searchFilters } = require("../controllers/product")

// @ENDPOINT: /api/product
router.post("/product", create)
router.get("/products/:count", list)
router.put("/product/:id/:name", update)
router.delete("/product/:id/:name", remove)
router.post("/productby", listby)
router.post("/search/filters", searchFilters)

module.exports = router