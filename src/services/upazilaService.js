const apiClient = require('./apiClient');
const { Upazila } = require('../models');

async function fetchAndStoreUpazilas() {
  const response = await apiClient.get('upazilas?ROW_STATUS=1');
  const upazilas = Object.values(response.data.data); // flatten object

  await Upazila.destroy({ where: {} });

  for (const item of upazilas) {
    await Upazila.create({
      id: item.ID,
      lams_id: item.LAMS_ID,
      is_circle: item.IS_CIRCLE,
      name: item.NAME,
      name_en: item.NAME_EN,
      bbs_code: item.BBS_CODE,
      row_status: item.ROW_STATUS,
      division_bbs_code: item.DIVISION_BBS_CODE,
      division_id: item.DIVISION_ID,
      division_name: item.DIVISION_NAME,
      division_name_en: item.DIVISION_NAME_EN,
      district_bbs_code: item.DISTRICT_BBS_CODE,
      district_id: item.DISTRICT_ID,
      district_name: item.DISTRICT_NAME,
      district_name_en: item.DISTRICT_NAME_EN
    });
  }
}

module.exports = { fetchAndStoreUpazilas };
