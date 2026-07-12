import { apiAuthenticatedRequest } from "../api-authenticated-request";
import { AuditLog } from "@/types/entities/audit-log";
import { PaginatedResponse } from "@/types/api/paginated-response";

export type GetAuditLogsParams = {
  usuario_id?: string;
  tabela?: string;
  operacao?: string;
  objeto_id?: string;
  data_inicio?: string;
  data_fim?: string;
  cidade?: string;
  page?: string;
};

export async function getAuditLogs(
  params: GetAuditLogsParams = {},
): Promise<PaginatedResponse<AuditLog> | null> {
  const query = new URLSearchParams();
  if (params.usuario_id) query.set("usuario_id", params.usuario_id);
  if (params.tabela) query.set("tabela", params.tabela);
  if (params.operacao) query.set("operacao", params.operacao);
  if (params.objeto_id) query.set("objeto_id", params.objeto_id);
  if (params.data_inicio) query.set("data_inicio", params.data_inicio);
  if (params.data_fim) query.set("data_fim", params.data_fim);
  if (params.cidade) query.set("cidade", params.cidade);
  if (params.page) query.set("page", params.page);

  const queryString = query.toString();
  const res = await apiAuthenticatedRequest<PaginatedResponse<AuditLog>>(
    `/api/audit/logs${queryString ? `?${queryString}` : ""}`,
    { method: "GET" },
  );

  if (!res.success) return null;
  return res.data;
}
