const apiClient = require('./apiClient');
const { Division } = require('../models');

async function fetchAndStoreDivisions() {
  const response = await apiClient.get('divisions?ROW_STATUS=1');
  const divisions = response.data.data;

  await Division.destroy({ where: {} }); // ✅ Clear old data
  
  for (const item of divisions) {
    await Division.upsert({
      id: item.ID,
      name: item.NAME,
      name_en: item.NAME_EN,
      bbs_code: item.BBS_CODE,
      row_status: item.ROW_STATUS
    });
  }
}

module.exports = { fetchAndStoreDivisions };
