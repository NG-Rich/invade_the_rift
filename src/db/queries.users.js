const bcrypt = require("bcryptjs");
const User = require("./models").User;
const Discussion = require("./models").Discussion;
const Post = require("./models").Post;

module.exports = {
  createUser(newUser, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    });
  },
  showUserProfile(req, callback) {
    let result = {};

    User.findOne({where: {username: req.user.username}})
    .then((user) => {
      if(!user) {
        callback(404);
      }else {
        result["user"] = user;

        Discussion.scope({method: ["fiveLatest", req.user.id]}).findAll()
        .then((discussions) => {
          result["discussions"] = discussions;

          Post.scope({method: ["fiveLatest", req.user.id]}).findAll()
          .then((posts) => {
            result["posts"] = posts;

            callback(null, result);
          })
          .catch((err) => {
            callback(err);
          })
        })
      }
    });
  }
}
