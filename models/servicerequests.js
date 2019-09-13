'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServiceRequests = sequelize.define('ServiceRequests', {
    state: { type: DataTypes.INTEGER, defaultValue: 0 },
    // mappingId:DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    serviceProviderId: DataTypes.INTEGER,
  }, {});
  ServiceRequests.associate = function (models) {
    // associations can be defined here
    // ServiceRequests.belongsTo(models.Services)
    // ServiceRequests.hasMany(models.Mapping)
    ServiceRequests.belongsTo(models.Services);
    ServiceRequests.belongsTo(models.User)
  };
  return ServiceRequests;
};