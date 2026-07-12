"use server";

import { revalidatePath } from "next/cache";
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { Contestacao } from "@/types/entities/contestacao";

type BuscarContestacoesParams = {
  page?: number;
  limit?: number;
};

export type ListaContestacoesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Contestacao[];
};

export async function buscarContestacoesMoradorAction(
  params: BuscarContestacoesParams = {},
) {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 20));

  const response = await apiAuthenticatedRequest<ListaContestacoesResponse>(
    `/api/collection/disputes?${searchParams.toString()}`,
  );

  if (!response.success) {
    return {
      success: false,
      error: response.errors?.[0] || "Erro ao carregar contestações.",
    };
  }

  return { success: true, data: response.data };
}

export async function abrirContestacaoAction(coletaId: number | string, motivo: string) {
  if (!motivo || motivo.length < 20) {
    return {
      success: false,
      error: "O motivo deve conter pelo menos 20 caracteres.",
    };
  }

  const response = await apiAuthenticatedRequest<Contestacao>(
    "/api/collection/disputes",
    {
      method: "POST",
      data: {
        coleta: Number(coletaId),
        motivo,
      },
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.success) {
    return {
      success: false,
      error: response.errors?.[0] || "Erro ao abrir contestação.",
    };
  }

  revalidatePath("/(dashboard)/coletas");

  return { success: true, data: response.data };
}
