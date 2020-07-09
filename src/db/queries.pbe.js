const Pbe = require("./models").Pbe;

module.exports = {
  getAllPbePosts(callback) {
    Pbe.findAll()
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
    .then((pbe) => {
      callback(null, pbe);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getPbe(req, callback) {
    Pbe.findOne({where: {title: req.params.title}})
    .then((pbe) => {
      callback(null, pbe);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
