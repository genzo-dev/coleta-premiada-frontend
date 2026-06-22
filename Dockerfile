# ──────────────────────────────
#           BASE
# ──────────────────────────────
FROM node:20-alpine AS base

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile


# ──────────────────────────────
#         DEVELOPMENT
# ──────────────────────────────
FROM base AS development

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]


# ──────────────────────────────
#          BUILDER
# ──────────────────────────────
FROM base AS builder

COPY . .
RUN npm run build


# ──────────────────────────────
#         PRODUCTION
# ──────────────────────────────
FROM node:20-alpine AS production

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
