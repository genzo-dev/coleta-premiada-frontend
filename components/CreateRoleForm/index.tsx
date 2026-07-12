"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  createRoleAction,
  type CreateRoleFormState,
} from "@/actions/gestor/create-role-action";

export default function CreateRoleForm() {
  const initial: CreateRoleFormState = {
    nome: "",
    descricao: "",
    ativo: true,
  };

  const [state, action, isPending] = useActionState(createRoleAction, {
    role: initial,
    errors: [],
    success: false,
  });

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome do papel:</Label>
        <Input
          id="nome"
          name="nome"
          placeholder="Ex: Administrador"
          disabled={isPending}
          defaultValue={state.role?.nome}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="descricao">Descrição:</Label>
        <textarea
          id="descricao"
          name="descricao"
          placeholder="Descrição opcional..."
          disabled={isPending}
          defaultValue={state.role?.descricao}
          className="w-full min-h-20 max-h-50 resize-y rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="ativo"
          name="ativo"
          type="checkbox"
          defaultChecked={state.role?.ativo}
          disabled={isPending}
          className="accent-green-700 w-4 h-4 cursor-pointer"
        />
        <Label htmlFor="ativo">Papel ativo</Label>
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
          "Criar papel"
        )}
      </Button>
    </form>
  );
}
