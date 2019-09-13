'use strict';
module.exports = (sequelize, DataTypes) => {
  const Services = sequelize.define('Services', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Services.associate = function (models) {
    // associations can be defined here
    Services.belongsTo(models.User)
    Services.hasMany(models.ServiceRequests);
    Services.hasMany(models.Comment);
    // Services.hasMany(models.Mapping)
  };
  return Services;
};