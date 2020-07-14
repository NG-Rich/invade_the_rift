const Discussion = require("./models").Discussion;
const Post = require("./models").Post;
const User = require("./models").User;
const Sequelize = require("./models").Sequelize;
const Op = Sequelize.Op;
const Authorizer = require("../policies/application");

module.exports = {
  getAllDiscussions(page = 1, callback) {
    const limit = 10;
    const offset = limit * (page - 1);

    return Discussion.findAndCountAll({
      where: {
        id: {
          [Op.gt]: 0
        }
      },
      order: [['updatedAt', 'DESC']],
      limit,
      offset
    })
    .then((discussions, maxPageSize) => {
      maxPageSize = Math.ceil(discussions.count / limit);
      callback(null, discussions, maxPageSize);
    })
    .catch((err) => {
      callback(err);
    });
  },
  createDiscussion(newDiscussion, callback) {
    return Discussion.create({
      title: newDiscussion.title,
      description: newDiscussion.description,
      userId: newDiscussion.userId
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
        as: "posts", include: [{
          model: User
        }]
      }, {
        model: User
      }]
    })
    .then((discussion) => {
      callback(null, discussion);
    })
    .catch((err) => {
      callback(err);
    });
  },
  deleteDiscussion(req, callback) {
    return Discussion.findByPk(req.params.id)
    .then((discussion) => {
      const authorized = new Authorizer(req.user, discussion).destroy();

      if(authorized) {
        discussion.destroy()
        .then((discussion) => {
          callback(null, discussion);
        });
      }else {
        req.flash("notice", "You are not authorized to do that.");
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  },
  updateDiscussion(req, updatedDiscussion, callback) {
    return Discussion.findByPk(req.params.id, {
      include: [{
        model: Post,
        as: "posts", include: [{
          model: User
        }]
      }, {
        model: User
      }]
    })
    .then((discussion) => {
      if(!discussion) {
        callback("Discussion not found!");
      }

      const authorized = new Authorizer(req.user, discussion).update();

      if(authorized) {
        discussion.update(updatedDiscussion, {
          fields: Object.keys(updatedDiscussion)
        })
        .then(() => {
          callback(null, discussion);
        })
        .catch((err) => {
          callback(err);
        });
      }else {
        req.flash("notice", "You are not authorized to do that.");
        callback("Forbidden");
      }
    });
  }
}
