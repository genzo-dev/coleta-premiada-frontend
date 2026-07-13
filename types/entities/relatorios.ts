// Movidos de app/(dashboard)/(gestor)/dashboard/page.tsx para reaproveitamento global
export type ImpactData = {
  total_coletas: number;
  total_pontos: string | number;
  total_imoveis_participantes: number;
  soma_desconto_percentual: string | number;
};

export type RankingItem = {
  imovel__inscricao: string;
  imovel__titular__nome: string;
  pontos: string | number;
};

export type ParticipationItem = {
  imovel__inscricao: string;
  imovel__titular__nome: string;
  coletas: number;
  pontos: string | number;
};

export type SaldoBeneficio = {
  id: number;
  imovel: number;
  programa: number;
  ciclo: number;
  desconto_percentual: string;
  atualizado: string;
};

export type RelatorioLLM = {
  id: number;
  tipo: "participacao" | "impacto" | "ranking" | "auditoria";
  periodo: { inicio: string; fim: string };
  programa: number | null;
  direcionamento: string;
  status: "pendente" | "processando" | "concluido" | "erro";
  relatorio: string;
  tokens_utilizados: number;
  gerado_em: string;
  gerado_por: number;
};
