const express = require("express");
const router = express.Router();
const champRotationController = require("../controllers/champRotationController");

router.get("/champ_rotation", champRotationController.index);

module.exports = router;
