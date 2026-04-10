import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from './setup'; // Importamos la página compartida
import { AgregarAlCarrito, VisualizarCarrito, CompletarCheckoutInvitado } from '../src/tasks/index';
import { CheckoutPage } from '../src/ui/CheckoutPage';

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
    // Validación nativa de Playwright (Web-First Assertions)
    const locatorMensaje = page.locator(CheckoutPage.mensajeExito);
    await expect(locatorMensaje).toContainText(mensajeEsperado);
});