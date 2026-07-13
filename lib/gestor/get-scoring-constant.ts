import { ScoringConstant } from "@/types/entities/scoring-constant";
import { apiAuthenticatedRequest } from "../api-authenticated-request";

export async function getScoringConstant(): Promise<ScoringConstant | null> {
  const res = await apiAuthenticatedRequest<ScoringConstant>(
    "/api/program/scoring-constant",
    {
      method: "GET",
    },
  );

  if (!res.success) {
    return null;
  }

  return res.data;
}
