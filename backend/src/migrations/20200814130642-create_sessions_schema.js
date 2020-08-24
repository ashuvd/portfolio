'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('sessions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }).then(() => {
      return queryInterface.addColumn(
        'sessions',
        'user_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      )
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn(
      'sessions',
      'user_id'
    ).then(() => {
      return queryInterface.dropTable('sessions');
    })
  }
};
