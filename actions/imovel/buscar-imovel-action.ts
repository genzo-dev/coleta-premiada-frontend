"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { Imovel } from "@/types/entities/imovel";

type PaginatedImoveis = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Imovel[];
};

type BuscarImovelResult =
  | { success: true; imoveis: Imovel[] }
  | { success: false; error: string };

export async function buscarImovelAction(): Promise<BuscarImovelResult> {
  const response = await apiAuthenticatedRequest<PaginatedImoveis>(
    "/api/program/properties",
  );

  if (!response.success) {
    return { success: false, error: "Não foi possível carregar os dados do imóvel." };
  }

  return { success: true, imoveis: response.data.results };
}
