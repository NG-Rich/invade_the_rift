const Pbe = require("./models").Pbe;

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

      pbePost.update(updatedPbePost, {
        fields: Object.keys(updatedPbePost)
      })
      .then(() => {
        callback(null, pbePost);
      })
      .catch((err) => {
        callback(err);
      })
    })
  },
  deletePbePost(req, callback) {
    Pbe.findOne({where: {title: req.params.title}})
    .then((pbePost) => {
      pbePost.destroy()
      .then((pbePost) => {
        callback(null, pbePost);
      })
    })
    .catch((err) => {
      callback(err);
    })
  }
}
