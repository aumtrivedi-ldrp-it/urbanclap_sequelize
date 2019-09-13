'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.INTEGER,//0-serviceProvider,1 = user
    gender: DataTypes.STRING,
    tokens: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Services);
    User.hasMany(models.Comment);
    // User.hasMany(models.Mapping)
  };
  return User;
};