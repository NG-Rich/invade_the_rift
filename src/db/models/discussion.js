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
    }
  }, {});
  Discussion.associate = function(models) {
    // associations can be defined here
  };
  return Discussion;
};
