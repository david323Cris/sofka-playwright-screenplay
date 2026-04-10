import { Task } from '@serenity-js/core';
import { Ensure, includes } from '@serenity-js/assertions';
import { Text } from '@serenity-js/web';
import { CheckoutPage } from '../ui/CheckoutPage';

export const ValidarMensajeExito = {
    queDiga: (mensajeEsperado: string) =>
        Task.where(`#actor valida que el mensaje de éxito contenga "${mensajeEsperado}"`,
            // Le pedimos a Serenity que asegure (Ensure) que el Texto del elemento incluya nuestro mensaje
            Ensure.that(Text.of(CheckoutPage.mensajeConfirmacion), includes(mensajeEsperado))
        )
};
