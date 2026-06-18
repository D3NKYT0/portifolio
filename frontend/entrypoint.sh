#!/bin/sh
set -eu

READY_FILE="/tmp/frontend-ready"
SOURCE_DIR="/opt/frontend-dist"
TARGET_DIR="/app/dist"

echo "[frontend] Syncing static assets..."
mkdir -p "$TARGET_DIR"
rm -f "$READY_FILE"
rm -rf "$TARGET_DIR"/* 2>/dev/null || true

cp -R "$SOURCE_DIR"/. "$TARGET_DIR"/
touch "$READY_FILE"
echo "[frontend] Build synced to $TARGET_DIR ($(ls -1 "$TARGET_DIR" | wc -l) items)."

# Mantém o container vivo para o healthcheck e para o volume compartilhado com o nginx
exec tail -f /dev/null
