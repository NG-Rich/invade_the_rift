module.exports = {
  validateNewUsers(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("Email", "must be a valid email").isEmail();
      req.checkBody("Username", "must be at least 4 characters in length").isLength({min: 4});
      req.checkBody("Password", "must be at least 6 characters in length").isLength({min: 6});
      req.checkBody("PasswordConfirmation", "must match password provided").optional().matches(req.body.password);
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    }else {
      return next();
    }
  },
  validateUsers(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("Email", "must be a valid email").isEmail();
      req.checkBody("Password", "must be at least 6 characters in length").isLength({min: 6});
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    }else {
      return next();
    }
  }
}
