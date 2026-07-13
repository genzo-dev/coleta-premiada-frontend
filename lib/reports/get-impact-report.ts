import { apiAuthenticatedRequest } from "../api-authenticated-request";

export type ImpactData = {
  total_coletas: number;
  total_pontos: string | number;
  total_imoveis_participantes: number;
  soma_desconto_percentual: string | number;
};

export async function getImpactReport(
  programaId?: string,
): Promise<ImpactData | null> {
  const res = await apiAuthenticatedRequest<ImpactData>(
    `/api/program/reports/impact${programaId ? `?programa_id=${programaId}` : ""}`,
    { method: "GET" },
  );

  if (!res.success) return null;
  return res.data;
}
