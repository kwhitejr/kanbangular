'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('cards', [
      {
        title: "Create Database",
        status: "in-progress",
        priority: "high",
        creator_id: 2,
        assignee_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Seed Database",
        status: "in-progress",
        priority: "medium",
        creator_id: 2,
        assignee_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Post Card Data Via Form",
        status: "queue",
        priority: "medium",
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
