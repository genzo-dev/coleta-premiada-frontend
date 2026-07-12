export interface EventoAuditoria {
  id: number;
  timestamp: string;
  origem: "api" | "fila_publish" | "fila_consume" | "management_command";
  nivel: "info" | "warning" | "error";
  evento: string;
  coletor_id: string | null;
  coleta_offline_id: string | null;
  fila: string | null;
  detalhe: Record<string, unknown> | null;
}
