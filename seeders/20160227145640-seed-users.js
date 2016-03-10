'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        firstName: "Kevin",
        lastName: "White",
        userName: "kwhitejr",
        password: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Fred",
        lastName: "Im",
        userName: "fimhub",
        password: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Tony",
        lastName: "Gaskell",
        userName: "thgaskell",
        password: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
