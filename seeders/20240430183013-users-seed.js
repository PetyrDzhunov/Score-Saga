'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'example_user1',
          email: 'user1@example.com',
          password: 'password123',
          avatar: 'avatar_url1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'example_user2',
          email: 'user2@example.com',
          password: 'password456',
          avatar: 'avatar_url2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
