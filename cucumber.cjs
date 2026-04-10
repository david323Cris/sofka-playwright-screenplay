module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'frontend/step_definitions/**/*.ts'
    ],
    paths: [
      'frontend/features/**/*.feature'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'allure-cucumberjs/reporter' // <-- El integrador de Allure
    ],
    formatOptions: {
      snippetInterface: 'async-await',
      resultsDir: 'allure-results' // <-- Donde Allure guardará los datos crudos
    }
  }
};