const { sequelize, MouzaJLNumber, Khatian } = require('../models');
const apiClient = require('../services/apiClient');
const cliProgress = require('cli-progress');

async function fetchKhatiansForJL(jlNumberId, survey = 'BRS') {
  const baseUrl = `/index-khatian/${survey}`;
  const pageSize = 100;

  // Step 1: Get metadata
  const metaRes = await apiClient.get(`${baseUrl}?JL_NUMBER_ID=${jlNumberId}&PAGE_NO=1&PAGE_SIZE=${pageSize}`);
  const meta = metaRes.data?.data?.meta;

  if (!meta || !meta.totalPages) {
    console.warn(`⚠️ No metadata for JL_NUMBER_ID ${jlNumberId}`);
    return [];
  }

  const totalPages = meta.totalPages;
  const allRecords = [];

  for (let page = 1; page <= totalPages; page++) {
    try {
      const res = await apiClient.get(`${baseUrl}?JL_NUMBER_ID=${jlNumberId}&PAGE_NO=${page}&PAGE_SIZE=${pageSize}`);
      const items = res.data?.data?.items || [];

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

      allRecords.push(...records);
    } catch (err) {
      console.warn(`❌ Failed page ${page} for JL ${jlNumberId}: ${err.message}`);
    }
  }

  return allRecords;
}

async function runKhatianScraper() {
  try {
    await sequelize.sync();

    const jlNumbers = await MouzaJLNumber.findAll();
    console.log(`🔍 Found ${jlNumbers.length} JL numbers.`);

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(jlNumbers.length, 0);

    for (const jl of jlNumbers) {
      const records = await fetchKhatiansForJL(jl.id);
      if (records.length > 0) {
        await Khatian.bulkCreate(records, { ignoreDuplicates: true });
        console.log(`✅ Stored ${records.length} khatians for JL ${jl.id}`);
      }
      progressBar.increment();
    }

    progressBar.stop();
    console.log('🎉 All khatian data scraped and stored.');
  } catch (err) {
    console.error('❌ Khatian scraping failed:', err);
  }
}

runKhatianScraper();
