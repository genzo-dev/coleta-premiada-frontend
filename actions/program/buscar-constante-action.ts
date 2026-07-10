"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { ConstantePontuacao } from "@/types/entities/constante-pontuacao";

export async function buscarConstanteAction() {
  const response = await apiAuthenticatedRequest<ConstantePontuacao>(
    "/api/program/scoring-constant",
  );

  if (!response.success) {
    return {
      success: false,
      error: response.errors?.[0] || "Erro ao carregar constante de pontuação.",
    };
  }

  return { success: true, data: response.data };
}
