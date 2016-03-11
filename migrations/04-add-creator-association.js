'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'cards',
      'creator_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      })
    .then (function () {
      return queryInterface.sequelize.query(
        "ALTER TABLE cards ADD CONSTRAINT creator_fk FOREIGN KEY (creator_id) REFERENCES users (id)"
      );
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'cards',
      'creator_id'
    );
  }
};
