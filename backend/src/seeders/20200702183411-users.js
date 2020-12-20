'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        login: 'admin',
        password: '$2a$10$P9i58faU1aAZItnifDshTOJ5iPpuTPI87NtHc2vu56uQgxUG4gKoa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
