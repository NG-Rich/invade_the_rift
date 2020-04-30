const express = require("express");
const router = express.Router();
const validation = require("./validation");
const forumController = require("../controllers/forumController");
const helper = require("../auth/helpers");

router.get("/forums",
  forumController.index);
router.get("/forums/discussion/new",
  forumController.new);
router.post("/forums/discussion/create",
  helper.ensureAuthenticated,
  validation.validateDiscussions,
  forumController.create);
router.get("/forums/discussion/:id",
  forumController.show);
router.post("/forums/discussion/:id/destroy",
  forumController.destroy);
router.get("/forums/discussion/:id/edit",
  forumController.edit);
router.post("/forums/discussion/:id/update",
  validation.validateDiscussions,
  forumController.update);

module.exports = router;
