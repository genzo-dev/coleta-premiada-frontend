import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { ConsolidationHistory } from "@/schemas/programs/consolidation-schema";

type RawConsolidationsResponse =
  | ConsolidationHistory[]
  | {
      data?: ConsolidationHistory[];
      results?: ConsolidationHistory[];
      consolidations?: ConsolidationHistory[];
    };

export async function getConsolidations(): Promise<ConsolidationHistory[]> {
  const res = await apiAuthenticatedRequest<RawConsolidationsResponse>(
    "/api/program/consolidations",
    {
      method: "GET",
    }
  );

  if (!res.success || !res.data) return [];

  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.data)) return res.data.data;
  if (Array.isArray(res.data.results)) return res.data.results;
  if (Array.isArray(res.data.consolidations)) return res.data.consolidations;

  return [];
}
