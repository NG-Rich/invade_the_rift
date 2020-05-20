const discussionQueries = require("../db/queries.discussions.js");
const Authorizer = require("../policies/application");

module.exports = {
  index(req, res, next) {
    discussionQueries.getAllDiscussions(req.query.page, (err, discussions, maxPageSize) => {
      if(err) {
        res.redirect("/");
      }else {
        if(err || req.query.page > maxPageSize) {
          req.flash("notice", "Page not found!");
          res.redirect(`/forums?page=${maxPageSize}`);
        }else {
          res.render("forums/index", {discussions: discussions.rows, maxPageSize, page:req.query.page});
        }
      }
    });
  },
  new(req, res, next) {
    const authorized = new Authorizer(req.user).new();

    if(authorized) {
      res.render("forums/discussion/new");
    }else {
      req.flash("notice", "You must be signed in to do that.");
      res.redirect("/users/sign_in");
    }
  },
  create(req, res, next) {
    const authorized = new Authorizer(req.user).create();

    if(authorized) {
      let newDiscussion = {
        title: req.body.title,
        description: req.body.description,
        userId: req.user.id
      };

      discussionQueries.createDiscussion(newDiscussion, (err, discussion) => {
        if(err) {
          req.flash("notice", "Something went wrong, please try again!");
          res.redirect("/forums?page=1");
        }else {
          res.redirect(303, `/forums/discussion/${discussion.id}`);
        }
      });
    }else {
      req.flash("notice", "You must be signed in to do that.");
      res.redirect("/users/sign_in");
    }
  },
  show(req, res, next) {
    discussionQueries.showDiscussion(req.params.id, (err, discussion) => {
      if(err || discussion == null) {
        res.redirect("/forums?page=1");
      }

      res.render("forums/discussion/show", {discussion});
    });
  },
  destroy(req, res, next) {
    discussionQueries.deleteDiscussion(req, (err, discussion) => {
      if(err) {
        res.redirect(`/forums/discussion/${req.params.id}`);
      }else {
        req.flash("notice", "Discussion successfully deleted!");
        res.redirect("/forums?page=1");
      }
    });
  },
  edit(req, res, next) {
    discussionQueries.showDiscussion(req.params.id, (err, discussion) => {
      if(err || discussion == null) {
        res.redirect(404, "/forums?page=1");
      }else {
        const authorized = new Authorizer(req.user, discussion).edit();

        if(authorized) {
          res.render("forums/discussion/edit", {discussion});
        }else {
          req.flash("notice", "You are not authorized to do that.");
          res.redirect(`/forums/discussion/${req.params.id}`);
        }
      }
    });
  },
  update(req, res, next) {
    discussionQueries.updateDiscussion(req, req.body, (err, discussion) => {
      if(err || discussion == null) {
        res.redirect(404, `/forums/discussion/${req.params.id}/edit`);
      }else {
        req.flash("notice", "Discussion successfully updated!");
        res.render("forums/discussion/show", {discussion});
      }
    });
  }
}
