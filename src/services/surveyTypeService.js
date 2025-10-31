const apiClient = require('./apiClient');
const { SurveyType } = require('../models');

async function fetchAndStoreSurveyTypes() {
  const response = await apiClient.get('upazilas/surveys?DISTRICT_BBS_CODE=26&UPAZILA_BBS_CODE=16');
  const types = response.data.data;

  await SurveyType.destroy({ where: {} });

  for (const item of types) {
    await SurveyType.create({
      survey_id: item.SURVEY_ID,
      local_name: item.LOCAL_NAME,
      survey_order: item.SURVEY_ORDER
    });
  }
}

module.exports = { fetchAndStoreSurveyTypes };