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

## Produção

No `.env` raiz:

```
COMPOSE_PROFILES=static
FRONTEND_SERVE_MODE=static
```

Depois:

```bash
docker compose up --build -d
```
