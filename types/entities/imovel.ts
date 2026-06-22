export interface Imovel {
  id: number;
  incricao: string;
  titular: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  num_moradores: number;
  latitude: string | null;
  longitutde: string | null;
  geocodificacao_falhou: boolean;
  ativo: boolean;
  data_adesao: string;
}
