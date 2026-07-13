/**
 * Instrumentation hook do Next.js — registra métricas HTTP no Node.js runtime.
 *
 * Este arquivo é carregado automaticamente pelo Next.js durante o startup
 * (requer experimental.instrumentationHook = true no next.config.ts).
 *
 * Como o middleware roda em Edge Runtime (sem acesso ao prom-client),
 * usamos o instrumentation hook para interceptar as requisições no
 * runtime Node.js através de monkey-patching do http.Server.
 *
 * Referência: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await setupHttpMetrics();
  }
}

async function setupHttpMetrics() {
  try {
    const http = await import("http");
    const { httpRequestsTotal, httpRequestDurationMs, pageViewsTotal } =
      await import("@/lib/metrics");

    const originalEmit = http.Server.prototype.emit;

    http.Server.prototype.emit = function (
      event: string,
      ...args: unknown[]
    ): boolean {
      if (event === "request") {
        const req = args[0] as import("http").IncomingMessage;
        const res = args[1] as import("http").ServerResponse;

        const start = Date.now();
        const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
        const route = normalizeRoute(url.pathname);

        // Incrementa page view
        if (!url.pathname.startsWith("/_next") && !url.pathname.startsWith("/api")) {
          pageViewsTotal.inc({ route });
        }

        // Hook no fim da resposta
        const end = res.end.bind(res);
        res.end = function (...cbArgs: unknown[]) {
          const durationMs = Date.now() - start;
          const status = res.statusCode.toString();

          httpRequestsTotal.inc({
            method: req.method || "GET",
            route,
            status,
          });

          httpRequestDurationMs.observe(
            { method: req.method || "GET", route, status },
            durationMs,
          );

          return end(...(cbArgs as Parameters<typeof end>));
        } as typeof res.end;
      }

      return Reflect.apply(originalEmit, this, [event, ...args]);
    };

    console.log("[metrics] HTTP metrics instrumentation ativo.");
  } catch (err) {
    console.warn("[metrics] Falha ao configurar instrumentation:", err);
  }
}

/**
 * Normaliza rotas dinâmicas para agregação.
 * Ex: /programas/abc123 → /programas/:id
 */
function normalizeRoute(pathname: string): string {
  return pathname
    .split("/")
    .map((seg) =>
      /^[0-9a-f]{24}$/.test(seg) ||
      /^[0-9a-f]{8}-[0-9a-f]{4}-/.test(seg) ||
      /^\d+$/.test(seg)
        ? ":id"
        : seg,
    )
    .join("/") || "/";
}
