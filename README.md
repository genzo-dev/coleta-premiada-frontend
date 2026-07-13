# coleta-premiada-frontend — Portal Web

## Proposito do Sistema

O **Portal Web** e a interface grafica do ecossistema **Coleta Premiada** para navegadores desktop e mobile. Ele atende **dois perfis** de usuario simultaneamente:

- **Moradores (cidadaos)** — acompanham seus pontos acumulados, metas de reciclagem, historico de coletas, descontos no IPTU e abrem contestacoes.
- **Gestores / Supervisores** — acessam dashboards com graficos de engajamento, rankings de bairros, relatorios de desempenho dos coletores e metricas do programa.

O portal consome as APIs REST do **Core** (Django, porta `8001`) via HTTP e implementa autenticacao JWT com refresh token rotativo — o token de acesso e armazenado em cookie httpOnly e o refresh e gerenciado automaticamente pelo middleware do Next.js. O login social via **Google OAuth2** tambem e suportado.

### Arquitetura da Aplicacao

```
Browser (localhost:3001)
        │
        ▼
┌───────────────────────────────────────────┐
│  Next.js 16 (App Router)                  │
│                                           │
│  middleware.ts  ◄── validacao JWT/cookies │
│  proxy.ts       ◄── roteamento API        │
│  instrumentation.ts ◄── metricas (prom)   │
│                                           │
│  app/           ◄── paginas (SSR/CSR)     │
│  components/    ◄── UI (shadcn/ui)        │
│  actions/       ◄── server actions        │
│  lib/           ◄── api client, utils     │
│  schemas/       ◄── validacao Zod         │
└───────────┬───────────────────────────────┘
            │ HTTP (rede Docker coleta-shared)
            ▼
    ┌───────────────┐
    │  Core (Django) │  porta 8001
    └───────────────┘
```

---

## Tecnologias

### Stack Principal

| Camada | Tecnologia | Versao |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.2 |
| **Biblioteca UI** | React | 19.2 |
| **Linguagem** | TypeScript | 5.x |
| **Estilizacao** | Tailwind CSS | 4.x |
| **Componentes** | shadcn/ui + Radix UI | 1.5 |
| **Graficos** | Recharts | 3.9 |
| **Validacao** | Zod | 4.4 |
| **Formularios** | React Hook Form | 7.77 |
| **HTTP Client** | Axios | 1.17 |
| **Metricas** | prom-client | 15.1 |
| **Infraestrutura** | Docker (multi-stage) + Docker Compose | — |

### Bibliotecas e Suas Funcoes

| Biblioteca | Funcao |
|---|---|
| `next` (16.2) | Framework React com SSR/SSG/ISR. Configurado com `output: "standalone"` para producao Docker otimizada e `instrumentationHook: true` para metricas |
| `react` + `react-dom` (19.2) | UI declarativa com Server Components, Suspense e Concurrent Features |
| `tailwindcss` (v4) + `tw-animate-css` | Estilizacao utilitaria com animacoes CSS integradas |
| `shadcn` + `radix-ui` | Componentes acessiveis (Dialog, Dropdown, Select, Tabs, etc.) |
| `recharts` | Graficos interativos (barras, linhas, pizza) para dashboards de engajamento |
| `react-hook-form` + `zod` | Formularios com validacao de schema — usado em login, cadastro, contestacoes |
| `axios` | Cliente HTTP com interceptors para refresh automatico de JWT |
| `prom-client` | Registro e exportacao de metricas Prometheus via `/metrics` no `instrumentation.ts` |
| `date-fns` | Formatacao e manipulacao de datas (historico, filtros, relatorios) |
| `lucide-react` | Icones SVG consistentes com o design system |
| `sonner` | Sistema de notificacoes toast (feedback de acoes) |
| `clsx` + `tailwind-merge` | Utilitarios para composicao condicional de classes CSS |

### Estrutura do Projeto

