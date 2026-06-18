#!/bin/sh
set -e

mkdir -p /app/dist
cp -r /opt/frontend-dist/. /app/dist/
echo ready > /app/dist/.ready
echo "[frontend] Static assets synced to volume."
