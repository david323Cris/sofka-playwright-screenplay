PRUEBA TÉCNICA - AUTOMATIZACIÓN QA E2E Y API
=============================================================================
Autor: Cristhian David Montaño Vargas
Fecha: Abril 2026
=============================================================================

1. DESCRIPCIÓN DEL PROYECTO
Este repositorio contiene la solución a la prueba técnica requerida, dividida en dos módulos principales:
- Ejercicio 1 (Frontend): Automatización E2E del flujo de compra en OpenCart (http://opencart.abstracta.us/).
- Ejercicio 2 (Backend): Automatización de API REST para flujos de Signup y Login en Demoblaze (https://api.demoblaze.com/).

2. ARQUITECTURA Y STACK TECNOLÓGICO
Se ha implementado una arquitectura basada en el patrón Screenplay para garantizar escalabilidad, mantenibilidad y separación de responsabilidades, utilizando una sola herramienta potente para UI y API:
- Lenguaje: TypeScript
- Framework E2E y API: Playwright
- BDD / Capa de Negocio: Cucumber
- Reportes: Allure Reports
- Orquestación: Docker & Docker Compose

3. REQUISITOS PREVIOS (PRERREQUISITOS)
Para ejecutar este proyecto en su máquina, asegúrese de tener instalado:
- Node.js (v18 o superior) y npm.
- Docker y Docker Compose (Solo si desea ejecutar de forma aislada en contenedores).
- Navegadores nativos de Playwright (se instalan en el paso de configuración).

4. INSTALACIÓN Y CONFIGURACIÓN
- Paso 1: Clonar este repositorio.
- Paso 2: Abrir una terminal en la raíz del proyecto.
- Paso 3: Ejecutar el siguiente comando para instalar las dependencias:
````
   npm install
````
- Paso 4: Instalar los navegadores de Playwright:
````
   npx playwright install
````

5. INSTRUCCIONES DE EJECUCIÓN (MODO LOCAL)
El proyecto cuenta con scripts configurados en el package.json para facilitar la ejecución y generación de reportes:

- Para ejecutar SOLO pruebas de Interfaz (Frontend):
````
   npm run run:ui
````

- Para ejecutar SOLO pruebas de API (Backend):
````
   npm run run:api
````

- Para ejecutar TODA la suite (Recomendado):
````
   npm run run:all
````

Nota: Estos comandos ejecutarán las pruebas, compilarán los datos crudos y abrirán automáticamente el dashboard interactivo de Allure en su navegador.

6. INSTRUCCIONES DE EJECUCIÓN (MODO DOCKER / CI-CD)
Para validar el comportamiento en un entorno aislado (Headless):
- Paso 1: Construir y levantar el contenedor:
````
   docker-compose up --build
````
- Paso 2: Esperar a que los tests finalicen y el contenedor se detenga.
- Paso 3: Generar y visualizar el reporte en su máquina local:
````
   npm run report:generate:all
   npm run report:open
````