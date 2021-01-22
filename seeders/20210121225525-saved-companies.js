'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Saved_Companies', [{
      user_id: 1,
      company_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }],{});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Saved_Companies', null, {});
  }
};
