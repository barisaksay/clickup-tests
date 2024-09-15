const { defineConfig } = require("cypress");
require('dotenv').config();


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    watchForFileChanges:false,
  
    env: {
      apiToken: process.env.API_TOKEN,
      apiUrl: process.env.API_URL,
      baseUrl: process.env.BASE_URL
    },
  },
});
