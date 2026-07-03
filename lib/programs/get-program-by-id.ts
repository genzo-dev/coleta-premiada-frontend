import { apiAuthenticatedRequest } from "../api-authenticated-request";
import { Program } from "@/schemas/programs/programs-schema";

export async function getProgramById(id: number): Promise<Program | null> {
  const res = await apiAuthenticatedRequest<Program>(
    `/api/program/programs/${id}`,
    { method: "GET" },
  );

  if (!res.success) return null;
  return res.data;
}
