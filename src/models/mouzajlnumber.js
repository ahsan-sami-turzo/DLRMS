'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MouzaJLNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MouzaJLNumber.init({
    mouza_id: DataTypes.INTEGER,
    mouza_name: DataTypes.STRING,
    uuid: DataTypes.STRING,
    jl_number: DataTypes.STRING,
    division_name: DataTypes.STRING,
    district_name: DataTypes.STRING,
    upazila_name: DataTypes.STRING,
    survey_id: DataTypes.INTEGER,
    survey_name: DataTypes.STRING,
    survey_name_en: DataTypes.STRING,
    mutation_survey_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MouzaJLNumber',
  });
  return MouzaJLNumber;
};