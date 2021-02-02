'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'works',
        'github_link',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  },
  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('works', 'github_link'),
    ]);
  }
};
