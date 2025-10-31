const { sequelize } = require('../models');
const { logError } = require('../utils/logger');
const { fetchAndStoreSurveys } = require('../services/surveyService');
const { fetchAndStoreDivisions } = require('../services/divisionService');
const { fetchAndStoreDistricts } = require('../services/districtService');
const { fetchAndStoreUpazilas } = require('../services/upazilaService');
const { fetchAndStoreSurveyTypes } = require('../services/surveyTypeService');
const { fetchAndStoreMouzaJLNumbers } = require('../services/mouzaNumberService');

async function runScraper() {
  try {
    await sequelize.sync();

    console.log('🔄 Fetching Surveys...');
    await fetchAndStoreSurveys();
    console.log('✅ Surveys stored.');

    console.log('🔄 Fetching Divisions...');
    await fetchAndStoreDivisions();
    console.log('✅ Divisions stored.');

    console.log('🔄 Fetching Districts...');
    await fetchAndStoreDistricts();
    console.log('✅ Districts stored.');

    console.log('🔄 Fetching Upazilas...');
    await fetchAndStoreUpazilas();
    console.log('✅ Upazilas stored.');

    console.log('🔄 Fetching Survey Types...');
    await fetchAndStoreSurveyTypes();
    console.log('✅ Survey Types stored.');

    console.log('🔄 Fetching JL Numbers...');
    await fetchAndStoreMouzaJLNumbers();
    console.log('✅ Mouza Numbers stored.');

    console.log('🎉 Scraping complete.');
  } catch (err) {
    console.error('❌ Scraping failed. See logs/error.log for details.');
    logError(err);
  }
}

runScraper();
