export interface ColetaMicroservico {
  id: string;
  codigo: string;
  imovel_id: string;
  coletor_id: string;
  status: string;
  data_hora: string;
  peso_total_kg: string;
  foto_url: string | null;
  offline_id: string | null;
  sincronizado: boolean;
  pontuacao?: string | null;
  programa?: string | null;
}

export type ListaColetasMoradorResponse = {
  coletas: ColetaMicroservico[];
  page: number;
  total: number;
  total_pages: number;
};
