"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { Evidencia } from "@/types/entities/evidencia";

type BuscarEvidenciasResult =
  | { success: true; evidencias: Evidencia[] }
  | { success: false; error: string };

export async function buscarEvidenciasAction(
  coletaId: number,
): Promise<BuscarEvidenciasResult> {
  const response = await apiAuthenticatedRequest<Evidencia[]>(
    `/api/collection/collections/${coletaId}/evidences`,
  );

  if (!response.success) {
    return {
      success: false,
      error: "Não foi possível carregar as evidências desta coleta.",
    };
  }

  return { success: true, evidencias: response.data };
}
