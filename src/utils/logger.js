const fs = require('fs');
const path = require('path');

function logError(error) {
  const logPath = path.join(__dirname, '../../logs/error.log');
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] ${error.stack || error}\n`;

  fs.appendFileSync(logPath, message);
}

module.exports = { logError };
