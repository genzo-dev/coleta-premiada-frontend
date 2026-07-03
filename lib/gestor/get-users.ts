import { User } from "@/schemas/user/user-schema";
import { apiAuthenticatedRequest } from "../api-authenticated-request";

export async function getUsers(): Promise<User[] | null> {
  const res = await apiAuthenticatedRequest<{ results: User[] }>(
    "/api/accounts/users",
    {
      method: "GET",
    },
  );

  if (!res.success) return null;
  return res.data.results;
}
