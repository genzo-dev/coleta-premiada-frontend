import { apiAuthenticatedRequest } from "../api-authenticated-request";
import type { RelatorioLLM } from "@/types/entities/relatorios";
import type { PaginatedResponse } from "@/types/api/paginated-response";

type CreateReportPayload = {
  tipo: string;
  periodo: { inicio: string; fim: string };
  programa_id?: number;
  direcionamento?: string;
};

export async function createReport(
  payload: CreateReportPayload
): Promise<RelatorioLLM | null> {
  const res = await apiAuthenticatedRequest<RelatorioLLM>(
    "/api/reports/generate",
    {
      method: "POST",
      data: payload,
    }
  );

  if (!res.success) return null;
  return res.data;
}

export async function getReportHistory(
  params?: {
    tipo?: string;
    programa_id?: string;
    page?: string;
  }
): Promise<PaginatedResponse<RelatorioLLM> | null> {
  const query = new URLSearchParams();
  if (params?.tipo) query.set("tipo", params.tipo);
  if (params?.programa_id) query.set("programa_id", params.programa_id);
  if (params?.page) query.set("page", params.page);

  const qs = query.toString();
  const res = await apiAuthenticatedRequest<PaginatedResponse<RelatorioLLM>>(
    `/api/reports/history${qs ? `?${qs}` : ""}`,
    { method: "GET" }
  );

  if (!res.success) return null;
  return res.data;
}

export async function getReportDetail(
  id: number
): Promise<RelatorioLLM | null> {
  const res = await apiAuthenticatedRequest<RelatorioLLM>(
    `/api/reports/${id}`,
    { method: "GET" }
  );

  if (!res.success) return null;
  return res.data;
}
