import { apiAuthenticatedRequest } from "../api-authenticated-request";
import { Program } from "@/schemas/programs/programs-schema";

export async function getPrograms(): Promise<Program[] | null> {
  const res = await apiAuthenticatedRequest<Program[]>(
    "/api/program/programs",
    {
      method: "GET",
    },
  );

  if (!res.success) return null;
  return res.data;
}
