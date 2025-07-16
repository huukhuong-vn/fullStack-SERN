'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'admin@gmail.com',
          password: '123456',
          firstName: 'HoiDanIt',
          lastName: 'Eric',
          address: 'USA',
          phonenumber: '0336025794',

          gender: 1,
          roleId: 'R1',
          positionId: 'Ha Tinh',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
