import { BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { engage, Cast } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { Browser, chromium } from 'playwright';

// Timeout general para los pasos de Cucumber
setDefaultTimeout(60000);

let browser: Browser;

// Usamos BeforeAll para levantar el navegador una sola vez y hacer las pruebas más rápidas
BeforeAll(async () => {
    // Levantamos el navegador Chromium
    browser = await chromium.launch({ headless: false }); // Ponlo en 'true' para Docker

    // "engage" prepara el escenario y "Cast" define qué pueden hacer los actores
    engage(
        Cast.where(actor => 
            actor.whoCan(BrowseTheWebWithPlaywright.using(browser))
        )
    );
});

// Cerramos el navegador al terminar todas las pruebas
AfterAll(async () => {
    if (browser) {
        await browser.close();
    }
});