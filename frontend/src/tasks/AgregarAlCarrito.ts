import { Page } from '@playwright/test';
import { HomePage } from '../ui/HomePage';

export const AgregarAlCarrito = {
    elProducto: async (page: Page, nombreProducto: string) => {
        // Playwright limpia y escribe
        await page.fill(HomePage.barraDeBusqueda, nombreProducto);
        await page.click(HomePage.botonBuscar);

        // Usamos el selector dinámico que ya teníamos
        const selectorBotón = HomePage.botonAgregarAlCarrito(nombreProducto);
        
        // FORZAMOS EL SCROLL NATIVO DE PLAYWRIGHT
        const boton = page.locator(selectorBotón);
        await boton.scrollIntoViewIfNeeded();
        
        // Hacemos el clic
        await boton.click();
        
        // Esperamos el mensaje de éxito para asegurar que se agregó antes de seguir
        await page.waitForSelector('.alert-success');
    }
};