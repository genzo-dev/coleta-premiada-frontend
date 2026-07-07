import { apiAuthenticatedRequest } from "../api-authenticated-request";
import { Imovel } from "@/types/entities/imovel";
import { PaginatedResponse } from "@/types/api/paginated-response";

export type GetPropertiesParams = {
  bairro?: string;
  cidade?: string;
  ativo?: string;
  search?: string;
  page?: string;
};

export async function getProperties(
  params: GetPropertiesParams = {},
): Promise<PaginatedResponse<Imovel> | null> {
  const query = new URLSearchParams();
  if (params.bairro) query.set("bairro", params.bairro);
  if (params.cidade) query.set("cidade", params.cidade);
  if (params.ativo) query.set("ativo", params.ativo);
  if (params.search) query.set("search", params.search);
  if (params.page) query.set("page", params.page);

  const queryString = query.toString();
  const res = await apiAuthenticatedRequest<PaginatedResponse<Imovel>>(
    `/api/program/properties${queryString ? `?${queryString}` : ""}`,
    { method: "GET" },
  );

  if (!res.success) return null;
  return res.data;
}
