const apiClient = require('./apiClient');
const { SurveyType, Upazila, MouzaJLNumber } = require('../models');
const cliProgress = require('cli-progress');

const MAX_CONCURRENT = 10;

async function fetchAndStoreMouzaJLNumbers() {
  const surveyTypes = await SurveyType.findAll();
  const upazilas = await Upazila.findAll({ where: { is_circle: 0 } });

  const tasks = [];

  for (const survey of surveyTypes) {
    for (const upazila of upazilas) {
      const districtCode = upazila.district_bbs_code;
      const upazilaCode = upazila.bbs_code;
      const surveyId = survey.survey_id;

      if (!districtCode || !upazilaCode || !surveyId) continue;

      tasks.push({
        endpoint: `mouzas/jl-numbers?DISTRICT_BBS_CODE=${districtCode}&UPAZILA_BBS_CODE=${upazilaCode}&SURVEY_ID=${surveyId}`,
        upazilaName: upazila.name_en,
        surveyId
      });
    }
  }

  console.log(`🔍 Preparing ${tasks.length} JL Number requests...`);
  await MouzaJLNumber.destroy({ where: {} });

  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(tasks.length, 0);

  const failed = [];

  for (let i = 0; i < tasks.length; i += MAX_CONCURRENT) {
    const batch = tasks.slice(i, i + MAX_CONCURRENT);

    const results = await Promise.allSettled(
      batch.map(({ endpoint, upazilaName, surveyId }) =>
        apiClient.get(endpoint)
          .then(res => {
            const mouzas = res.data?.data || [];
            if (mouzas.length === 0) return;

            const records = mouzas.map(item => ({
              id: item.ID,
              mouza_id: item.MOUZA_ID,
              mouza_name: item.MOUZA_NAME,
              uuid: item.UUID,
              jl_number: item.JL_NUMBER,
              division_name: item.DIVISION_NAME,
              district_name: item.DISTRICT_NAME,
              upazila_name: item.UPAZILA_NAME,
              survey_id: item.SURVEY_ID,
              survey_name: item.SURVEY_NAME,
              survey_name_en: item.SURVEY_NAME_EN
            }));

            return MouzaJLNumber.bulkCreate(records, { ignoreDuplicates: true });
          })
          .catch(err => {
            failed.push({ endpoint, upazilaName, surveyId, error: err.message });
          })
      )
    );

    progressBar.increment(batch.length);
  }

  progressBar.stop();

  console.log(`🎉 Completed JL scraping. ${failed.length} requests failed.`);

  if (failed.length > 0) {
    console.log('⚠️ Failed requests:');
    failed.forEach(f => console.log(`- ${f.upazilaName} (Survey ${f.surveyId}): ${f.error}`));
  }
}

module.exports = { fetchAndStoreMouzaJLNumbers };
