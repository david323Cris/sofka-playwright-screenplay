import { Given, When, Then } from '@cucumber/cucumber';
import { page } from './setup'; // Importamos la página compartida
import { AgregarAlCarrito, VisualizarCarrito, CompletarCheckoutInvitado } from '../src/tasks/index';
import { ValidarMensajeExito } from '../src/questions/ValidarMensajeExito';

Given('que el usuario navega a la tienda de OpenCart', async () => {
    await page.goto('http://opencart.abstracta.us/');
});

When('busca y agrega el producto {string} al carrito', async (nombreProducto: string) => {
    // Llamamos a nuestra tarea original pasando la instancia de page
    await AgregarAlCarrito.elProducto(page, nombreProducto);
});

When('visualiza el carrito de compras', async () => {
    await VisualizarCarrito.ahora(page);
});

When('completa el formulario de checkout como invitado', async () => {
    await CompletarCheckoutInvitado.conDatosPorDefecto(page);
});

Then('debería ver el mensaje de confirmación {string}', async (mensajeEsperado: string) => {
    // Le pasamos la página y el texto que viene del Gherkin
    await ValidarMensajeExito.queContenga(page, mensajeEsperado);
});