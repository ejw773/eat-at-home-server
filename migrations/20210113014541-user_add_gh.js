'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'github_login', {
        type: Sequelize.STRING
    })
    
  },

  down: async (queryInterface) => {
    await queryInterface.dropColumn('Users', 'github_login');
  }
};
