const express = require("express");
const router = express.Router();
const validation = require("./validation");
const postController = require("../controllers/postController");

router.get("/forums/discussion/:id/post/new", postController.new);
router.post("/forums/discussion/:id/post/create", postController.create);
router.post("/forums/discussion/:discussionId/post/:id/destroy", postController.destroy);
router.get("/forums/discussion/:discussionId/post/:id/edit", postController.edit);
router.post("/forums/discussion/:discussionId/post/:id/update", postController.update);

module.exports = router;
