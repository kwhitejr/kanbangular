'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        firstName: "Kevin",
        lastName: "White",
        username: "kwhitejr",
        password: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Fred",
        lastName: "Im",
        username: "fimhub",
        password: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Tony",
        lastName: "Gaskell",
        username: "thgaskell",
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
