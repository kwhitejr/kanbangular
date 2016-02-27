'use strict';
module.exports = function(sequelize, DataTypes) {
  var Priority = sequelize.define('Priority', {
    priority: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Priority;
};