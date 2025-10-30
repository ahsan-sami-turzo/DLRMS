const { sequelize } = require('../models');
const { fetchAndStoreSurveys } = require('../services/surveyService');
const { fetchAndStoreDivisions } = require('../services/divisionService');

async function runScraper() {
  await sequelize.sync(); // ensures tables exist
  await fetchAndStoreSurveys();
  await fetchAndStoreDivisions();
  console.log('Scraping complete.');
}

runScraper();
