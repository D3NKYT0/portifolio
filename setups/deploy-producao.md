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

## 7. Troubleshooting — "GAME OVER" / 502

Rode o diagnóstico:

```bash
sh setups/check.sh
```

### 502 Bad Gateway na API

1. **Backend caído** — veja logs:

```bash
docker compose logs backend --tail 50
```

2. **Senha do Postgres divergente** — `DB_PASSWORD` igual em `.env` e `backend/.env`:

```bash
grep DB_PASSWORD .env backend/.env
docker compose down
docker volume rm denky_postgres_data
docker compose up -d
```

3. **Nginx sem resolver** — atualize `nginx/nginx.conf` (git pull) e reinicie:

```bash
docker compose restart nginx
```

### Aviso CSP Cloudflare Insights

Normal com Cloudflare Analytics. Já liberado em `security_headers.conf`.  
O aviso do Kaspersky é do antivírus no browser — pode ignorar ou desativar a extensão ao testar.

### Atualizar frontend (modo static)

```bash
docker compose --profile static up --build -d frontend nginx
```

Confirme no `.env`: `COMPOSE_PROFILES=static` e `FRONTEND_SERVE_MODE=static`.

## 8. Indexação nos buscadores

Após publicar, confirme:

```bash
curl -I https://denky.dev.br/
curl https://denky.dev.br/robots.txt
curl https://denky.dev.br/sitemap.xml
curl -I https://denky.dev.br/uma-rota-inexistente
curl -I https://www.denky.dev.br/
```

Resultados esperados: página inicial `200`, arquivos de rastreamento válidos, rota
inexistente `404` e domínio `www` redirecionando com `301`.

### Google Search Console

1. Adicione a propriedade de domínio `denky.dev.br` e faça a verificação por DNS.
2. Em **Sitemaps**, envie `https://denky.dev.br/sitemap.xml`.
3. Em **Inspeção de URL**, teste e solicite a indexação de `/` e `/curriculo/`.

### Bing Webmaster Tools

1. Adicione ou importe o site já verificado no Google Search Console.
2. Envie `https://denky.dev.br/sitemap.xml` em **Sitemaps**.
3. Use a inspeção de URL para solicitar rastreamento de `/` e `/curriculo/`.
