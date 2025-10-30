module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Survey', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    name: DataTypes.STRING,
    name_en: DataTypes.STRING,
    key: DataTypes.STRING
  }, {
    tableName: 'Surveys', // ✅ must match migration
    timestamps: false
  });
};
