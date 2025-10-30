module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Division', {
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
    tableName: 'Divisions', // ✅ must match migration
    timestamps: false
  });
};
