'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsTo(models.Priority, {foreignKey: "priority_id", as: "priority"});
        Card.belongsTo(models.Status, {foreignKey: "status_id", as: "status"});
        Card.belongsTo(models.User, {foreignKey: "creator_id", as: "createdBy"});
        Card.belongsTo(models.User, {foreignKey: "assignee_id", as: "assignedTo"});
      }
    }
  });
  return Card;
};