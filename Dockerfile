# Сборка приложения
ARG NODE_VERSION
FROM node:22.8.0 AS builder

WORKDIR /dist
COPY . .
RUN yarn install
RUN yarn build

# Запуск Nginx
FROM nginx:stable-alpine

RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    chmod -R 777 /var/cache/nginx /var/run /var/log/nginx && \
    chown -R nginx:nginx /usr/share/nginx/html

USER nginx:root

COPY --from=builder /dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
