module.exports = {
  // Perfil para Frontend (el que ya tienes)
  default: {
    requireModule: ['ts-node/register'],
    require: ['frontend/step_definitions/**/*.ts'],
    paths: ['frontend/features/**/*.feature'],
    format: ['progress', 'html:reports/frontend-report.html', 'allure-cucumberjs/reporter'],
    formatOptions: { snippetInterface: 'async-await', resultsDir: 'allure-results' }
  },
  // NUEVO: Perfil para Backend
  api: {
    requireModule: ['ts-node/register'],
    require: ['backend/step_definitions/**/*.ts'],
    paths: ['backend/features/**/*.feature'],
    format: ['progress', 'html:reports/backend-report.html', 'allure-cucumberjs/reporter'],
    formatOptions: { snippetInterface: 'async-await', resultsDir: 'allure-results-api' }
  }
};