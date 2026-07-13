import { apiAuthenticatedRequest } from "../api-authenticated-request";
import { PaginatedResponse } from "@/types/api/paginated-response";

export type RankingItem = {
  imovel__inscricao: string;
  imovel__titular__nome: string;
  pontos: string | number;
};

export async function getRankingReport(
  programaId?: string,
  page?: string,
): Promise<PaginatedResponse<RankingItem> | null> {
  const query = new URLSearchParams();
  if (programaId) query.set("programa_id", programaId);
  if (page) query.set("page", page);

  const queryString = query.toString();
  const res = await apiAuthenticatedRequest<PaginatedResponse<RankingItem>>(
    `/api/program/reports/ranking${queryString ? `?${queryString}` : ""}`,
    { method: "GET" },
  );

  if (!res.success) return null;
  return res.data;
}
