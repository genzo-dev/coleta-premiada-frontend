export type Dispute = {
  id: number;
  imovel_inscricao: string;
  motivo: string;
  status: "aberta" | "em_analise" | "deferida" | "indeferida";
  criado_em: string;
};
