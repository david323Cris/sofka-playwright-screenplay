import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

// Tiempo de espera por defecto para Cucumber (30 segundos)
setDefaultTimeout(30 * 1000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

// Se ejecuta una sola vez al inicio de todas las pruebas
BeforeAll(async () => {
    browser = await chromium.launch({ 
        headless: false, // Cambia a true si no quieres ver el navegador
        slowMo: 500      // Pausa de 500ms entre acciones para que alcances a ver qué hace
    });
});

// Se ejecuta antes de cada Escenario
Before(async () => {
    context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true
    });
    page = await context.newPage();
});

// Se ejecuta después de cada Escenario
After(async () => {
    await page.close();
    await context.close();
});

// Se ejecuta al final de todo
AfterAll(async () => {
    await browser.close();
});

// Exportamos la instancia de 'page' para que los Steps la importen
export { page };