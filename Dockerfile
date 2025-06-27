# Etapa 1: build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY webpack.config.js ./
COPY ./src ./src

RUN npm ci
RUN npm run build --verbose

# Etapa 2: nginx
FROM nginx:alpine

# ✅ Esta línea requiere que hayas definido "AS builder" antes
COPY --from=builder /app/dist /usr/share/nginx/html

# Config para SPA: redirige todas las rutas a index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
