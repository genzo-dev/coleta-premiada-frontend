export interface AuditLog {
  id: number;
  timestamp: string;
  usuario_id: number | null;
  usuario_email: string | null;
  operacao: "INSERT" | "UPDATE" | "DELETE" | "SELECT";
  tabela: string;
  objeto_id: string | null;
  dados_antes: Record<string, unknown> | null;
  dados_depois: Record<string, unknown> | null;
  ip_origem: string | null;
  endpoint: string | null;
  cidade: string | null;
}
