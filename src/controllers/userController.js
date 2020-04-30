const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
  signUp(req, res, next) {
    res.render("users/sign_up");
  },
  create(req, res, next) {
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };

    userQueries.createUser(newUser, (err, user) => {
      if(err) {
        req.flash("error", err);
        res.redirect("/users/sign_up");
      }else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed up!");
          res.redirect("/");
        });
      }
    });
  },
  signInForm(req, res, next) {
    res.render("users/sign_in");
  },
  signIn(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if(err) {
        next(err);
      }

      if(!user) {
        req.flash("notice", "Sign in failed. Please try again.");
        res.redirect("sign_in");
      }

      req.logIn(user, (err) => {
        if(err) {
          next(err);
        }

        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      });
    })(req, res, next);
  },
  signOut(req, res, next) {
    req.logOut();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  }
}
