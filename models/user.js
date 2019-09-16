'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 10]
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email must be a valid email address'
        },
        notEmpty: true,
      },
      get() {
        return this.getDataValue('email')
      },
      set(valueToBeSet) {
        this.setDataValue('email', valueToBeSet.toUpperCase())

      }
    },
    password: DataTypes.STRING,
    type: DataTypes.INTEGER,//0-serviceProvider,1 = user
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["male", "female"]]
      }
    },
    tokens: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Services, {
      as: 'user',
      foreignKey: 'id',
      targetKey: 'data'
    });
    User.hasMany(models.Comment);
    // User.hasMany(models.Mapping)
  };
  return User;
};