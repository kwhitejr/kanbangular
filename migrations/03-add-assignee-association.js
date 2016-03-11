'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'cards',
      'assignee_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    .then (function () {
      return queryInterface.sequelize.query(
        "ALTER TABLE cards ADD CONSTRAINT assignee_fk FOREIGN KEY (assignee_id) REFERENCES users (id)"
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'cards',
      'assignee_id'
    );
  }
};