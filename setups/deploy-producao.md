# Deploy em produção — denky.dev.br

## 1. Copiar arquivos de ambiente

No servidor, dentro da pasta do projeto:

```bash
cp .env.production .env
cp backend/.env.production backend/.env
```

## 2. Subir o stack

```bash
docker compose down
docker compose up --build -d
```

> Se aparecer `permission denied` no entrypoint, atualize o projeto (git pull) e rebuild.
> O entrypoint roda via `/bin/sh` — não depende mais de `chmod +x` no Windows.

## 3. Criar superusuário (admin)

```bash
docker compose exec backend python manage.py createsuperuser
```

Admin: https://denky.dev.br/admin/

## 4. DNS

| Registro | Destino |
|----------|---------|
| `denky.dev.br` | IP do servidor |
| `www.denky.dev.br` | IP do servidor (ou CNAME para denky.dev.br) |

## 5. HTTPS

O Docker expõe a porta **80**. Opções:

- **Cloudflare** (recomendado): proxy laranja ativo, SSL modo **Full**
- **Caddy/Nginx externo**: termina HTTPS e repassa para `localhost:80`

## 6. Firewall

Libere apenas: **80**, **443** (se terminar SSL no host) e **22** (SSH).

Não exponha PostgreSQL (5432) publicamente.

## 7. Troubleshooting — "GAME OVER"

1. Teste a API no servidor:

```bash
curl -s http://localhost/api/v1/system/health/
curl -s http://localhost/api/v1/public/portfolio/ | head -c 200
docker compose logs backend --tail 80
```

2. **Senha do banco divergente** (comum no 1º deploy):

`DB_PASSWORD` deve ser **igual** em `.env` e `backend/.env`.

Se o Postgres foi criado com senha antiga, recrie o volume:

```bash
docker compose down
docker volume rm denky_postgres_data
docker compose up -d
```

3. **Atualizar após correções**:

```bash
docker compose up --build -d
```
