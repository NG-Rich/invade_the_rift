const Pbe = require("./models").Pbe;
const Authorizer = require("../policies/application");

module.exports = {
  getAllPbePosts(callback) {
    Pbe.findAll({
      order: [
        ["createdAt", "DESC"]
      ]
    })
    .then((pbePosts) => {
      callback(null, pbePosts);
    })
    .catch((err) => {
      callback(err);
    })
  },
  create(newPbe, callback) {
    Pbe.create({
      title: newPbe.title,
      body: newPbe.body
    })
    .then((pbePost) => {
      callback(null, pbePost);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getPbe(req, callback) {
    Pbe.findOne({where: {title: req.params.title}})
    .then((pbePost) => {
      callback(null, pbePost);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updatePbePost(req, updatedPbePost, callback) {
    Pbe.findOne({where: {title: req.params.title }})
    .then((pbePost) => {
      if(!pbePost) {
        callback("Not found! ");
      }

      const authorized = new Authorizer(req.user, pbePost)._isAdmin();

      if(authorized) {
        pbePost.update(updatedPbePost, {
          fields: Object.keys(updatedPbePost)
        })
        .then(() => {
          callback(null, pbePost);
        });
      }else {
        req.flash("notice", "You are not authorized to do this. ");
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  },
  deletePbePost(req, callback) {
    Pbe.findOne({where: {title: req.params.title}})
    .then((pbePost) => {
      const authorized = new Authorizer(req.user, pbePost)._isAdmin();

      if(authorized) {
        pbePost.destroy()
        .then((pbePost) => {
          callback(null, pbePost);
        });
      }else {
        req.flash("notice", "You are not authorized to do this. ");
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    })
  }
}
