## 📊 Hallazgos y Conclusiones de la Prueba Técnica

### 1. Justificación de Herramientas (Playwright vs Serenity/Karate)
Aunque las instrucciones mencionaban Serenity BDD y Karate como herramientas deseables, se optó por unificar el stack tecnológico utilizando Playwright + Cucumber con TypeScript. 
* **Conclusión:** Esta decisión arquitectónica reduce la curva de aprendizaje, unifica el lenguaje de programación (TypeScript) tanto para pruebas E2E como para servicios REST, y disminuye el peso del proyecto al no requerir la JVM (Java) de fondo. Playwright ofrece un manejo superior del DOM asíncrono y un contexto de API nativo extremadamente rápido.

### 2. Hallazgos en el Frontend (OpenCart)
Durante la automatización del escenario "Guest Checkout", se identificó un comportamiento de "flakiness" inherente a la página. 
* **Hallazgo:** El proceso de Checkout utiliza animaciones jQuery (Acordeones) y peticiones AJAX sincrónicas para desplegar los formularios de los pasos 2, 3, 4 y 5. Al ejecutar los tests en modo "Headless" (especialmente dentro de Docker), Playwright interactúa a velocidades superiores a la renderización del DOM, lo que ocasiona que los elementos permanezcan ocultos ("hidden").
* **Solución:** Se implementaron estrategias de sincronización explícitas y pausas estratégicas (`networkidle` y esperas de renderizado) para alinear la velocidad del robot con las animaciones de la página, logrando un 100% de éxito en la ejecución dentro de contenedores aislados.

### 3. Hallazgos en el Backend (API Demoblaze)
Se desarrollaron 4 escenarios para validar los endpoints `/signup` y `/login`.
* **Hallazgo:** Se detectó una vulnerabilidad de diseño (mala práctica) en las respuestas de la API de Demoblaze. Cuando se envía un flujo alterno o erróneo (ej: "Intentar crear un usuario ya existente" o "Password incorrecto"), la API responde sistemáticamente con un **Status Code 200 (OK)**, en lugar de utilizar los códigos estándar HTTP correspondientes (ej: `400 Bad Request` o `401 Unauthorized`).
* **Solución:** Las aserciones (validaciones) se diseñaron para no depender exclusivamente del Status Code. Se capturó y parseó el *Response Body* para garantizar que el objeto JSON contenga el `errorMessage` exacto en los flujos negativos, y el `Auth_token` en los flujos positivos. Además, se utilizó `this.attach` para incrustar los *Request* y *Response Payloads* directamente en el reporte de Allure, garantizando una trazabilidad absoluta.