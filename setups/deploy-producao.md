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
