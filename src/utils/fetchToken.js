const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function fetchToken() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://dlrms.land.gov.bd', { waitUntil: 'networkidle' });

    const cookies = await context.cookies();

    const appToken = cookies.find(c => c.name === 'dlrms_app_token')?.value || null;
    const refreshToken = cookies.find(c => c.name === 'dlrms_app_refresh_token')?.value || null;

    if (!appToken || !refreshToken) {
      throw new Error('Tokens not found in cookies');
    }

    const tokenData = {
      timestamp: new Date().toISOString(),
      dlrms_app_token: appToken,
      dlrms_app_refresh_token: refreshToken
    };

    const tokenPath = path.join(__dirname, 'tokens.json');
    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));
    console.log('✅ Tokens saved to tokens.json');
  } catch (err) {
    console.error('❌ Error fetching token:', err.message);
    throw err;
  } finally {
    await browser.close();
  }
}

module.exports = { fetchToken };
