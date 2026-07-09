import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { ConsolidationHistory } from "@/schemas/programs/consolidation-schema";

export async function getConsolidations(): Promise<ConsolidationHistory[]> {
  const res = await apiAuthenticatedRequest<ConsolidationHistory[]>(
    "/api/program/consolidations",
    {
      method: "GET",
    }
  );

  if (!res.success || !res.data) return [];
  
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray((res.data as any).data)) return (res.data as any).data;
  if (Array.isArray((res.data as any).results)) return (res.data as any).results;
  if (Array.isArray((res.data as any).consolidations)) return (res.data as any).consolidations;
  
  return [];
}
