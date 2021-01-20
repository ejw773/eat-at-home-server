'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'lastName',);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'lastName',);
  }
};
