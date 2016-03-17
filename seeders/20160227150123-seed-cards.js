'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('cards', [
      {
        title: "Create Database",
        details: "create a postgres database containing users and task cards.",
        status: "in-progress",
        priority: "high",
        creator_id: 2,
        assignee_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Seed Database",
        details: "seed the postgres database with users and task cards.",
        status: "in-progress",
        priority: "medium",
        creator_id: 2,
        assignee_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Post Card Data Via Form",
        details: "use your awesome form to post new cards to the database.",
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
