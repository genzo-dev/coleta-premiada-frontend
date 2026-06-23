export interface Contestacao {
  id: number;
  coleta: number;
  motivo: string;
  status: "aberta" | "em_analise" | "aceita" | "negada";
  resposta: string;
  analisada_por: number | null;
  aberta_por: number;
  aberta_em: string;
  atualizada_em: string;
}
