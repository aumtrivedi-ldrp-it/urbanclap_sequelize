'use strict';
module.exports = (sequelize, DataTypes) => {
  const Services = sequelize.define('Services', {
    name: DataTypes.STRING,
    data: DataTypes.INTEGER
  }, {});
  Services.associate = function (models) {
    // associations can be defined here
    Services.belongsTo(models.User,{
      foreignKey: 'id',
    })
    Services.hasMany(models.ServiceRequests);
    Services.hasMany(models.Comment);
    // Services.hasMany(models.Mapping)
  };
  return Services;
};