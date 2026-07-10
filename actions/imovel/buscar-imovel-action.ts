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

export async function buscarImovelAction(search?: string, limit: number = 20): Promise<BuscarImovelResult> {
  const searchParams = new URLSearchParams();
  searchParams.set("limit", String(limit));
  if (search) searchParams.set("search", search);

  const response = await apiAuthenticatedRequest<PaginatedImoveis>(
    `/api/program/properties?${searchParams.toString()}`,
  );

  if (!response.success) {
    return { success: false, error: "Não foi possível carregar os dados do imóvel." };
  }

  return { success: true, imoveis: response.data.results };
}
