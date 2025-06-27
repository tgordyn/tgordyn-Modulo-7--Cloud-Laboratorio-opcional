# Etapa 1: Build con imagen más liviana
FROM node:18.20-alpine

WORKDIR /app
COPY . .

# Instalación sin cache y limpia
RUN npm ci
RUN npm run build

# Etapa 2: Servir con nginx también basado en Alpine
FROM nginx:alpine

# Copiar el build generado
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración de nginx para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf
