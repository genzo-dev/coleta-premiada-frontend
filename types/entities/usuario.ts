import { Cidade } from "./cidade";
import { Role } from "./role";

export interface Usuario {
  id: number;
  email: string;
  cpf: string | null;
  nome: string;
  perfil: "supervisor" | "morador" | "gestor" | "gerente_geral";
  cidade: Cidade | null;
  ativo: boolean;
  roles: Role[];
}
