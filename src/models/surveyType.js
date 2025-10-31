module.exports = (sequelize, DataTypes) => {
  return sequelize.define('SurveyType', {
    survey_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    local_name: DataTypes.STRING,
    survey_order: DataTypes.INTEGER
  }, {
    tableName: 'SurveyTypes',
    timestamps: false
  });
};
