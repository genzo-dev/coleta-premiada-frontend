export type ScoringConstant = {
  id: number;
  pontos_por_kg: string;
  atualizado_em: string;
  atualizado_por: {
    id: number;
    email: string;
    nome?: string;
  } | null;
};
