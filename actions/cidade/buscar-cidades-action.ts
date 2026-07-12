"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";

// TODO: Remover type Cidade hardcoded
export type Cidade = {
  id: number;
  nome: string;
  uf: string;
  ativo: boolean;
};

type PaginatedResponse<T> = {
  count: number;
  results: T[];
};

// Busca todas as cidades ativas do catálogo no Core
export async function buscarCidadesAction() {
  const response = await apiAuthenticatedRequest<
    PaginatedResponse<Cidade> | Cidade[]
  >("/api/accounts/cidades");

  if (!response.success) {
    return { success: false, data: [] };
  }

  const rawData = response.data;
  let list: Cidade[] = [];
  if (rawData && typeof rawData === "object") {
    if ("results" in rawData && Array.isArray(rawData.results)) {
      list = rawData.results;
    } else if (Array.isArray(rawData)) {
      list = rawData;
    }
  }

  // Retorna apenas as cidades que estão ativas
  const activeCities = list.filter((c) => c.ativo !== false);

  return { success: true, data: activeCities };
}
