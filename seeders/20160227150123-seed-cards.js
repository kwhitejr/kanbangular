'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('cards', [
      {
        title: "Create Database",
        status: "In-Progress",
        priority: "High",
        creator_id: 2,
        assignee_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Seed Database",
        status: "In-Progress",
        priority: "Medium",
        creator_id: 2,
        assignee_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Post Card Data Via Form",
        status: "Queue",
        priority: "Medium",
        creator_id: 2,
        assignee_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('cards', null, {});
  }
};
