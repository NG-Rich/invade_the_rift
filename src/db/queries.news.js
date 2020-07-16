const News = require("./models").News;
const Authorizer = require("../policies/application");

module.exports = {
  getAllNewsPosts(callback) {
    News.findAll()
    .then((newsPosts) => {
      callback(null, newsPosts);
    })
    .catch((err) => {
      callback(err);
    })
  },
  createNewsPost(newPost, callback) {
    News.create({
      title: newPost.title,
      body: newPost.body
    })
    .then((newsPost) => {
      callback(null, newsPost);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getNewsPost(req, callback) {
    News.findOne({where: {title: req.params.title}})
    .then((newsPost) => {
      callback(null, newsPost);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updateNewsPost(req, updatedNewsPost, callback) {
    News.findOne({where: {title: req.params.title }})
    .then((newsPost) => {
      if(!newsPost) {
        callback("Not found! ");
      }

      const authorized = new Authorizer(req.user, newsPost)._isAdmin();

      if(authorized) {
        newsPost.update(updatedNewsPost, {
          fields: Object.keys(updatedNewsPost)
        })
        .then(() => {
          callback(null, newsPost);
        })
      }else {
        req.flash("notice", "You're not authorized to do this ");
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteNewsPost(req, callback) {
    News.findOne({where: {title: req.params.title}})
    .then((newsPost) => {
      if(!newsPost) {
        callback("Not found ");
      }

      const authorized = new Authorizer(req.user, newsPost)._isAdmin();

      if(authorized) {
        newsPost.destroy()
        .then((newsPost) => {
          callback(null, newsPost);
        })
      }else {
        req.flash("notice", "You're not authorized to do this ");
        callback(401);
      }

    })
    .catch((err) => {
      callback(err);
    })
  }
}