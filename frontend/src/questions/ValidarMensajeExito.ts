import { Page, expect } from '@playwright/test';
import { CheckoutPage } from '../ui/CheckoutPage';

export const ValidarMensajeExito = {
    queContenga: async (page: Page, mensajeEsperado: string) => {
        // Obtenemos el localizador del título en la página final
        const tituloFinal = page.locator(CheckoutPage.mensajeExito);
        
        // El 'expect' nativo de Playwright hará scroll y esperará hasta 10 segundos
        // para asegurar que el texto contenga lo que buscamos
        await expect(tituloFinal).toContainText(mensajeEsperado, { timeout: 10000 });
    }
};
