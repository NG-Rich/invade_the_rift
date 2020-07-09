'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pbe = sequelize.define('Pbe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  Pbe.associate = function(models) {
    // associations can be defined here
  };
  return Pbe;
};
