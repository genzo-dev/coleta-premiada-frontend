"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  createCidadeAction,
  type CreateCidadeFormState,
} from "@/actions/cidade/create-cidade-action";

export default function CreateCidadeForm() {
  const initialCidade: CreateCidadeFormState = {
    nome: "",
    uf: "",
    ativo: true,
  };

  const [state, action, isPending] = useActionState(createCidadeAction, {
    cidade: initialCidade,
    errors: [],
    success: false,
  });

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome da cidade:</Label>
        <Input
          id="nome"
          name="nome"
          placeholder="Digite o nome..."
          disabled={isPending}
          defaultValue={state.cidade?.nome}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="uf">UF:</Label>
        <Input
          id="uf"
          name="uf"
          placeholder="Ex: SP"
          maxLength={2}
          disabled={isPending}
          defaultValue={state.cidade?.uf}
          className="uppercase"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="ativo"
          name="ativo"
          type="checkbox"
          defaultChecked={state.cidade?.ativo}
          disabled={isPending}
          className="accent-green-700 w-4 h-4"
        />
        <Label htmlFor="ativo">Cidade ativa</Label>
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
          "Criar cidade"
        )}
      </Button>
    </form>
  );
}
