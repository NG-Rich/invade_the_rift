const Discussion = require("./models").Discussion;
const User = require("./models").User;

module.exports = {
  showLatestEntries(callback) {
    return Discussion.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      include: [{
        model: User
      }]
    })
    .then((discussions) => {
      callback(null, discussions);
    })
    .catch((err) => {
      callback(err);
    });
  }
}
