export interface Consolidacao {
  id: number;
  programa: number;
  executada_em: string;
  executada_por: number;
  status: "pendente" | "processando" | "concluida" | "falhou";
  total_imoveis: number;
  total_pontos: string;
  observacao: string;
}
