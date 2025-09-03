const getWorldParams = () => {
  const params = {
    foo: 'bar',
  };

  return params;
};

const config = {
  requireModule: ['ts-node/register'],
  require: ['src/**/*.ts'],
  format: [],
  formatOptions: { snippetInterface: 'async-await' },
  worldParameters: getWorldParams(),
};

if (!process.env.IS_CHILD_CUCUMBER) {
  config.format = [
    ...config.format,
    // 'message:e2e/reports/cucumber-report.ndjson',
    'json:' + process.env.BASE_PATH + '/reports/cucumber-report.json',
    'html:' + process.env.BASE_PATH + '/reports/report.html',
    'summary',
    'progress-bar',
  ];
  config.format.push('@cucumber/pretty-formatter');

  if (process.env.USE_ALLURE) {
    // config.format.push('./src/support/reporters/allure-reporter.ts');
  } else {
    config.format.push('@cucumber/pretty-formatter');
  }
} else {
  config.format = [...config.format];
}

export default config;
