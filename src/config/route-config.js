module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const forumRoutes = require("../routes/forums");

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(forumRoutes);
  }
}
