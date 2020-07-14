const User = require("../db/models").User;

module.exports = {
  validateNewUsers(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("email", "must be a valid email").isEmail();
      /*
      req.checkBody("email", "is taken!").custom(value => {
        let user = User.findOne({where: {email: value}});

        if(!user) {
          return false;
        }
      })*/
      req.checkBody("username", "must be at least 4 characters in length").isLength({min: 4});
      /*
      req.checkBody("username", "is taken!").custom(value => {
        let user = User.findOne({where: {username: value}});

        if(!user) {
          return false;
        }
      })*/
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
      req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
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
      req.checkBody("email", "is not valid").isEmail();
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    }else {
      return next();
    }
  },
  validateDiscussions(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("title", "must be at least 4 characters in length").isLength({min: 4})
      req.checkBody("description", "must be at least 10 characters in length").isLength({min: 10});
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    }else {
      return next();
    }
  },
  validatePosts(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("title", "must be at least 4 characters in length").isLength({min: 4})
      req.checkBody("body", "must be at least 5 characters in length").isLength({min: 5});
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
