'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discussionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.Discussion, {
      foreignKey: "discussionId",
      onDelete: "CASCADE"
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Post.addScope("fiveLatest", (userId) => {
      return {
        include: [{
          model: models.Discussion
        }],
        where: {
          userId: userId
        },
        limit: 5,
        order: [["createdAt", "DESC"]]
      }
    });
  }; // End of assocations
  return Post;
};
