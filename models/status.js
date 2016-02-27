'use strict';
module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define('Status', {
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Status;
};