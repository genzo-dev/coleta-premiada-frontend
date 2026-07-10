import { AuditLogPaginatedResponse } from "@/types/entities/audit-log";
import { apiAuthenticatedRequest } from "../api-authenticated-request";

type GetAuditLogsParams = {
  page?: number;
  page_size?: number;
  usuario_id?: string;
  tabela?: string;
  operacao?: string;
  data_inicio?: string;
  data_fim?: string;
  objeto_id?: string;
};

export async function getAuditLogs(params: GetAuditLogsParams) {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", String(params.page));
  if (params.page_size)
    searchParams.append("page_size", String(params.page_size));
  if (params.usuario_id) searchParams.append("usuario_id", params.usuario_id);
  if (params.tabela) searchParams.append("tabela", params.tabela);
  if (params.operacao) searchParams.append("operacao", params.operacao);
  if (params.data_inicio) searchParams.append("data_inicio", params.data_inicio);
  if (params.data_fim) searchParams.append("data_fim", params.data_fim);
  if (params.objeto_id) searchParams.append("objeto_id", params.objeto_id);

  const res = await apiAuthenticatedRequest<AuditLogPaginatedResponse>(
    `/api/audit/logs?${searchParams.toString()}`,
    {
      method: "GET",
    },
  );

  return res.data;
}
