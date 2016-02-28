'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        firstName: "Kevin",
        lastName: "White",
        userName: "kwhitejr",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Fred",
        lastName: "Im",
        userName: "fimhub",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Tony",
        lastName: "Gaskell",
        userName: "thgaskell",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
