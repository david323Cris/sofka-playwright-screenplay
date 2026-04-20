# 🚀 Prueba Técnica - Automatización QA E2E (UI) y API (Backend)

- **Framework:** Playwright (v1.x) con TypeScript (TS) + Cucumber
- **Arquitectura:** Screenplay Pattern
- **Reportes:** Allure Reports
- **Orquestación:** Docker & Docker Compose
- **Autor:** Cristhian David Montaño Vargas
- **Fecha:** Abril 2026

---

## 🛠️ Stack Tecnológico y Arquitectura

Se ha implementado una arquitectura robusta basada en el patrón de diseño **Screenplay**, garantizando la escalabilidad, mantenibilidad y una clara separación de responsabilidades para las pruebas de Frontend y Backend, utilizando una sola herramienta potente:

* **Lenguaje de Programación:** TypeScript (v1.x) para un tipado fuerte y autocompletado avanzado.
* **Framework de Automatización (UI & API):** Playwright, aprovechando su velocidad, aislamiento de contextos y capacidades de depuración nativas.
* **BDD / Capa de Negocio:** Cucumber, permitiendo una colaboración fluida con stakeholders técnicos y no técnicos mediante la redacción de escenarios en Gherkin.
* **Visualización de Resultados:** Allure Reports, para generar dashboards interactivos e informes detallados de cada ejecución.
* **Orquestación y Contenedores:** Docker & Docker Compose, facilitando entornos de ejecución aislados y consistentes.

---

## 🚀 Métodos de Ejecución

El proyecto está diseñado para ejecutarse de múltiples formas dependiendo del entorno del evaluador, con scripts preconfigurados en el `package.json`.

### Opción 1: Ejecución Local Nativa (Recomendada para Desarrollo) ⭐
Esta opción le permite ejecutar las pruebas con visibilidad completa (headed) y depurar interactivamente.

1.  Asegúrese de tener **Node.js v18+** instalado.
2.  Abra una terminal en la raíz del proyecto y ejecute:
    ```bash
    npm install
    ```
3.  Instale los navegadores nativos de Playwright (obligatorio para la primera ejecución local):
    ```bash
    npx playwright install
    ```
4.  Elija el script que desea ejecutar. Al finalizar, el reporte **Allure** se abrirá automáticamente:
    * Ejecutar **SOLO** pruebas de Interfaz (E2E OpenCart):
        ```bash
        npm run run:ui
        ```
    * Ejecutar **SOLO** pruebas de API (Backend Demoblaze):
        ```bash
        npm run run:api
        ```
    * Ejecutar **TODA** la suite de pruebas (UI & API):
        ```bash
        npm run run:all
        ```

### Opción 2: Ejecución Aislada con Docker (Ideal para CI-CD o Entornos Headless)
Esta opción garantiza que las pruebas corran en un entorno idéntico al de producción, sin configuraciones locales complejas.

1.  Asegúrese de tener **Docker Desktop** ejecutándose.
2.  Abra una terminal en la raíz del proyecto y ejecute:
    ```bash
    docker-compose up --build
    ```
3.  Espere a que las pruebas finalicen y el contenedor se detenga. Los resultados crudos se extraerán automáticamente a su máquina local mediante volúmenes de Docker.
4.  Para generar y visualizar el reporte detallado, ejecute:
    ```bash
    npm run report:open
    # O ejecute ambos comandos para asegurar la generación de datos crudos:
    # npm run report:generate:all && npm run report:open
    ```

---

## 📂 Estructura del Proyecto (Screenplay Pattern)

La estructura del repositorio sigue una organización clara por dominios (Backend y Frontend), implementando el patrón Screenplay para separar Actores, Tareas, Preguntas y Elementos de UI:

```text
📦 sofka-playwright-scre...  <- Directorio raíz
 ┣ 📂 backend                   <- Módulo de Pruebas de API (Backend)
 ┃ ┣ 📂 features                <- Escenarios Gherkin (.feature) para backend
 ┃ ┃ 📂 src                     <- Código fuente de automatización API
 ┃ ┃ ┣ 📂 questions             <- Validaciones de negocio (respuestas de API)
 ┃ ┃ ┗ 📂 tasks                 <- Tareas de Screenplay para API (ej. Login, Signup)
 ┃ ┃ 📂 step_definitions        <- Implementación técnica de los pasos Gherkin
 ┃ ┗ 📂 utils                   <- Funciones de utilidad y helpers comunes
 ┣ 📂 frontend                  <- Módulo de Pruebas E2E (Frontend/UI)
 ┃ ┣ 📂 features                <- Escenarios Gherkin (.feature) para frontend
 ┃ ┗ 📂 src                     <- Código fuente de automatización UI
 ┃ ┃ ┣ 📂 tasks                 <- Tareas de Screenplay para UI (ej. AgregarAlCarrito, CompletarCheckoutInvitado)
 ┃ ┃ ┣ 📂 ui                    <- Mapeo de elementos de UI (Locators)
 ┃ ┃ ┗ 📂 questions             <- Validaciones de negocio
 ┃ ┃ 📂 step_definitions        <- Implementación técnica de los pasos Gherkin
 ┃ ┗ 📂 utils                   <- Funciones de utilidad y helpers comunes
 ┣ 📜 .gitignore                <- Archivos a ignorar por git
 ┣ 📜 cucumber.js               <- Configuración de Cucumber
 ┣ 📜 Dockerfile                <- Receta para el contenedor de automatización
 ┣ 📜 docker-compose.yml        <- Orquestador de contenedores
 ┣ 📜 package.json              <- Dependencias y scripts de ejecución
 ┣ 📜 README.md                 <- Esta documentación
 ┗ 📜 tsconfig.json             <- Configuración de TypeScript
```
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