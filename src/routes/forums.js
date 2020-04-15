const express = require("express");
const router = express.Router();
const validation = require("./validation");
const forumController = require("../controllers/forumController");

router.get("/forums", forumController.index);
router.get("/forums/discussion/new", forumController.new);
router.post("/forums/discussion/create", forumController.create);
router.get("/forums/discussion/:id", forumController.show);
router.post("/forums/discussion/:id/destroy", forumController.destroy);
router.get("/forums/discussion/:id/edit", forumController.edit);
router.post("/forums/discussion/:id/update", forumController.update);

module.exports = router;
