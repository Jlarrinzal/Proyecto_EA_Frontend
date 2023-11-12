FROM node:20-alpine as node
WORKDIR /app
COPY ./ /app/

# Instala y construye el Angular App
RUN npm ci
RUN npm run build --prod
RUN mv /app/dist/${APP}/* /app/dist/

# Angular app construida, la vamos a hostear un server production, este es Nginx

FROM nginx:latest

COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf