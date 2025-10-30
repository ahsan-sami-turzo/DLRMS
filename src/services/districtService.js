const apiClient = require('./apiClient');
const { District } = require('../models');

async function fetchAndStoreDistricts() {
  const response = await apiClient.get('districts?ROW_STATUS=1');
  const districts = response.data.data;

  await District.destroy({ where: {} });

  for (const item of districts) {
    await District.create({
      id: item.ID,
      name: item.NAME,
      name_en: item.NAME_EN,
      bbs_code: item.BBS_CODE,
      division_bbs_code: item.DIVISION_BBS_CODE,
      row_status: item.ROW_STATUS,
      division_id: item.DIVISION_ID,
      division_name: item.DIVISION_NAME,
      division_name_en: item.DIVISION_NAME_EN
    });
  }
}

module.exports = { fetchAndStoreDistricts };
