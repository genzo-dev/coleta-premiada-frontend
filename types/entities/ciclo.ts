export type Ciclo = {
  id: number;
  programa: number;
  nome: string;
  tipo: 'mensal' | 'semestral' | 'anual' | 'personalizado';
  data_inicio: string;
  data_fim: string;
  status: 'aberto' | 'fechado';
  criado_em: string;
};
