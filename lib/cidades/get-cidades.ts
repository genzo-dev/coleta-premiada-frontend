import { apiAuthenticatedRequest } from "../api-authenticated-request";
import { Cidade } from "@/types/entities/cidade";

export async function getCidades(): Promise<Cidade[] | null> {
  const res = await apiAuthenticatedRequest<Cidade[]>("/api/accounts/cidades", {
    method: "GET",
  });

  if (!res.success) return null;
  return res.data;
}
