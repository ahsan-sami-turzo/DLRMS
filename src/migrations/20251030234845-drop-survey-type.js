module.exports = {
  up: async (queryInterface) => {
    await queryInterface.dropTable('SurveyTypes');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SurveyTypes', {
      survey_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      local_name: Sequelize.STRING,
      survey_order: Sequelize.INTEGER
    });
  }
};
