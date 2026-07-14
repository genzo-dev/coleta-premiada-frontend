"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { ListaColetasMoradorResponse } from "@/types/entities/coleta-microservico";

type BuscarColetasParams = {
  page?: number;
  limit?: number;
  data_inicio?: string;
  data_fim?: string;
};

type BuscarColetasResult =
  | { success: true; data: ListaColetasMoradorResponse }
  | { success: false; error: string };

interface RawColetaItem {
  id: number;
  id_microservico?: string;
  imovel: number;
  registrado_por?: number;
  data_hora_coleta: string;
  peso_kg: string;
  foto_url?: string | null;
  pontuacao?: string;
  programa_nome?: string | null;
}

interface RawColetaResponse {
  count: number;
  results: RawColetaItem[];
}

export async function buscarColetasAction(
  params: BuscarColetasParams = {},
): Promise<BuscarColetasResult> {
  const searchParams = new URLSearchParams();

  const page = params.page ?? 1;
  const limit = params.limit ?? 20;

  searchParams.set("page", String(page));
  searchParams.set("limit", String(limit));

  if (params.data_inicio) searchParams.set("data_inicio", params.data_inicio);
  if (params.data_fim) searchParams.set("data_fim", params.data_fim);

  const response = await apiAuthenticatedRequest<RawColetaResponse>(
    `/api/collection/collections?${searchParams.toString()}`,
  );

  if (!response.success) {
    return {
      success: false,
      error: "Não foi possível carregar o histórico de coletas.",
    };
  }

  const results = response.data.results || [];
  const count = response.data.count || 0;

  return { 
    success: true, 
    data: {
      total: count,
      page: page,
      total_pages: Math.ceil(count / limit),
      coletas: results.map((item: RawColetaItem) => ({
        id: String(item.id),
        codigo: item.id_microservico || String(item.id),
        imovel_id: String(item.imovel),
        coletor_id: String(item.registrado_por || ""),
        status: "sincronizado",
        data_hora: item.data_hora_coleta,
        peso_total_kg: String(item.peso_kg || "0"),
        foto_url: item.foto_url || null,
        offline_id: null,
        sincronizado: true,
        pontuacao: item.pontuacao ? String(item.pontuacao) : null,
        programa: item.programa_nome || null
      }))
    } 
  };
}
