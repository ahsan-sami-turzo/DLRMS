module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Upazila', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    lams_id: DataTypes.INTEGER,
    is_circle: DataTypes.INTEGER,
    name: DataTypes.STRING,
    name_en: DataTypes.STRING,
    bbs_code: DataTypes.STRING,
    row_status: DataTypes.INTEGER,
    division_bbs_code: DataTypes.STRING,
    division_id: DataTypes.INTEGER,
    division_name: DataTypes.STRING,
    division_name_en: DataTypes.STRING,
    district_bbs_code: DataTypes.STRING,
    district_id: DataTypes.INTEGER,
    district_name: DataTypes.STRING,
    district_name_en: DataTypes.STRING
  }, {
    tableName: 'Upazilas',
    timestamps: false
  });
};
