import { Page } from '@playwright/test';
import { HomePage } from '../ui/HomePage';

export const VisualizarCarrito = {
    ahora: async (page: Page) => {
        // Subimos al header si es necesario y abrimos el carrito
        await page.locator(HomePage.botonCarritoHeader).scrollIntoViewIfNeeded();
        await page.click(HomePage.botonCarritoHeader);
        await page.click(HomePage.linkViewCart);

        // 2. Ya en la página del carrito, buscamos el botón de Checkout final
        // Usamos un selector que busque el botón azul de Checkout en la parte inferior
        const botonCheckoutFinal = page.locator('a.btn-primary:has-text("Checkout")');
        
        // 3. Forzamos el scroll y hacemos clic
        await botonCheckoutFinal.scrollIntoViewIfNeeded();
        await botonCheckoutFinal.click();
    }
};