const express = require("express");
const router = express.Router();
const pbeController = require("../controllers/pbeController");
const validation = require("./validation");

router.get("/pbe", pbeController.index);
router.get("/pbe/new", pbeController.new);
router.post("/pbe/create", validation.validatePosts, pbeController.create);
router.get("/pbe/:title", pbeController.show);
router.get("/pbe/:title/edit", pbeController.edit);
router.post("/pbe/:title/update", validation.validatePosts, pbeController.update);
router.post("/pbe/:title/destroy", pbeController.destroy);

module.exports = router;
