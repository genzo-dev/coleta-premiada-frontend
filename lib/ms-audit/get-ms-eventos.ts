import { apiCollectionAuthenticatedRequest } from "../api-collection-authenticated-request";
import { EventoAuditoria } from "@/types/entities/evento-auditoria";
import { PaginatedResponse } from "@/types/api/paginated-response";

export type GetMsEventosParams = {
  coletor_id?: string;
  nivel?: string;
  evento?: string;
  data_inicio?: string;
  data_fim?: string;
  page?: string;
};

export async function getMsEventos(
  params: GetMsEventosParams = {},
): Promise<PaginatedResponse<EventoAuditoria> | null> {
  const query = new URLSearchParams();
  if (params.coletor_id) query.set("coletor_id", params.coletor_id);
  if (params.nivel) query.set("nivel", params.nivel);
  if (params.evento) query.set("evento", params.evento);
  if (params.data_inicio) query.set("data_inicio", params.data_inicio);
  if (params.data_fim) query.set("data_fim", params.data_fim);
  if (params.page) query.set("page", params.page);

  const queryString = query.toString();
  const res = await apiCollectionAuthenticatedRequest<
    PaginatedResponse<EventoAuditoria>
  >(`/api/audit/eventos${queryString ? `?${queryString}` : ""}`, {
    method: "GET",
  });

  if (!res.success) return null;
  return res.data;
}
