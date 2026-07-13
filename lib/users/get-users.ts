import { apiAuthenticatedRequest } from "../api-authenticated-request";
import { User } from "@/schemas/user/user-schema";
import { PaginatedResponse } from "@/types/api/paginated-response";

export type GetUsersParams = {
  perfil?: string;
  ativo?: string;
  search?: string;
  page?: string;
};

export async function getUsers(
  params: GetUsersParams = {},
): Promise<PaginatedResponse<User> | null> {
  const query = new URLSearchParams();
  if (params.perfil) query.set("perfil", params.perfil);
  if (params.ativo) query.set("ativo", params.ativo);
  if (params.search) query.set("search", params.search);
  if (params.page) query.set("page", params.page);

  const queryString = query.toString();
  const res = await apiAuthenticatedRequest<PaginatedResponse<User>>(
    `/api/accounts/users${queryString ? `?${queryString}` : ""}`,
    { method: "GET" },
  );

  if (!res.success) return null;
  return res.data;
}