```
coleta-premiada-frontend/
├── app/              # App Router — layouts, paginas, rotas (SSR/CSR/SSG)
├── components/       # Componentes reutilizaveis (shadcn/ui + customizados)
├── actions/          # React Server Actions (mutacoes server-side)
├── lib/              # Cliente API, axios config, utilitarios, hooks
├── schemas/          # Schemas Zod para validacao de formularios e API
├── utils/            # Funcoes auxiliares (formatacao, parse, etc.)
├── types/            # Tipos TypeScript globais
├── middleware.ts     # Middleware Next.js — validacao JWT, refresh de token, redirecionamento
├── proxy.ts          # Proxy reverso para roteamento de APIs no dev
├── instrumentation.ts # Registro de metricas Prometheus (prom-client)
├── next.config.ts    # Configuracao standalone + instrumentation hook
├── Dockerfile        # Multi-stage: base → development / builder → production
└── docker-compose.yml # Servico frontend conectado a coleta-shared e coleta-observability
```

### Docker Multi-Stage

O `Dockerfile` usa 4 estagios:

1. **`base`** — `node:24-alpine`, instala dependencias com `npm ci`
2. **`development`** — `npm run dev` com hot reload e volumes montados
3. **`builder`** — `npm run build` gera o bundle standalone
4. **`production`** — apenas os artefatos necessarios (`standalone/` + `static/`), sem node_modules de dev

---

## Instalacao

### Pre-requisitos

- [Node.js](https://nodejs.org/) 24+ (ou Docker)
- [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/) (recomendado)

### Passo a Passo (Docker — recomendado)

**1. Clone o repositorio:**

```bash
git clone https://github.com/genzo-dev/coleta-premiada-frontend.git
cd coleta-premiada-frontend
```

**2. Configure as variaveis de ambiente:**

```bash
cp .env.example .env
```

Edite o `.env` e ajuste:
- `CORE_API_URL` — URL interna da API do Core (padrao: `http://core:8000` via rede Docker)
- `COLLECTION_API_URL` — URL do MS de Coleta (padrao: `http://coleta-ms-app:8001`)
- `NEXT_PUBLIC_APP_URL` — URL publica do frontend (padrao: `http://localhost:3001`)
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` — Client ID do Google OAuth2 (se aplicavel)
- `JWT_ACCESS_COOKIE_TTL` / `JWT_REFRESH_COOKIE_TTL` — tempos de vida dos cookies JWT

**3. Certifique-se de que o Core esta rodando:**

```bash
cd ../Coleta-Premiada && docker compose up -d && cd ../coleta-premiada-frontend
```

**4. Suba o frontend:**

```bash
docker compose up -d
```

**5. Acesse:**

- **Portal Web:** `http://localhost:3001`

### Passo a Passo (Local, sem Docker)

```bash
npm install
cp .env.example .env.local   # ajuste CORE_API_URL para http://localhost:8001

npm run dev                   # inicia em http://localhost:3001
```

### Comandos Uteis

```bash
npm run dev         # Dev server com hot reload (porta 3001)
npm run build       # Build de producao (standalone)
npm run start       # Inicia build de producao
npm run lint        # ESLint
```

---

## Detalhes de Implementacao

### Autenticacao e Sessoes

O portal **nao usa `localStorage`** para tokens. Em vez disso:

- O token JWT de acesso e armazenado em **cookie httpOnly** (`coleta_access_token`), gerenciado pelo servidor Next.js.
- O refresh token tambem fica em cookie httpOnly (`coleta_refresh_token`).
- O `middleware.ts` intercepta todas as requisicoes: se o access token expirou, usa o refresh token para renova-lo automaticamente, sem que o usuario perceba.
- Para chamadas API no client-side, o `proxy.ts` reescreve `/api/core/*` → `CORE_API_URL/*` e `/api/collection/*` → `COLLECTION_API_URL/*`.

### Metricas Prometheus

O `instrumentation.ts` registra um `prom-client` com metricas padrao de HTTP (duracao, status code, taxa de requisicoes) e as expoe em `/metrics`. O Prometheus do stack `coleta-observability` coleta automaticamente.

### Design System

A interface usa componentes do **shadcn/ui** sobre **Radix UI**, garantindo acessibilidade (WAI-ARIA), navegacao por teclado e compatibilidade com leitores de tela. O tema e customizavel via variaveis CSS do Tailwind v4.
