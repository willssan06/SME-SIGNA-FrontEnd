const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { cloudPlugin } = require('cypress-cloud/plugin');
const currentsConfig = require('./currents.config.js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qa-signa.sme.prefeitura.sp.gov.br',

    specPattern: 'cypress/e2e/**/*.feature',
    excludeSpecPattern: ['cypress/e2e/ui/consulta_rf.feature'],

    supportFile: 'cypress/support/e2e.js',

    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    video: false,
    videoCompression: false,
    screenshotOnRunFailure: true,

    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout: 30000,

    viewportWidth: 1920,
    viewportHeight: 1080,

    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0,
    watchForFileChanges: false,

    retries: {
      runMode: 1,
      openMode: 0,
    },

    env: {
      baseUrl:
        process.env.BASE_URL ||
        'https://qa-signa.sme.prefeitura.sp.gov.br',

      loginUrl:
        process.env.LOGIN_URL ||
        'https://qa-signa.sme.prefeitura.sp.gov.br/login',

      username:
        process.env.SIGNA_USERNAME ||
        process.env.USERNAME ||
        '',

      password:
        process.env.SIGNA_PASSWORD ||
        process.env.PASSWORD ||
        '',

      newPasswordTest:
        process.env.SIGNA_NEW_PASSWORD_TEST ||
        '',

      CI: process.env.CI || false,

      API_EOL_BASE_URL:
        process.env.API_EOL_BASE_URL ||
        'https://hom-smeintegracaoapi.sme.prefeitura.sp.gov.br',

      API_EOL_KEY: process.env.API_EOL_KEY,
      API_RF_LOGIN: process.env.API_RF_LOGIN,
      API_PASSWORD: process.env.API_PASSWORD,
      API_EMAIL: process.env.API_EMAIL,
    },

    async setupNodeEvents(on, config) {

      // ==========================================
      // CLOUD / SORRY CYPRESS
      // ==========================================
      const mergedConfig = {
        ...config,
        ...currentsConfig,
      };

      await cloudPlugin(on, mergedConfig);

      // ==========================================
      // CUCUMBER
      // ==========================================
      await preprocessor.addCucumberPreprocessorPlugin(
        on,
        mergedConfig
      );

      on(
        'file:preprocessor',
        createBundler({
          plugins: [
            createEsbuildPlugin.default(
              mergedConfig
            ),
          ],
        })
      );

      // ==========================================
      // TASKS
      // ==========================================
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },

        table(message) {
          console.table(message);
          return null;
        },

        lerArquivoSeguro(caminho) {
          try {
            const fs = require('fs');
            const path = require('path');

            const caminhoAbsoluto = path.isAbsolute(
              caminho
            )
              ? caminho
              : path.join(
                  process.cwd(),
                  caminho
                );

            if (
              fs.existsSync(caminhoAbsoluto)
            ) {
              return fs.readFileSync(
                caminhoAbsoluto,
                'utf8'
              );
            }

            return null;
          } catch (e) {
            return null;
          }
        },
      });

      // ==========================================
      // FIREFOX
      // ==========================================
      on(
        'before:browser:launch',
        (browser, launchOptions) => {
          if (
            browser.family === 'firefox'
          ) {
            launchOptions.preferences[
              'layers.acceleration.disabled'
            ] = true;

            launchOptions.preferences[
              'dom.max_script_run_time'
            ] = 0;

            launchOptions.preferences[
              'dom.max_chrome_script_run_time'
            ] = 0;

            launchOptions.preferences[
              'browser.cache.disk.enable'
            ] = false;

            launchOptions.preferences[
              'browser.cache.memory.enable'
            ] = false;
          }

          return launchOptions;
        }
      );

      return mergedConfig;
    },
  },
});