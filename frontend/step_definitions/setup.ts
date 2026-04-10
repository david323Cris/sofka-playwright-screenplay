import { Before, After, BeforeAll, AfterAll, AfterStep, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

// Tiempo de espera por defecto (30 segundos)
setDefaultTimeout(30 * 1000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async () => {
    browser = await chromium.launch({ 
        headless: false, 
        slowMo: 500
    });
});

Before(async () => {
    context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true
    });
    page = await context.newPage();
});

// NUEVO: Captura de pantalla después de CADA paso del Gherkin
AfterStep(async function ({ pickleStep, result }) {
    // Tomamos la captura en formato buffer
    const imagen = await page.screenshot({ 
        fullPage: true // true para que tome toda la página, no solo lo que se ve
    });
    
    // Adjuntamos la imagen al reporte de Cucumber/Allure
    // IMPORTANTE: usamos 'this.attach' (por eso usamos 'function' y no '() =>')
    this.attach(imagen, 'image/png');
});

After(async function ({ result }) {
    // Opcional: Si solo quisieras capturas cuando falla, lo harías así:
    if (result?.status === Status.FAILED) {
       const image = await page.screenshot();
       this.attach(image, 'image/png');
    }

    await page.close();
    await context.close();
});

AfterAll(async () => {
    await browser.close();
});

export { page };