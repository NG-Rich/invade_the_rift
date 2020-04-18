const discussionQueries = require ("../db/queries.discussions.js");
const postQueries = require("../db/queries.posts.js");

module.exports = {
  new(req, res, next) {
    discussionQueries.showDiscussion(req.params.id, (err, discussion) => {
      if(err) {
        res.redirect(302, `/forums/discussion/${req.params.id}`);
      }

      res.render("forums/discussion/post/new", {discussion});
    });
  },
  create(req, res, next) {
    let newPost = {
      title: req.body.title,
      body: req.body.body,
      discussionId: req.params.id
    };

    postQueries.createPost(newPost, (err, post) => {
      if(err) {
        req.redirect(500, "/post/new");
      }

      res.redirect(303, `/forums/discussion/${newPost.discussionId}`);
    });
  },
  destroy(req, res, next) {
    postQueries.deletePost(req.params.id, (err, deletedRecordsCount) => {
      if(err) {
        req.flash("notice", "Something went wrong! Try again!");
      }

      res.redirect(303, `/forums/discussion/${req.params.discussionId}`);
    })
  },
  edit(req, res, next) {
    postQueries.getPost(req.params.id, (err, post) => {
      if(err || post == null) {
        res.redirect(404, "/forums?page=1");
      }

      res.render("forums/discussion/post/edit", {post});
    });
  },
  update(req, res, next) {
    postQueries.updatePost(req.params.id, req.body, (err, post) => {
      if(err || post == null) {
        res.redirect(404, `/forums/discussion/${req.params.discussionId}/post/${req.params.id}/edit`);
      }

      res.redirect(302, `/forums/discussion/${req.params.discussionId}`);
    });
  }
}
