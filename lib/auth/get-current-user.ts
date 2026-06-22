import { PublicUser, User } from "@/schemas/user/user-schema";
import { apiAuthenticatedRequest } from "../api-authenticated-request";

export async function getCurrentUser(): Promise<User | null> {
  const res = await apiAuthenticatedRequest<User>("/api/accounts/auth/me", {
    method: "GET",
  });

  if (!res.success) return null;
  return res.data;
}
