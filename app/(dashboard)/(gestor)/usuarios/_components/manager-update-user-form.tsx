"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  managerUpdateUserAction,
  type ManagerUpdateUserFormState,
} from "@/actions/user/manager-update-user-action";
import type { Cidade } from "@/types/entities/cidade";
import type { User } from "@/schemas/user/user-schema";

const selectClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50";

type ManagerUpdateUserFormProps = {
  user: User;
  cidades: Cidade[];
  hideGerenteGeral?: boolean;
};

export default function ManagerUpdateUserForm({
  user,
  cidades,
  hideGerenteGeral,
}: ManagerUpdateUserFormProps) {
  const initialUser: ManagerUpdateUserFormState = {
    nome: user.nome,
    cpf: user.cpf ?? "",
    perfil: user.perfil,
    cidade: user.cidade?.id ?? null,
    ativo: user.ativo,
  };

  const [state, action, isPending] = useActionState(managerUpdateUserAction, {
    user: initialUser,
    errors: [],
    success: false,
  });

  const [perfil, setPerfil] = useState(state.user?.perfil || user.perfil);
  const cidadeExigida = perfil === "gestor" || perfil === "supervisor";

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      <input type="hidden" name="id" value={user.id} />

      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome:</Label>
        <Input
          id="nome"
          name="nome"
          placeholder="Digite o nome..."
          disabled={isPending}
          defaultValue={state.user?.nome}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="cpf">CPF (opcional):</Label>
        <Input
          id="cpf"
          name="cpf"
          placeholder="000.000.000-00"
          disabled={isPending}
          defaultValue={state.user?.cpf ?? ""}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="perfil">Perfil:</Label>
        <select
          id="perfil"
          name="perfil"
          className={selectClassName}
          disabled={isPending}
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
        >
          <option value="morador">Morador</option>
          <option value="supervisor">Supervisor</option>
          <option value="gestor">Gestor</option>
          {!hideGerenteGeral && (
            <option value="gerente_geral">Gerente Geral</option>
          )}
        </select>
      </div>

      {cidadeExigida && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="cidade">Cidade:</Label>
          <select
            id="cidade"
            name="cidade"
            className={selectClassName}
            disabled={isPending}
            defaultValue={state.user?.cidade ?? ""}
          >
            <option value="">Selecione a cidade...</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.id}>
                {cidade.nome}/{cidade.uf}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          id="ativo"
          name="ativo"
          type="checkbox"
          defaultChecked={state.user?.ativo}
          disabled={isPending}
          className="accent-green-700 w-4 h-4"
        />
        <Label htmlFor="ativo">Usuário ativo</Label>
      </div>

      {!!state?.errors?.length && (
        <p className="text-red-600 text-sm">{state.errors[0]}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-12 text-base bg-[#116F51] hover:bg-emerald-800 text-white mt-6"
      >
        {isPending ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          "Salvar alterações"
        )}
      </Button>
    </form>
  );
}
