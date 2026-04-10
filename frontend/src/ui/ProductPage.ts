import { By, PageElement } from '@serenity-js/web';

export const ProductPage = {
    botonAddToCart: PageElement.located(By.id('button-cart'))
        .describedAs('botón de agregar al carrito'),
        
    mensajeExito: PageElement.located(By.css('.alert.alert-success'))
        .describedAs('mensaje verde de éxito al agregar producto')
};
