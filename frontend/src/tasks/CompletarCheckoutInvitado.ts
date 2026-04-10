import { Page } from '@playwright/test';
import { CheckoutPage } from '../ui/CheckoutPage';

export const CompletarCheckoutInvitado = {
    conDatosPorDefecto: async (page: Page) => {
        // Paso 1: Guest
        await page.click(CheckoutPage.radioGuest);
        await page.click(CheckoutPage.botonContinueStep1);

        // Paso 2: Datos Personales
        await page.fill(CheckoutPage.inputFirstName, 'Cristhian');
        await page.fill(CheckoutPage.inputLastName, 'Montaño');
        await page.fill(CheckoutPage.inputEmail, 'cristhian.dev@example.com');
        await page.fill(CheckoutPage.inputTelephone, '3001234567');
        await page.fill(CheckoutPage.inputAddress1, 'Calle Falsa 123');
        await page.fill(CheckoutPage.inputCity, 'Neiva');
        await page.fill(CheckoutPage.inputPostCode, '410001');
        
        // Selects de Colombia y Huila
        await page.selectOption(CheckoutPage.selectCountry, { label: 'Colombia' });
        await page.selectOption(CheckoutPage.selectRegion, { label: 'Huila' });
        
        await page.click(CheckoutPage.botonContinueStep2);

        // Paso 3, 4 y 5: Flujo rápido
        await page.click(CheckoutPage.botonContinueStep3);
        await page.check(CheckoutPage.checkboxTerms);
        await page.click(CheckoutPage.botonContinueStep4);
        await page.click(CheckoutPage.botonConfirmOrder);
    }
};