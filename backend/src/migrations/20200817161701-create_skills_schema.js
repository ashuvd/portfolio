'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('skills', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      percents: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('skills');
  }
};

