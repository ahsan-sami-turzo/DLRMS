'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('MouzaJLNumbers', 'mutation_survey_name', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('MouzaJLNumbers', 'mutation_survey_name');
  }
};
