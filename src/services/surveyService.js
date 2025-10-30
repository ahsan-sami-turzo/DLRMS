const { fetchToken } = require('../utils/fetchToken');
const apiClient = require('./apiClient');
const { Survey } = require('../models');

async function fetchAndStoreSurveys() {
  await fetchToken(); // refresh token before API call

  const response = await apiClient.get('surveys?ROW_STATUS=1');
  const surveys = response.data.data;

  await Survey.destroy({ where: {} }); // ✅ Clear old data

  for (const item of surveys) {
    await Survey.upsert({
      id: item.ID,
      name: item.NAME,
      name_en: item.NAME_EN,
      key: item.KEY
    });
  }
}

module.exports = { fetchAndStoreSurveys };
