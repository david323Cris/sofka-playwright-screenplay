import { Given, When, Then } from '@cucumber/cucumber';
import { expect, APIResponse } from '@playwright/test';
import { apiContext } from './setup_api';
import { AutenticacionTask } from '../src/tasks/AutenticacionTask';
import { DataGenerator } from '../utils/DataGenerator';

let user: string;
let pass: string;
let response: APIResponse;

// --- ENTRADAS (GIVEN) ---

Given('que el usuario tiene un nombre de usuario único y clave {string}', async function (password: string) {
    user = DataGenerator.generarUsuarioUnico();
    pass = password;
    this.attach(`Entrada preparada - Usuario: ${user}, Clave: ${pass}`);
});

Given('que el usuario intenta registrarse con {string} y clave {string}', async function (usuario: string, password: string) {
    user = usuario;
    pass = password;
    this.attach(`Entrada preparada - Usuario: ${user}, Clave: ${pass}`);
});

// ESTE ES EL PASO QUE FALTABA
Given('que el usuario tiene credenciales válidas', async function () {
    user = DataGenerator.generarUsuarioUnico();
    pass = 'Sofka2026!';
    
    // Como Senior, garantizamos la atomicidad registrando al usuario antes del login
    const setupResponse = await AutenticacionTask.registrarUsuario(apiContext, user, pass);
    const setupBody = await setupResponse.text();
    
    this.attach(`PRE-REQUISITO (Registro previo para Login):\nPayload: ${user}\nRespuesta: ${setupBody}`);
});

Given('que el usuario intenta loguearse con {string} y clave {string}', async function (usuario: string, password: string) {
    user = usuario;
    pass = password;
    this.attach(`Entrada preparada para error - Usuario: ${user}, Clave: ${pass}`);
});

// --- ACCIONES Y CAPTURA (WHEN) ---

When('envía una solicitud de registro', async function () {
    const payload = { username: user, password: btoa(pass) };
    
    // CAPTURAMOS LA ENTRADA EN EL REPORTE
    this.attach(`SOLICITUD POST /signup\nPayload: ${JSON.stringify(payload, null, 2)}`, 'application/json');
    
    response = await AutenticacionTask.registrarUsuario(apiContext, user, pass);
    
    // CAPTURAMOS LA SALIDA EN EL REPORTE
    const body = await response.text();
    this.attach(`RESPUESTA /signup\nStatus: ${response.status()}\nBody: ${body}`, 'application/json');
});

When('envía una solicitud de inicio de sesión', async function () {
    const payload = { username: user, password: btoa(pass) };
    
    this.attach(`SOLICITUD POST /login\nPayload: ${JSON.stringify(payload, null, 2)}`, 'application/json');
    
    response = await AutenticacionTask.iniciarSesion(apiContext, user, pass);
    
    const body = await response.text();
    this.attach(`RESPUESTA /login\nStatus: ${response.status()}\nBody: ${body}`, 'application/json');
});

// --- VALIDACIONES (THEN) ---

Then('el código de respuesta es {int}', async function (status: number) {
    expect(response.status()).toBe(status);
});

Then('la respuesta no debería contener un mensaje de error', async function () {
    const body = await response.json();
    expect(body.errorMessage).toBeUndefined();
});

Then('el cuerpo de la respuesta debería decir {string}', async function (mensajeError: string) {
    const body = await response.json();
    expect(body.errorMessage).toBe(mensajeError);
});

Then('la respuesta debería contener el campo {string}', async function (campo: string) {
    const body = await response.text();
    expect(body).toContain(campo);
});