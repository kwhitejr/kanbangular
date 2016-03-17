'use strict';
var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    tableName: "users",
    setterMethods: {
      password: function (password) {
        var hashed = hashPassword(password);
        this.setDataValue('password', hashed);
      }
    },
    classMethods: {
      hashPassword: hashPassword,
      associate: function(models) {
        User.hasMany(models.Card, {foreignKey: "creator_id", as: "cards"});
      }
    }
  });
  return User;
};

function hashPassword (password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}