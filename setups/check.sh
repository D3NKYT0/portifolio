#!/bin/sh
# Diagnóstico rápido no servidor — setups/check.sh

set -e

echo "=== Docker Compose ==="
docker compose ps

echo ""
echo "=== Health API ==="
curl -sf http://localhost/api/v1/system/health/ && echo "" || echo "FALHOU (502/503 = backend ou nginx)"

echo ""
echo "=== Portfolio API ==="
curl -sf http://localhost/api/v1/public/portfolio/ | head -c 120 && echo "..." || echo "FALHOU"

echo ""
echo "=== Backend logs (últimas 30 linhas) ==="
docker compose logs backend --tail 30

echo ""
echo "=== DB password (deve ser igual nos dois) ==="
grep DB_PASSWORD .env backend/.env 2>/dev/null || true
