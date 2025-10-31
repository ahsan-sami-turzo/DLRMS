'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Khatians', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jl_number_id: {
        type: Sequelize.INTEGER
      },
      mouza_id: {
        type: Sequelize.INTEGER
      },
      khatian_no: {
        type: Sequelize.STRING
      },
      office_id: {
        type: Sequelize.INTEGER
      },
      khatian_entry_id: {
        type: Sequelize.INTEGER
      },
      dags: {
        type: Sequelize.TEXT
      },
      owners: {
        type: Sequelize.TEXT
      },
      guardians: {
        type: Sequelize.TEXT
      },
      total_land: {
        type: Sequelize.STRING
      },
      remaining_land: {
        type: Sequelize.STRING
      },
      agoto_khatian_no: {
        type: Sequelize.STRING
      },
      next_khatian_no: {
        type: Sequelize.STRING
      },
      organization_type: {
        type: Sequelize.INTEGER
      },
      segregation_status: {
        type: Sequelize.STRING
      },
      is_locked: {
        type: Sequelize.BOOLEAN
      },
      canonical_khatian_no: {
        type: Sequelize.INTEGER
      },
      root_khatian_id: {
        type: Sequelize.INTEGER
      },
      version_no: {
        type: Sequelize.STRING
      },
      latest: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Khatians');
  }
};