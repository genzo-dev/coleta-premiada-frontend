# ──────────────────────────────
#           BASE
# ──────────────────────────────
FROM node:24-alpine AS base

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci


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

ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID

COPY . .
RUN npm run build


# ──────────────────────────────
#         PRODUCTION
# ──────────────────────────────
FROM node:24-alpine AS production

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
