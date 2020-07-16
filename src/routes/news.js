const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const validation = require("./validation");

router.get("/news", newsController.index);
router.get("/news/new", newsController.new);
router.post("/news/create", validation.validatePosts, newsController.create);
router.get("/news/:title", newsController.show);
router.get("/news/:title/edit", newsController.edit);
router.post("/news/:title/update", validation.validatePosts, newsController.update);
router.post("/news/:title/destroy", newsController.destroy);

module.exports = router;