# Etapa 1: build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./
COPY webpack.config.js ./
COPY .babelrc ./

# Copiar el código fuente
COPY ./src ./src

# Instalar dependencias y construir el proyecto
RUN npm ci
RUN npm run build

# Etapa 2: servidor web con nginx
FROM nginx:alpine

# Copiar el build al directorio público de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración de Nginx para manejar rutas del tipo SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf
