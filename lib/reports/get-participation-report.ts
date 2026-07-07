import { apiAuthenticatedRequest } from "../api-authenticated-request";
import { PaginatedResponse } from "@/types/api/paginated-response";

export type ParticipationItem = {
  imovel__inscricao: string;
  imovel__titular__nome: string;
  coletas: number;
  pontos: string | number;
};

export async function getParticipationReport(
  programaId?: string,
  page?: string,
): Promise<PaginatedResponse<ParticipationItem> | null> {
  const query = new URLSearchParams();
  if (programaId) query.set("programa_id", programaId);
  if (page) query.set("page", page);

  const queryString = query.toString();
  const res = await apiAuthenticatedRequest<PaginatedResponse<ParticipationItem>>(
    `/api/program/reports/participation${queryString ? `?${queryString}` : ""}`,
    { method: "GET" },
  );

  if (!res.success) return null;
  return res.data;
}
