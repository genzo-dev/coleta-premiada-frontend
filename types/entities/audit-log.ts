export type AuditLog = {
  id: number;
  timestamp: string;
  usuario_id: number | null;
  usuario_email: string | null;
  operacao: "INSERT" | "UPDATE" | "DELETE" | "SELECT";
  tabela: string;
  objeto_id: string | null;
  dados_antes: any | null;
  dados_depois: any | null;
  ip_origem: string | null;
  endpoint: string | null;
};

export type AuditLogPaginatedResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AuditLog[];
};
