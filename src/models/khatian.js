module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Khatian', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    jl_number_id: DataTypes.INTEGER,
    mouza_id: DataTypes.INTEGER,
    khatian_no: DataTypes.STRING,
    office_id: DataTypes.INTEGER,
    khatian_entry_id: DataTypes.INTEGER,
    dags: DataTypes.TEXT,
    owners: DataTypes.TEXT,
    guardians: DataTypes.TEXT,
    total_land: DataTypes.STRING,
    remaining_land: DataTypes.STRING,
    agoto_khatian_no: DataTypes.STRING,
    next_khatian_no: DataTypes.STRING,
    organization_type: DataTypes.INTEGER,
    segregation_status: DataTypes.STRING,
    is_locked: DataTypes.BOOLEAN,
    canonical_khatian_no: DataTypes.INTEGER,
    root_khatian_id: DataTypes.INTEGER,
    version_no: DataTypes.STRING,
    latest: DataTypes.BOOLEAN
  }, {
    tableName: 'Khatians',
    timestamps: false
  });
};
