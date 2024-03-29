module.exports = {
  fakeIt(app) {
    let role, id, email, username;

    function middleware(req, res, next) {
      role = req.body.role || role;
      id = req.body.userId || id;
      email = req.body.email || email;
      username = req.body.username || username;

      if(id && id != 0) {
        req.user = {
          "id": id,
          "email": email,
          "role": role,
          "username": username
        };
      }else if(id == 0) {
        delete req.user;
      }

      if(next) {
        next();
      }

    }

    function route(req, res) {
      res.redirect("/");
    }

    app.use(middleware);
    app.use("/auth/fake", route);
  }
}
