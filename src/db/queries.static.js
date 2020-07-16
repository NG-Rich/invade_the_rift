const Discussion = require("./models").Discussion;
const News = require("./models").News;
const User = require("./models").User;

module.exports = {
  showLatestEntries(callback) {
    Discussion.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      include: [{
        model: User
      }]
    })
    .then((discussions) => {
      News.findAll({
        limit: 5,
        order: [["createdAt", "DESC"]]
      })
      .then((newsPosts) => {
        callback(null, discussions, newsPosts);
      })

      //callback(null, discussions);
    })
    .catch((err) => {
      callback(err);
    });
  }
}
