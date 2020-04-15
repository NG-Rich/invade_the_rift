const discussionQueries = require("../db/queries.discussions.js");

module.exports = {
  index(req, res, next) {
    discussionQueries.getAllDiscussions(req.query.page, (err, discussions) => {
      if(err) {
        res.redirect(`forums?page=1`);
      }else {
        res.render("forums/index", {discussions, page:req.query.page});
      }
    });
  },
  new(req, res, next) {
    res.render("forums/discussion/new");
  },
  create(req, res, next) {
    let newDiscussion = {
      title: req.body.title,
      description: req.body.description
    };

    discussionQueries.createDiscussion(newDiscussion, (err, discussion) => {
      if(err) {
        res.redirect(500, "forums/discussion/new");
      }else {
        res.redirect(303, `${discussion.id}`)
      }
    })
  },
  show(req, res, next) {
    discussionQueries.showDiscussion(req.params.id, (err, discussion) => {
      if(err || discussion == null) {
        res.redirect(404, "forums");
      }else {
        res.render("forums/discussion/show", {discussion});
      }
    });
  },
  destroy(req, res, next) {
    discussionQueries.deleteDiscussion(req.params.id, (err, discussion) => {
      if(err) {
        res.redirect(500, `forums/discussion/${discussion.id}`);
      }else {
        res.redirect(303, "/forums");
      }
    });
  },
  edit(req, res, next) {
    discussionQueries.showDiscussion(req.params.id, (err, discussion) => {
      if(err || discussion == null) {
        res.redirect(404, "forums");
      }else {
        res.render("forums/discussion/edit", {discussion});
      }
    });
  },
  update(req, res, next) {
    discussionQueries.updateDiscussion(req.params.id, req.body, (err, discussion) => {
      if(err || discussion == null) {
        res.redirect(404, `forums/discussion/${req.params.id}/edit`);
      }else {
        res.render("forums/discussion/show", {discussion});
      }
    });
  }
}
