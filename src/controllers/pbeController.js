const pbeQueries = require("../db/queries.pbe.js");
const MarkdownIt = require("markdown-it"),
  md = new MarkdownIt().use(require("thingworx-markdown-it-video"), {
    youtube: {width: 640, height: 390},
    vimeo: {width: 500, height: 281},
    vine: {width: 600, height: 600, embed: 'simple'},
    prezi: {width: 550, height: 400}
  })
const markdownItAttrs = require("markdown-it-attrs");
const Authorizer = require("../policies/application");

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
    const authorized = new Authorizer(req.user)._isAdmin();

    if(authorized) {
      res.render("pbe/new");      
    }else {
      req.flash("notice", "You are not authorized to do this. ");
      res.redirect("/pbe");
    }
  },
  create(req, res, next) {
    const authorized = new Authorizer(req.user)._isAdmin();

    if(authorized) {
      const newPbe = {
        title: req.body.title,
        body: req.body.body
      }

      pbeQueries.create(newPbe, (err, pbePost) => {
        if(err) {
          req.flash("notice", "Couldn't create PBE post! ");
          res.redirect("/pbe");
        }else {
          res.redirect(`/pbe/${pbePost.title}`);
        }
      });
    }else {
      req.flash("notice", "You are not authorized to do this. ");
      res.redirect("/pbe");
    }
  },
  show(req, res, next) {
    pbeQueries.getPbe(req, (err, pbePost) => {
      if(err) {
        req.flash("notice", "Couldn't retrieve PBE post!");
        res.redirect("/pbe");
      }else {
        md.use(markdownItAttrs, {
          leftDelimiter: "{",
          rightDelimiter: "}",
          allowedAttributes: []
        });

        pbePost.body = md.render(pbePost.body);

        res.render("pbe/show", {pbePost});
      }
    });
  },
  edit(req, res, next) {
    const authorized = new Authorizer(req.user)._isAdmin();

    if(authorized) {
      pbeQueries.getPbe(req, (err, pbePost) => {
        if(err) {
          req.flash("notice", "Couldn't retrieve PBE post! ");
          res.redirect("/pbe");
        }else {
          res.render("pbe/edit", {pbePost});
        }
      });
    }else {
      req.flash("notice", "You are not authorized to do this. ");
      res.redirect("/pbe");
    }
  },
  update(req, res, next) {
    pbeQueries.updatePbePost(req, req.body, (err, pbePost) => {
      if(err || pbePost == null) {
        req.flash("notice", "Couldn't update PBE post! ");
        res.redirect(`/pbe/${req.params.title}/edit`);
      }else {
        pbePost.body = md.render(pbePost.body);

        req.flash("notice", "PBE post updated!");
        res.redirect(`/pbe/${pbePost.title}`);
      }
    })
  },
  destroy(req, res, next) {
    pbeQueries.deletePbePost(req, (err, pbePost) => {
      if(err) {
        req.flash("notice", "Couldn't delete PBE post! ");
        res.redirect(`/pbe/${req.params.title}`);
      }else {
        req.flash("notice", "PBE post was deleted!");
        res.redirect("/pbe");
      }
    })
  }
}
