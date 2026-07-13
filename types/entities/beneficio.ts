export interface SaldoPorCiclo {
  id: number;
  imovel: number;
  programa: number;
  ciclo: number;
  desconto_percentual: string;
  atualizado: string;
}

export interface Beneficio {
  imovel: string;
  titular: string;
  programa: string;
  desconto_maximo_percentual: string;
  desconto_total_percentual: string;
  saldos_por_ciclo: SaldoPorCiclo[];
}
