import { apiAuthenticatedRequest } from "../api-authenticated-request";
import { SaldoPontos } from "@/types/entities/saldo-pontos";
import { PaginatedResponse } from "@/types/api/paginated-response";

export type GetBenefitsParams = {
  imovel_id?: string;
  programa_id?: string;
  ciclo?: string;
  page?: string;
};

export async function getBenefits(
  params: GetBenefitsParams = {},
): Promise<PaginatedResponse<SaldoPontos> | null> {
  const query = new URLSearchParams();
  if (params.imovel_id) query.set("imovel_id", params.imovel_id);
  if (params.programa_id) query.set("programa_id", params.programa_id);
  if (params.ciclo) query.set("ciclo", params.ciclo);
  if (params.page) query.set("page", params.page);

  const queryString = query.toString();
  const res = await apiAuthenticatedRequest<PaginatedResponse<SaldoPontos>>(
    `/api/program/benefits${queryString ? `?${queryString}` : ""}`,
    { method: "GET" },
  );

  if (!res.success) return null;
  return res.data;
}
