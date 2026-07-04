import { Role } from "@/types/entities/role";
import { apiAuthenticatedRequest } from "../api-authenticated-request";

export async function getRoles(): Promise<Role[] | null> {
  const res = await apiAuthenticatedRequest<Role[]>("/api/accounts/roles", {
    method: "GET",
  });

  if (!res.success) return null;
  return res.data;
}
