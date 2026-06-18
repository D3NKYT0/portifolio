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

FROM alpine:3.21 AS sync
COPY --from=builder /app/dist /dist
CMD ["sh", "-c", "cp -r /dist/* /app/dist/ && echo ready > /app/dist/.ready"]
