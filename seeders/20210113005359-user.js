'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      displayName: 'Alfred',
      userName: 'al_the_hitch',
      email: 'i_make_thrillers@hollywood.com',
      github_login: 0,
      createdAt: new Date(),
      updatedAt: new Date()
  }], {});
},

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
