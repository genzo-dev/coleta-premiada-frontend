export interface RegistroColeta {
  id: number;
  id_microservico: string;
  imovel: number;
  programa?: number | null;
  pontuacao: string;
  peso_kg: string;
  data_hora_coleta: string | null;
  registrado_por?: number | null;
  imovel_inscricao?: string;
  titular_nome?: string;
  programa_nome?: string;
}
