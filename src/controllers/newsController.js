const newsQuery = require("../db/queries.news.js");
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
    newsQuery.getAllNewsPosts((err, newsPosts) => {
      if(err) {
        req.flash("notice", "Couldn't retrieve News posts");
        res.redirect("/");
      }else {
        res.render("news/index", {newsPosts});
      }
    });
  },
  new(req, res, next) {
    const authorized = new Authorizer(req.user)._isAdmin();

    if(authorized) {
      res.render("news/new");
    }else {
      req.flash("notice", "You're not authoried to do this ");
      res.redirect("/news");
    }
  },
  create(req, res, next) {
    const authorized = new Authorizer(req.user)._isAdmin();

    if(authorized) {
      const newPost = {
        title: req.body.title,
        body: req.body.body
      };
  
      newsQuery.createNewsPost(newPost, (err, newsPost) => {
        if(err) {
          req.flash("notice", "Couldn't create News post");
          res.redirect("/news");
        }else {
          res.redirect(`/news/${newsPost.title}`);
        }
      })
    }else {
      req.flash("notice", "You're not authorized to do this ");
      res.redirect("/news");
    }
  },
  show(req, res, next) {
    newsQuery.getNewsPost(req, (err, newsPost) => {
      if(err) {
        req.flash("notice", "Couldn't get News post");
        res.redirect("/news");
      }else {
        md.use(markdownItAttrs, {
          leftDelimiter: "{",
          rightDelimiter: "}",
          allowedAttributes: []
        });

        newsPost.body = md.render(newsPost.body);

        res.render("news/show", {newsPost});
      }
    });
  },
  edit(req, res, next) {
    const authorized = new Authorizer(req.user)._isAdmin();

    if(authorized) {
      newsQuery.getNewsPost(req, (err, newsPost) => {
        if(err) {
          req.flash("notice", "Couldn't retrieve edit page");
          res.redirect("/news");
        }else {
          res.render("news/edit", {newsPost});
        }
      });
    }else {
      req.flash("notice", "You're not authorized to do this ");
      res.redirect("/news");
    }
  },
  update(req, res, next) {
    newsQuery.updateNewsPost(req, req.body, (err, newsPost) => {
      if(err || newsPost == null) {
        req.flash("notice", "Couldn't update News post");
        res.redirect(`/news/${req.params.title}`);
      }else {
        newsPost.body = md.render(newsPost.body);

        req.flash("notice", "News post was updated!");
        res.redirect(`/news/${newsPost.title}`);
      }
    });
  },
  destroy(req, res, next) {
    newsQuery.deleteNewsPost(req, (err, newsPost) => {
      if(err || newsPost == null) {
        req.flash("notice", "Couldn't delete News post");
        res.redirect("/news");
      }else {
        req.flash("notice", "News post was deleted!");
        res.redirect("/news");
      }
    });
  }
}