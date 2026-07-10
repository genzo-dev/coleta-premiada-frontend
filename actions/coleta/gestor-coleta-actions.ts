"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { RegistroColeta } from "@/types/entities/registro-coleta";
import type { Evidencia } from "@/types/entities/evidencia";

export type ListaColetasGestorResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: RegistroColeta[];
};

type BuscarColetasParams = {
  page?: number;
  limit?: number;
  imovel_id?: string;
  programa_id?: string;
  data_inicio?: string;
  data_fim?: string;
};

export async function buscarColetasGestorAction(
  params: BuscarColetasParams = {},
) {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page ?? 1));
  if (params.limit) searchParams.set("limit", String(params.limit));

  if (params.imovel_id) searchParams.set("imovel_id", params.imovel_id);
  if (params.programa_id) searchParams.set("programa_id", params.programa_id);
  if (params.data_inicio) searchParams.set("data_inicio", params.data_inicio);
  if (params.data_fim) searchParams.set("data_fim", params.data_fim);

  const response = await apiAuthenticatedRequest<ListaColetasGestorResponse>(
    `/api/collection/collections?${searchParams.toString()}`,
  );

  if (!response.success) {
    return {
      success: false,
      error: response.errors?.[0] || "Erro ao carregar coletas.",
    };
  }

  return { success: true, data: response.data };
}

export async function registrarColetaManualAction(formData: FormData) {
  const response = await apiAuthenticatedRequest<RegistroColeta>(
    "/api/collection/collections",
    {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (!response.success) {
    return {
      success: false,
      error: response.errors?.[0] || "Erro ao registrar coleta manual.",
    };
  }

  return { success: true, data: response.data };
}

export async function buscarEvidenciasAction(coletaId: number) {
  const response = await apiAuthenticatedRequest<Evidencia[]>(
    `/api/collection/collections/${coletaId}/evidences`,
  );

  if (!response.success) {
    return {
      success: false,
      error: response.errors?.[0] || "Erro ao carregar evidências.",
    };
  }

  return { success: true, data: response.data };
}

export async function anexarEvidenciaAction(coletaId: number, formData: FormData) {
  const response = await apiAuthenticatedRequest<Evidencia>(
    `/api/collection/collections/${coletaId}/evidences`,
    {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (!response.success) {
    return {
      success: false,
      error: response.errors?.[0] || "Erro ao anexar evidência.",
    };
  }

  return { success: true, data: response.data };
}
