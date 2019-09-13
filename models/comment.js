'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    serviceProviderId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    // serviceId: DataTypes.INTEGER,
    serviceRequestId:DataTypes.INTEGER
  }, {});
  Comment.associate = function (models) {
    // Comment.belongsTo(models.Services);
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.ServiceRequests);
  };
  return Comment;
};