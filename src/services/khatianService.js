const apiClient = require('./apiClient');
const { Khatian } = require('../models'); // Define this model separately
const cliProgress = require('cli-progress');

async function fetchAndStoreKhatians(jlNumberId, survey = 'BRS') {
  const baseUrl = `/index-khatian/${survey}`;
  const pageSize = 100;

  // Step 1: Initial request to get metadata
  const metaResponse = await apiClient.get(`${baseUrl}?JL_NUMBER_ID=${jlNumberId}&PAGE_NO=1&PAGE_SIZE=${pageSize}`);
  const meta = metaResponse.data?.data?.meta;

  if (!meta || !meta.totalPages) {
    console.warn(`⚠️ No metadata found for JL_NUMBER_ID ${jlNumberId}`);
    return;
  }

  const totalPages = meta.totalPages;
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(totalPages, 0);

  for (let page = 1; page <= totalPages; page++) {
    try {
      const response = await apiClient.get(`${baseUrl}?JL_NUMBER_ID=${jlNumberId}&PAGE_NO=${page}&PAGE_SIZE=${pageSize}`);
      const items = response.data?.data?.items || [];

      const records = items.map(item => ({
        id: item.ID,
        jl_number_id: item.JL_NUMBER_ID,
        mouza_id: item.MOUZA_ID,
        khatian_no: item.KHATIAN_NO,
        office_id: item.OFFICE_ID,
        khatian_entry_id: item.KHATIAN_ENTRY_ID,
        dags: item.DAGS,
        owners: item.OWNERS,
        guardians: item.GUARDIANS,
        total_land: item.TOTAL_LAND,
        remaining_land: item.REMAINING_LAND,
        agoto_khatian_no: item.AGOTO_KHATIAN_NO,
        next_khatian_no: item.NEXT_KHATIAN_NO,
        organization_type: item.ORGANIZATION_TYPE,
        segregation_status: item.SEGREGATION_STATUS,
        is_locked: item.IS_LOCKED,
        canonical_khatian_no: item.CANONICAL_KHATIAN_NO,
        root_khatian_id: item.ROOT_KHATIAN_ID,
        version_no: item.VERSION_NO,
        latest: item.LATEST
      }));

      await Khatian.bulkCreate(records, { ignoreDuplicates: true });
    } catch (err) {
      console.warn(`❌ Failed to fetch page ${page} for JL_NUMBER_ID ${jlNumberId}: ${err.message}`);
    }

    progressBar.increment();
  }

  progressBar.stop();
  console.log(`✅ All khatians fetched for JL_NUMBER_ID ${jlNumberId}`);
}

module.exports = { fetchAndStoreKhatians };
