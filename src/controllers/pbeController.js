const pbeQueries = require("../db/queries.pbe.js");

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

    pbeQueries.create(newPbe, (err, pbe) => {
      if(err) {
        req.flash("notice", "Couldn't post PBE post");
        res.redirect("/pbe");
      }else {
        res.redirect(`/pbe/${pbe.title}`);
      }
    })
  },
  show(req, res, next) {
    pbeQueries.getPbe(req, (err, pbe) => {
      if(err) {
        req.flash("notice", "Couldn't retrieve PBE post!");
        res.redirect("/pbe");
      }else {
        res.render("pbe/show", {pbe});
      }
    });
  }
}
