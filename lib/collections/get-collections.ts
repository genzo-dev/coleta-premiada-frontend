import { apiAuthenticatedRequest } from "../api-authenticated-request";
import { RegistroColeta } from "@/types/entities/registro-coleta";
import { PaginatedResponse } from "@/types/api/paginated-response";

export type GetCollectionsParams = {
  imovel_id?: string;
  programa_id?: string;
  data_inicio?: string;
  data_fim?: string;
  page?: string;
};

export async function getCollections(
  params: GetCollectionsParams = {},
): Promise<PaginatedResponse<RegistroColeta> | null> {
  const query = new URLSearchParams();
  if (params.imovel_id) query.set("imovel_id", params.imovel_id);
  if (params.programa_id) query.set("programa_id", params.programa_id);
  if (params.data_inicio) query.set("data_inicio", params.data_inicio);
  if (params.data_fim) query.set("data_fim", params.data_fim);
  if (params.page) query.set("page", params.page);

  const queryString = query.toString();
  const res = await apiAuthenticatedRequest<PaginatedResponse<RegistroColeta>>(
    `/api/collection/collections${queryString ? `?${queryString}` : ""}`,
    { method: "GET" },
  );

  if (!res.success) return null;
  return res.data;
}
