const { defineConfig } = require("cypress");
import { faker } from '@faker-js/faker';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://impolite-needy-viperfish.gigalixirapp.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
      });
    },
  },
});
