"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { Imovel } from "@/types/entities/imovel";

export async function obterImovelDetalheAction(id: string | number) {
  // Faz uma requisição autenticada à API do Core para buscar a ficha completa do imóvel (dados de endereço e moradores)
  const response = await apiAuthenticatedRequest<Imovel>(
    `/api/program/properties/${id}`
  );

  if (!response.success) {
    return {
      success: false,
      error: response.errors?.[0] || "Não foi possível carregar os detalhes do imóvel.",
    };
  }

  return { success: true, data: response.data };
}
