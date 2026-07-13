/**
 * Métricas Prometheus para o frontend Next.js (Coleta Premiada).
 *
 * Expõe contadores e histogramas no endpoint /metrics, coletados
 * pelo Prometheus central (coleta-observability).
 *
 * Dependência: prom-client
 *   npm install prom-client
 */

import { collectDefaultMetrics, Counter, Histogram, Registry } from "prom-client";

// Singleton: um único registro Prometheus por processo Node.js
const globalRegistry = globalThis as unknown as { __prometheus?: Registry };

function getRegistry(): Registry {
  if (!globalRegistry.__prometheus) {
    const registry = new Registry();
    collectDefaultMetrics({
      register: registry,
      prefix: "nextjs_",
      gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    });
    globalRegistry.__prometheus = registry;
  }
  return globalRegistry.__prometheus;
}

// ─── Métricas customizadas ────────────────────────────────────────────────────

// Contagem de requisições HTTP
export const httpRequestsTotal = new Counter({
  name: "nextjs_http_requests_total",
  help: "Total de requisições HTTP recebidas pelo frontend",
  labelNames: ["method", "route", "status"] as const,
  registers: [getRegistry()],
});

// Duração de requisições HTTP
export const httpRequestDurationMs = new Histogram({
  name: "nextjs_http_request_duration_ms",
  help: "Duração das requisições HTTP em milissegundos",
  labelNames: ["method", "route", "status"] as const,
  buckets: [50, 100, 200, 500, 1000, 2000, 5000, 10000],
  registers: [getRegistry()],
});

// Erros de renderização
export const renderErrorsTotal = new Counter({
  name: "nextjs_render_errors_total",
  help: "Total de erros de renderização",
  labelNames: ["route", "error_type"] as const,
  registers: [getRegistry()],
});

// Page views
export const pageViewsTotal = new Counter({
  name: "nextjs_page_views_total",
  help: "Total de page views por rota",
  labelNames: ["route"] as const,
  registers: [getRegistry()],
});

// ─── Funções auxiliares ───────────────────────────────────────────────────────

export { getRegistry };
