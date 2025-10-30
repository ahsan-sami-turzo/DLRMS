const axios = require('axios');
const { getToken } = require('../utils/tokenLoader');

const apiClient = axios.create({
  baseURL: 'https://gateway.dlrms.land.gov.bd/core-api/api/public/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:144.0) Gecko/20100101 Firefox/144.0',
    'Accept': 'application/json',
    'Origin': 'https://dlrms.land.gov.bd',
    'Referer': 'https://dlrms.land.gov.bd/'
  }
});

apiClient.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${getToken()}`;
  return config;
});

module.exports = apiClient;
