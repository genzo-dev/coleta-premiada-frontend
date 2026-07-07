import { apiAuthenticatedRequest } from "../api-authenticated-request";
import { Contestacao } from "@/types/entities/contestacao";
import { PaginatedResponse } from "@/types/api/paginated-response";

export type GetDisputesParams = {
  status?: string;
  page?: string;
};

export async function getDisputes(
  params: GetDisputesParams = {},
): Promise<PaginatedResponse<Contestacao> | null> {
  const query = new URLSearchParams();
  if (params.status) query.set("status", params.status);
  if (params.page) query.set("page", params.page);

  const queryString = query.toString();
  const res = await apiAuthenticatedRequest<PaginatedResponse<Contestacao>>(
    `/api/collection/disputes${queryString ? `?${queryString}` : ""}`,
    { method: "GET" },
  );

  if (!res.success) return null;
  return res.data;
}

export async function getDisputeById(id: number): Promise<Contestacao | null> {
  const res = await apiAuthenticatedRequest<Contestacao>(
    `/api/collection/disputes/${id}`,
    { method: "GET" },
  );

  if (!res.success) return null;
  return res.data;
}
