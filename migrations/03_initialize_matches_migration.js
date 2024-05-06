'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      venue: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      homeTeamName: {
        type: Sequelize.STRING,
      },
      homeTeamLogo: {
        type: Sequelize.STRING,
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
      },
      homeTeamWinner: {
        type: Sequelize.BOOLEAN,
      },
      awayTeamName: {
        type: Sequelize.STRING,
      },
      awayTeamLogo: {
        type: Sequelize.STRING,
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
      },
      awayTeamWinner: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matches');
  },
};
