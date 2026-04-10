import { APIRequestContext } from '@playwright/test';

export const AutenticacionTask = {
    registrarUsuario: async (request: APIRequestContext, usuario: string, clave: string) => {
        return await request.post('/signup', {
            data: {
                username: usuario,
                password: btoa(clave) // Demoblaze a veces requiere la clave en base64 o simple, depende de la versión
            }
        });
    },

    iniciarSesion: async (request: APIRequestContext, usuario: string, clave: string) => {
        return await request.post('/login', {
            data: {
                username: usuario,
                password: btoa(clave)
            }
        });
    }
};