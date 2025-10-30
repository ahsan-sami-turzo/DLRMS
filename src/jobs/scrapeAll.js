const { sequelize } = require('../models');
const { fetchAndStoreSurveys } = require('../services/surveyService');
const { fetchAndStoreDivisions } = require('../services/divisionService');
const { fetchAndStoreDistricts } = require('../services/districtService');
const { fetchAndStoreUpazilas } = require('../services/upazilaService');

async function runScraper() {
  await sequelize.sync();
  await fetchAndStoreSurveys();
  await fetchAndStoreDivisions();
  await fetchAndStoreDistricts();
  await fetchAndStoreUpazilas();
  console.log('✅ All data scraped and stored.');
}

runScraper();
