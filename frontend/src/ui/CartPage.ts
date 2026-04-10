import { By, PageElement } from '@serenity-js/web';

export const CartPage = {
    botonCheckout: PageElement.located(By.xpath('//a[contains(text(), "Checkout") and contains(@class, "btn-primary")]'))
        .describedAs('botón primario de ir a pagar')
};
