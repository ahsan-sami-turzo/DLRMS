const fs = require('fs');
const path = require('path');

function getToken() {
  const tokenPath = path.join(__dirname, 'tokens.json');
  const tokenData = JSON.parse(fs.readFileSync(tokenPath));
  return tokenData.dlrms_app_token;
}

module.exports = { getToken };
