import { RegraPrograma } from "./regra-programa";

export interface Programa {
  id: number;
  nome: string;
  descricao: string;
  cidade: number | null;
  cidade_nome: string | null;
  data_inicio: string;
  data_fim: string;
  ativo: boolean;
  desconto_maximo: string;
  regras: RegraPrograma | null;
}
