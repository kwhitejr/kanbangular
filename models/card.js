'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    priority: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsTo(models.User, {foreignKey: "creator_id", as: "createdBy"});
        Card.belongsTo(models.User, {foreignKey: "assignee_id", as: "assignedTo"});
      }
    }
  });
  return Card;
};