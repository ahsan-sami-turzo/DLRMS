'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MouzaJLNumbers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mouza_id: {
        type: Sequelize.INTEGER
      },
      mouza_name: {
        type: Sequelize.STRING
      },
      uuid: {
        type: Sequelize.STRING
      },
      jl_number: {
        type: Sequelize.STRING
      },
      division_name: {
        type: Sequelize.STRING
      },
      district_name: {
        type: Sequelize.STRING
      },
      upazila_name: {
        type: Sequelize.STRING
      },
      survey_id: {
        type: Sequelize.INTEGER
      },
      survey_name: {
        type: Sequelize.STRING
      },
      survey_name_en: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MouzaJLNumbers');
  }
};