"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";

export type MoradorUser = {
  id: number;
  email: string;
  nome: string;
  perfil: string;
};

type PaginatedResponse<T> = {
  count: number;
  results: T[];
};

// Função para buscar moradores
export async function buscarMoradoresAction() {
  const response = await apiAuthenticatedRequest<PaginatedResponse<MoradorUser> | MoradorUser[]>(
    "/api/accounts/users?perfil=morador"
  );

  if (!response.success) {
    return { success: false, data: [] };
  }

  const rawData = response.data;
  let list: MoradorUser[] = [];
  if (rawData && typeof rawData === "object") {
    if ("results" in rawData && Array.isArray(rawData.results)) {
      list = rawData.results;
    } else if (Array.isArray(rawData)) {
      list = rawData;
    }
  }

  return { success: true, data: list };
}
