'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        login: 'admin',
        password: '$2a$10$2RHecofTjT4dDF1CK8EXeeBjksJPeQPO1hxQIy3Mlq6gxgwiS.cum',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
