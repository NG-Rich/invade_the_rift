const pbeQueries = require("../db/queries.pbe.js");
const MarkdownIt = require("markdown-it"),
  md = new MarkdownIt();

module.exports = {
  index(req, res, next) {
    pbeQueries.getAllPbePosts((err, pbePosts) => {
      if(err) {
        req.flash("notice", "Cannot display posts!");
        res.redirect("/");
      }else {
        res.render("pbe/index", {pbePosts});
      }
    })
  },
  new(req, res, next) {
    res.render("pbe/new");
  },
  create(req, res, next) {
    const newPbe = {
      title: req.body.title,
      body: req.body.body
    }

    pbeQueries.create(newPbe, (err, pbePost) => {
      if(err) {
        req.flash("notice", "Couldn't post PBE post");
        res.redirect("/pbe");
      }else {
        res.redirect(`/pbe/${pbePost.title}`);
      }
    })
  },
  show(req, res, next) {
    pbeQueries.getPbe(req, (err, pbePost) => {
      if(err) {
        req.flash("notice", "Couldn't retrieve PBE post!");
        res.redirect("/pbe");
      }else {
        pbePost.body = md.render(pbePost.body);

        res.render("pbe/show", {pbePost});
      }
    });
  },
  edit(req, res, next) {
    pbeQueries.getPbe(req, (err, pbePost) => {
      if(err) {
        req.flash("notice", "Couldn't retrieve PBE post!");
        res.redirect("/pbe");
      }else {
        res.render("pbe/edit", {pbePost});
      }
    })
  },
  update(req, res, next) {
    pbeQueries.updatePbePost(req, req.body, (err, pbePost) => {
      if(err || pbePost == null) {
        req.flash("notice", "Couldn't update PBE post!");
        res.redirect(`/pbe/${req.params.title}/edit`);
      }else {
        req.flash("notice", "PBE post updated!");
        res.redirect(`/pbe/${pbePost.title}`);
      }
    })
  },
  destroy(req, res, next) {
    pbeQueries.deletePbePost(req, (err, pbePost) => {
      if(err) {
        req.flash("notice", "Couldn't delete PBE post!");
        res.redirect(`/pbe/${req.params.title}`);
      }else {
        req.flash("notice", "PBE post was deleted!");
        res.redirect("/pbe");
      }
    })
  }
}
