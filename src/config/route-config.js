module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const forumRoutes = require("../routes/forums");
    const postRoutes = require("../routes/posts");
    const champRotationRoutes = require("../routes/champRotation");
    const pbeRoutes = require("../routes/pbe");
    const newsRoutes = require("../routes/news");
    const championsRoutes = require("../routes/champions");

    if(process.env.NODE_ENV === "test") {
      const mockAuth = require("../../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    }

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(forumRoutes);
    app.use(postRoutes);
    app.use(champRotationRoutes);
    app.use(pbeRoutes);
    app.use(newsRoutes);
    app.use(championsRoutes);
  }
}
