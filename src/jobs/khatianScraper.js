const { sequelize, MouzaJLNumber, Khatian } = require('../models');
const apiClient = require('../services/apiClient');
const cliProgress = require('cli-progress');

const MAX_CONCURRENT = 10;

async function fetchKhatiansForJL(jlNumberId, survey = 'BRS') {
  const baseUrl = `/index-khatian/${survey}`;
  const pageSize = 100;

  try {
    const metaRes = await apiClient.get(`${baseUrl}?JL_NUMBER_ID=${jlNumberId}&PAGE_NO=1&PAGE_SIZE=${pageSize}`);
    const meta = metaRes.data?.data?.meta;

    if (!meta || !meta.totalPages) return [];

    const totalPages = meta.totalPages;
    const allRecords = [];

    for (let page = 1; page <= totalPages; page++) {
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
    }

    return allRecords;
  } catch (err) {
    throw new Error(`JL ${jlNumberId} failed: ${err.message}`);
  }
}

async function runKhatianScraper() {
  try {
    await sequelize.sync();

    const jlNumbers = await MouzaJLNumber.findAll();
    const jlIds = jlNumbers.map(jl => jl.id);
    const failed = [];

    console.log(`🔍 Found ${jlIds.length} JL numbers.`);
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(jlIds.length, 0);

    for (let i = 0; i < jlIds.length; i += MAX_CONCURRENT) {
      const batch = jlIds.slice(i, i + MAX_CONCURRENT);

      const results = await Promise.allSettled(
        batch.map(jlId =>
          fetchKhatiansForJL(jlId)
            .then(records => {
              if (records.length > 0) {
                return Khatian.bulkCreate(records, { ignoreDuplicates: true });
              }
            })
            .catch(() => failed.push(jlId))
        )
      );

      progressBar.increment(batch.length);
    }

    // Retry failed JL numbers once
    if (failed.length > 0) {
      console.log(`🔁 Retrying ${failed.length} failed JL numbers...`);
      for (const jlId of failed) {
        try {
          const records = await fetchKhatiansForJL(jlId);
          if (records.length > 0) {
            await Khatian.bulkCreate(records, { ignoreDuplicates: true });
            console.log(`✅ Retry success for JL ${jlId}`);
          }
        } catch (err) {
          console.warn(`❌ Retry failed for JL ${jlId}: ${err.message}`);
        }
      }
    }

    progressBar.stop();
    console.log('🎉 All khatian data scraped and stored.');
  } catch (err) {
    console.error('❌ Khatian scraping failed:', err);
  }
}

runKhatianScraper();
