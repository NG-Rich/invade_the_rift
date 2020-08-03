const express = require("express");
const router = express.Router();
const championsController = require("../controllers/championsController");

router.get("/champions", championsController.index);

module.exports = router;