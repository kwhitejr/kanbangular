'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING
  }, {
    tableName: "users",
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Card, {foreignKey: "creator_id", as: "cards"});
      }
    }
  });
  return User;
};