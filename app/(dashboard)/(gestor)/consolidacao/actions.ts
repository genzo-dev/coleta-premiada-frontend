"use server";

import { revalidatePath } from "next/cache";
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { Ciclo } from "@/types/entities/ciclo";

export type RunConsolidationState = {
  success?: boolean;
  errors?: string[];
  totalImoveis?: number;
  totalPontos?: number;
};

export async function executarConsolidacaoAction(
  prevState: RunConsolidationState,
  formData: FormData
): Promise<RunConsolidationState> {
  const programaId = formData.get("programaId");
  const cicloId = formData.get("cicloId");

  if (!programaId || !cicloId) {
    return {
      success: false,
      errors: ["Programa e ciclo são obrigatórios."],
    };
  }

  const res = await apiAuthenticatedRequest<{
    total_imoveis: number;
    total_pontos: number;
  }>("/api/program/consolidations/run", {
    method: "POST",
    data: {
      programa_id: Number(programaId),
      ciclo_id: Number(cicloId),
    },
  });

  if (!res.success) {
    return {
      success: false,
      errors: res.errors || ["Ocorreu um erro ao executar a consolidação."],
    };
  }

  revalidatePath("/consolidacao");

  return {
    success: true,
    totalImoveis: res.data?.total_imoveis || 0,
    totalPontos: res.data?.total_pontos || 0,
    errors: [],
  };
}

export async function criarCicloAction(
  prevState: { success?: boolean; errors?: string[] },
  formData: FormData
) {
  const programaId = formData.get("programaId");
  const nome = formData.get("nome");
  const tipo = formData.get("tipo") || "mensal";
  const data_inicio = formData.get("dataInicio");
  const data_fim = formData.get("dataFim");

  if (!programaId || !nome || !data_inicio || !data_fim) {
    return { success: false, errors: ["Preencha todos os campos obrigatórios."] };
  }

  const res = await apiAuthenticatedRequest(
    "/api/program/cycles",
    {
      method: "POST",
      data: {
        programa: Number(programaId),
        nome: nome.toString(),
        tipo: tipo.toString(),
        data_inicio: data_inicio.toString(),
        data_fim: data_fim.toString(),
        status: "aberto"
      },
    }
  );

  if (!res.success) {
    return { success: false, errors: res.errors || ["Erro ao criar ciclo."] };
  }

  return { success: true, errors: [] };
}

export async function getProgramCyclesAction(programaId: number | string): Promise<Ciclo[]> {
  const res = await apiAuthenticatedRequest<Ciclo[] | { results: Ciclo[] }>(
    `/api/program/cycles?programa_id=${programaId}&status=aberto`,
    {
      method: "GET",
    }
  );

  if (!res.success || !res.data) return [];
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.results)) return res.data.results;
  return [];
}
