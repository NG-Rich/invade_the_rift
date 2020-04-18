module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const forumRoutes = require("../routes/forums");
    const postRoutes = require("../routes/posts");

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(forumRoutes);
    app.use(postRoutes);
  }
}
