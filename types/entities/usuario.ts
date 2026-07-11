import { Role } from "./role";

export interface Usuario {
  id: number;
  email: string;
  cpf: string | null;
  nome: string;
  cidade: string;
  perfil: "supervisor" | "morador" | "gestor";
  ativo: boolean;
  roles: Role[];
}
