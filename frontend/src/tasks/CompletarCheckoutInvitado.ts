import { Page } from '@playwright/test';
import { CheckoutPage } from '../ui/CheckoutPage';

export const CompletarCheckoutInvitado = {
    conDatosPorDefecto: async (page: Page) => {
        // 0. Esperamos a que cualquier petición previa en la página termine
        await page.waitForLoadState('networkidle');

        // 1. Seleccionamos Guest Checkout
        const radioGuest = page.locator(CheckoutPage.radioGuest);
        await radioGuest.waitFor({ state: 'visible' });
        await radioGuest.check();

        // 2. PAUSA ESTRATÉGICA: Le damos 1 segundo a OpenCart para que registre el check
        await page.waitForTimeout(1000); 

        // 3. Hacemos clic en Continuar
        await page.click(CheckoutPage.botonContinueStep1);

        // 4. PAUSA ESTRATÉGICA 2: Esperamos 2 segundos a que el AJAX termine 
        // y la animación de JQuery baje el acordeón en el modo headless
        await page.waitForTimeout(2000);

        // 5. Ahora sí, intentamos interactuar con el Nombre
        const inputNombre = page.locator(CheckoutPage.inputFirstName);
        
        // Si la animación no bajó del todo, forzamos la escritura aunque el CSS diga que está oculto
        await inputNombre.fill('Cristhian', { force: true });

        // Paso 2: Datos Personales
        await page.fill(CheckoutPage.inputLastName, 'Montaño');
        await page.fill(CheckoutPage.inputEmail, 'cristhian.dev@example.com');
        await page.fill(CheckoutPage.inputTelephone, '3001234567');
        await page.fill(CheckoutPage.inputAddress1, 'Calle Falsa 123');
        await page.fill(CheckoutPage.inputCity, 'Neiva');
        await page.fill(CheckoutPage.inputPostCode, '410001');
        
        await page.selectOption(CheckoutPage.selectCountry, { label: 'Colombia' });
        
        // Pausa para que carguen los departamentos de Colombia
        await page.waitForTimeout(1000);
        await page.selectOption(CheckoutPage.selectRegion, { label: 'Huila' });
        
        await page.click(CheckoutPage.botonContinueStep2);

        // Pasos finales con pequeñas pausas para vencer al acordeón
        await page.waitForTimeout(1000);
        await page.click(CheckoutPage.botonContinueStep3);

        await page.waitForTimeout(1000);
        await page.check(CheckoutPage.checkboxTerms, { force: true });
        await page.click(CheckoutPage.botonContinueStep4);

        await page.waitForTimeout(1000);
        await page.click(CheckoutPage.botonConfirmOrder);
    }
};
