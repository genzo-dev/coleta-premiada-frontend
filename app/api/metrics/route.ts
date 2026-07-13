/**
 * GET /metrics — Endpoint de métricas Prometheus para o frontend Next.js.
 *
 * Expõe métricas padrão (CPU, memória, GC, event loop) e métricas customizadas
 * (contagem de requisições, duração, erros, page views).
 *
 * Coletado pelo Prometheus central via job 'django-frontend'.
 */
import { NextResponse } from "next/server";
import { getRegistry } from "@/lib/metrics";

export async function GET(): Promise<NextResponse> {
  try {
    const registry = getRegistry();
    const metrics = await registry.metrics();
    return new NextResponse(metrics, {
      status: 200,
      headers: {
        "Content-Type": registry.contentType,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[metrics] Erro ao coletar métricas:", error);
    return NextResponse.json(
      { error: "Falha ao coletar métricas" },
      { status: 500 },
    );
  }
}
