# Usamos la imagen oficial exacta que coincide con tu package.json
FROM mcr.microsoft.com/playwright:v1.59.1-jammy

WORKDIR /app

# Copiamos los archivos de dependencias
COPY package.json package-lock.json* ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el código fuente al contenedor
COPY . .

# El contenedor SOLO ejecutará las pruebas en modo headless
CMD ["npm", "run", "test:all"]