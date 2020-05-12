'use strict';
module.exports = (sequelize, DataTypes) => {
  const Discussion = sequelize.define('Discussion', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Discussion.associate = function(models) {
    // associations can be defined here
    Discussion.hasMany(models.Post, {
      foreignKey: "discussionId",
      as: "posts"
    });

    Discussion.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Discussion.addScope("fiveLatest", (userId) => {
      return {
        where: {
          userId: userId
        },
        limit: 5,
        order: [["createdAt", "DESC"]]
      }
    });
/* REVISIT THIS ONE LATER
    Discussion.addScope("landingPageLatest", {
        where: {
          title: true
        },
        limit: 5,
        order: [["createdAt", "DESC"]]
    });
    */
  }; // End of associations
  return Discussion;
};
