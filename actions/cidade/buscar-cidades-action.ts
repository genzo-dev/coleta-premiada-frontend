"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { Cidade } from "@/types/entities/cidade";

type BuscarCidadesResult =
  | { success: true; cidades: Cidade[] }
  | { success: false; error: string };

export async function buscarCidadesAction(): Promise<BuscarCidadesResult> {
  const response = await apiAuthenticatedRequest<Cidade[]>(
    "/api/accounts/cidades",
  );

  if (!response.success) {
    return {
      success: false,
      error: "Não foi possível carregar a lista de cidades.",
    };
  }

  return { success: true, cidades: response.data };
}
