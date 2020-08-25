const express = require("express");
const router = express.Router();
//const validation = require("./validation");
const itemsController = require("../controllers/itemsController");

router.get("/items", itemsController.index);

module.exports = router;
