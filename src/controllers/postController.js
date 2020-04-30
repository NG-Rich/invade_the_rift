const discussionQueries = require ("../db/queries.discussions.js");
const postQueries = require("../db/queries.posts.js");
const Authorizer = require("../policies/application");

module.exports = {
  new(req, res, next) {
    const authorized = new Authorizer(req.user).new();

    if(authorized) {
      discussionQueries.showDiscussion(req.params.id, (err, discussion) => {
        if(err) {
          res.redirect(302, `/forums/discussion/${req.params.id}`);
        }else {
          res.render("forums/discussion/post/new", {discussion});
        }
      });
    }else {
      req.flash("notice", "You must be signed in to do this.");
      res.redirect("/users/sign_in");
    }
  },
  create(req, res, next) {
    const authorized = new Authorizer(req.user).create();

    if(authorized) {
      let newPost = {
        title: req.body.title,
        body: req.body.body,
        discussionId: req.params.id,
        userId: req.user.id
      };

      postQueries.createPost(newPost, (err, post) => {
        if(err) {
          res.redirect(500, "/post/new");
        }else {
          res.redirect(303, `/forums/discussion/${newPost.discussionId}`);
        }
      });
    }else {
      req.flash("notice", "You must be signed in to do that.");
      res.redirect("/users/sign_in");
    }
  },
  destroy(req, res, next) {
    postQueries.deletePost(req, (err, post) => {
      if(err) {
        res.redirect(303, `/forums/discussion/${req.params.discussionId}`);
      }else {
        res.redirect(303, `/forums/discussion/${req.params.discussionId}`);
      }
    })
  },
  edit(req, res, next) {
    postQueries.getPost(req.params.id, (err, post) => {
      if(err || post == null) {
        res.redirect(404, "/forums?page=1");
      }else {
        const authorized = new Authorizer(req.user, post).edit();

        if(authorized) {
          res.render("forums/discussion/post/edit", {post});
        }else {
          req.flash("notice", "You are not authorized to do that.");
          res.redirect(303, `/forums/discussion/${req.params.discussionId}`);
        }
      }
    });
  },
  update(req, res, next) {
    postQueries.updatePost(req.params.id, req.body, (err, post) => {
      if(err || post == null) {
        res.redirect(404, `/forums/discussion/${req.params.discussionId}/post/${req.params.id}/edit`);
      }else {
        res.redirect(302, `/forums/discussion/${req.params.discussionId}`);
      }
    });
  }
}
