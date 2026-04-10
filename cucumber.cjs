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
      'progress', // Muestra el progreso en la terminal (puntitos verdes)
      'html:reports/cucumber-report.html' // Genera un reporte HTML nativo en la carpeta reports
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    }
  }
};
