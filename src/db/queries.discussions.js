const Discussion = require("./models").Discussion;
const Post = require("./models").Post;

module.exports = {
  getAllDiscussions(page = 1, callback) {
    const limit = 10;
    const offset = limit * (page - 1);
    // put logic here maybe on page = 0 ?
    return Discussion.findAll({order: [['updatedAt', 'DESC']], limit, offset})
    .then((discussions) => {
      // figure out how to implment this logic
      // const maxPageSize = Math.ceil(discussions.length / limit);
      callback(null, discussions);
    })
    .catch((err) => {
      callback(err);
    });
  },
  createDiscussion(newDiscussion, callback) {
    return Discussion.create({
      title: newDiscussion.title,
      description: newDiscussion.description
    })
    .then((discussion) => {
      callback(null, discussion);
    })
    .catch((err) => {
      callback(err);
    });
  },
  showDiscussion(id, callback) {
    return Discussion.findByPk(id, {
      include: [{
        model: Post,
        as: "posts"
      }]
    })
    .then((discussion) => {
      callback(null, discussion);
    })
    .catch((err) => {
      callback(err);
    });
  },
  deleteDiscussion(id, callback) {
    return Discussion.destroy({
      where: {id}
    })
    .then((discussion) => {
      callback(null, discussion);
    })
    .catch((err) => {
      callback(err);
    });
  },
  updateDiscussion(id, updatedDiscussion, callback) {
    return Discussion.findByPk(id, {
      include: [{
        model: Post,
        as: "posts"
      }]
    })
    .then((discussion) => {
      if(!discussion) {
        return callback("Discussion not found!");
      }

      discussion.update(updatedDiscussion, {
        fields: Object.keys(updatedDiscussion)
      })
      .then(() => {
        callback(null, discussion);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}
