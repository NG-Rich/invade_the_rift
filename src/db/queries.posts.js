const Discussion = require("./models").Discussion;
const Post = require("./models").Post;
const Authorizer = require("../policies/application");

module.exports = {
  createPost(newPost, callback) {
    return Post.create(newPost)
    .then((post) => {
      callback(null, post);
    })
    .catch((err) => {
      callback(err);
    });
  },
  deletePost(req, callback) {
    return Post.findByPk(req.params.id)
    .then((post) => {
      const authorized = new Authorizer(req.user, post).destroy();

      if(authorized) {
        post.destroy()
        .then((res) => {
          callback(null, post);
        })
      }else {
        req.flash("notice", "You are not authorized to do that.");
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  },
  getPost(id, callback) {
    return Post.findByPk(id)
    .then((post) => {
      callback(null, post);
    })
    .catch((err) => {
      callback(err);
    });
  },
  updatePost(id, updatedPost, callback) {
    return Post.findByPk(id)
    .then((post) => {
      if(!post) {
        return callback("Post not found!");
      }

      post.update(updatedPost, {
        fields: Object.keys(updatedPost)
      })
      .then(() => {
        callback(null, post);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}
