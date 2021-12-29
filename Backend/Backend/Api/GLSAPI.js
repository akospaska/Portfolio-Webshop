const axios = require("axios");

const GLSAPI = axios.create({
  baseURL: `https://api.test.mygls.hu/ParcelService.svc/json/`,
});

module.exports = GLSAPI;
