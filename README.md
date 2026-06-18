# Denky Portfolio

Portfólio interativo estilo retro game (Mario-inspired) de Daniel José do Amaral Filho.

## Stack

- **Frontend:** React 19 + Vite + TypeScript
- **Backend:** Django 5 + DRF
- **Infra:** Docker + Nginx + PostgreSQL

## Estrutura

```
DENKY/
├── backend/          # Django API (/api/v1/public/*, /api/v1/system/*)
├── frontend/         # React SPA
├── nginx/            # Reverse proxy unificado
└── docker-compose.yml
```

## Desenvolvimento

1. Copie os arquivos de ambiente:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

2. Suba o stack:

```bash
docker compose up --build
```

3. Acesse: http://localhost

## API

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/v1/public/portfolio/` | GET | Dados do portfólio |
| `/api/v1/public/contact/` | POST | Formulário de contato |
| `/api/v1/system/health/` | GET | Health check |

## Controles do jogo

- **← →** ou **A/D** — navegar entre seções
- **ESPAÇO** ou **↑** — pular
- **1-5** — atalhos diretos para seções
- **M** — ligar/desligar sons 8-bit

## Sons

Efeitos 8-bit gerados via Web Audio API (sem arquivos externos). A preferência de mudo fica salva no navegador.

| Som | Quando toca |
|-----|-------------|
| Start | Press Start |
| Warp + Coin | Trocar de seção |
| Jump | Pular |
| Block | Entrar em Skills |
| Coin | Abrir projeto |
| Powerup | Contato enviado |
| Error | Erro no contato |
| Bump | Bater na borda do mapa |

## Produção (denky.dev.br)

### DNS
Aponte `denky.dev.br` e `www.denky.dev.br` para o IP do servidor (ou Cloudflare proxy).

### `.env` raiz
```
COMPOSE_PROFILES=static
FRONTEND_SERVE_MODE=static
VITE_API_URL=/api/v1
VITE_FRONTEND_URL=https://denky.dev.br
```

### `backend/.env`
```
DEBUG=False
SECRET_KEY=<chave-longa-e-aleatoria>
ALLOWED_HOSTS=denky.dev.br,www.denky.dev.br,backend
DB_PASSWORD=<senha-forte>
CORS_ALLOWED_ORIGINS=https://denky.dev.br,https://www.denky.dev.br
CSRF_TRUSTED_ORIGINS=https://denky.dev.br,https://www.denky.dev.br
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

### HTTPS
O Nginx do projeto escuta na porta **80**. Em produção, use **Cloudflare** (SSL Full) ou um Nginx/Caddy na frente terminando HTTPS e repassando para `:80`.

Depois:

```bash
docker compose up --build -d
```

Site: https://denky.dev.br
