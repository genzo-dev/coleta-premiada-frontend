"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  createUserAction,
  type CreateUserFormState,
} from "@/actions/user/create-user-action";
import type { Cidade } from "@/types/entities/cidade";

const selectClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50";

type CreateUserFormProps = {
  cidades: Cidade[];
  hideGerenteGeral?: boolean;
};

export default function CreateUserForm({
  cidades,
  hideGerenteGeral,
}: CreateUserFormProps) {
  const initialUser: CreateUserFormState = {
    nome: "",
    email: "",
    cpf: "",
    perfil: "supervisor",
    cidade: null,
  };

  const [state, action, isPending] = useActionState(createUserAction, {
    user: initialUser,
    errors: [],
    success: false,
  });

  const [perfil, setPerfil] = useState(state.user?.perfil || initialUser.perfil);
  const cidadeExigida = perfil === "gestor" || perfil === "supervisor";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!e.currentTarget.reportValidity()) {
      e.preventDefault();
    }
  }

  return (
    <form
      action={action}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
      noValidate
    >
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
        <Label htmlFor="email">E-mail:</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Digite o e-mail..."
          disabled={isPending}
          defaultValue={state.user?.email}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="cpf">CPF</Label>
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
            required
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
          "Criar usuário"
        )}
      </Button>
    </form>
  );
}
