const express = require("express");
const router = express.Router();
const skillsRunesController = require("../controllers/skillsRunesController");

router.get("/skills-runes", skillsRunesController.index);

module.exports = router;