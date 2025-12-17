// index.js
const webdriver = require('selenium-webdriver');

const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
const buildName = process.env.BROWSERSTACK_BUILD_NAME || 'BStack Build Name';
const projectName = process.env.BROWSERSTACK_PROJECT_NAME || 'BStack Project Name';
const localIdentifier = process.env.BROWSERSTACK_LOCAL_IDENTIFIER || 'browserstack_local_identifier';

// Input capabilities
const capabilities = {
  os: 'Windows',
  os_version: '10',
  browserName: 'Chrome',
  browser_version: '100.0',
  'browserstack.local': 'true',
  'browserstack.localIdentifier': localIdentifier,
  seleniumVersion: '4.0.0',
  build: buildName,
  project: projectName,
  'browserstack.user': username,
  'browserstack.key': accessKey
};

const driver = new webdriver.Builder()
  .usingServer('https://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities(capabilities)
  .build();

// HTTP Server should be running on 8099 port of GitHub runner
driver.get('http://localhost:8099').then(function () {
  driver.getTitle().then(function (title) {
    console.log(title);
    driver.quit();
  });
});
