# syntax=docker/dockerfile:1.7
FROM node:22-bookworm-slim AS builder

WORKDIR /app

ARG BUILD_VITE_API_URL=/api/v1
ARG BUILD_VITE_FRONTEND_URL=https://denky.dev.br

ENV VITE_API_URL=$BUILD_VITE_API_URL
ENV VITE_FRONTEND_URL=$BUILD_VITE_FRONTEND_URL

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

FROM alpine:3.21

WORKDIR /app

COPY entrypoint.sh /usr/local/bin/frontend-sync.sh
RUN sed -i 's/\r$//' /usr/local/bin/frontend-sync.sh \
    && chmod +x /usr/local/bin/frontend-sync.sh

COPY --from=builder /app/dist /opt/frontend-dist

CMD ["sh", "/usr/local/bin/frontend-sync.sh"]
