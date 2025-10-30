module.exports = (sequelize, DataTypes) => {
  return sequelize.define('District', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    name: DataTypes.STRING,
    name_en: DataTypes.STRING,
    bbs_code: DataTypes.STRING,
    division_bbs_code: DataTypes.STRING,
    row_status: DataTypes.INTEGER,
    division_id: DataTypes.INTEGER,
    division_name: DataTypes.STRING,
    division_name_en: DataTypes.STRING
  }, {
    tableName: 'Districts',
    timestamps: false
  });
};
