export interface RegistroColeta {
  id: number;
  id_microservico: string;
  imovel: number;
  programa?: number | null;
  pontuacao: string;
  peso_kg: string;
  data_hora_coleta: string | null;
}
