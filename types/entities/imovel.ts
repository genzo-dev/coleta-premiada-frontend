export interface Imovel {
  id: number;
  inscricao: string;
  titular: number;
  titular_nome?: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: number;
  cidade_nome?: string;
  cidade_uf?: string;
  estado: string;
  num_moradores: number;
  latitude: string | null;
  longitude: string | null;
  geocodificacao_falhou: boolean;
  ativo: boolean;
  data_adesao: string;
}
