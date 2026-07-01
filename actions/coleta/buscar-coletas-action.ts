"use server";

import { apiCollectionAuthenticatedRequest } from "@/lib/api-collection-authenticated-request";
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

export async function buscarColetasAction(
  params: BuscarColetasParams = {},
): Promise<BuscarColetasResult> {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 20));

  if (params.data_inicio) searchParams.set("data_inicio", params.data_inicio);
  if (params.data_fim) searchParams.set("data_fim", params.data_fim);

  const response = await apiCollectionAuthenticatedRequest<ListaColetasMoradorResponse>(
    `/api/coletas/morador?${searchParams.toString()}`,
  );

  if (!response.success) {
    return {
      success: false,
      error: "Não foi possível carregar o histórico de coletas.",
    };
  }

  return { success: true, data: response.data };
}
