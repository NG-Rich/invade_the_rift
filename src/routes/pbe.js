const express = require("express");
const router = express.Router();
const pbeController = require("../controllers/pbeController");

router.get("/pbe", pbeController.index);
router.get("/pbe/new", pbeController.new);
router.post("/pbe/create", pbeController.create);
router.get("/pbe/:title", pbeController.show);

module.exports = router;
