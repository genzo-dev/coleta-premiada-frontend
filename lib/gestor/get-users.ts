import { User } from "@/schemas/user/user-schema";
import { apiAuthenticatedRequest } from "../api-authenticated-request";

export type PaginatedUsers = {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
};

export type GetUsersParams = {
  page?: number;
  page_size?: number;
  perfil?: string;
  ativo?: string;
  search?: string;
};

export async function getUsers(
  params?: GetUsersParams,
): Promise<PaginatedUsers | null> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.page_size)
    searchParams.set("page_size", String(params.page_size));
  if (params?.perfil) searchParams.set("perfil", params.perfil);
  if (params?.ativo) searchParams.set("ativo", params.ativo);
  if (params?.search) searchParams.set("search", params.search);

  const queryString = searchParams.toString();
  const url = `/api/accounts/users${queryString ? `?${queryString}` : ""}`;

  const res = await apiAuthenticatedRequest<PaginatedUsers>(url, {
    method: "GET",
  });

  if (!res.success) return null;
  return res.data;
}
