"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { CreateProgramSchema } from "@/schemas/programs/create-program-schema";
import {
  createProgramAction,
  type CreateProgramFormState,
} from "@/actions/program/create-program-action";

export default function CreateProgramForm() {
  const initialProgram: CreateProgramFormState = {
    nome: "",
    descricao: "",
    data_inicio: undefined,
    data_fim: undefined,
    ativo: true,
    desconto_maximo: 40,
  };

  const [state, action, isPending] = useActionState(createProgramAction, {
    program: initialProgram,
    errors: [],
    success: false,
  });

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      {/* Nome */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome do programa:</Label>
        <Input
          id="nome"
          name="nome"
          placeholder="Digite o nome..."
          disabled={isPending}
          defaultValue={state.program?.nome}
        />
      </div>

      {/* Descrição */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="descricao">Descrição:</Label>
        <Input
          id="descricao"
          name="descricao"
          placeholder="Descrição opcional..."
          disabled={isPending}
          defaultValue={state.program?.descricao}
        />
      </div>

      {/* Data início */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="data_inicio">Data de início:</Label>
        <Input
          id="data_inicio"
          name="data_inicio"
          type="date"
          disabled={isPending}
        />
      </div>

      {/* Data fim */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="data_fim">Data de fim:</Label>
        <Input id="data_fim" name="data_fim" type="date" disabled={isPending} />
      </div>

      {/* Ativo */}
      <div className="flex items-center gap-2">
        <input
          id="ativo"
          name="ativo"
          type="checkbox"
          defaultChecked={state.program?.ativo}
          disabled={isPending}
        />
        <Label htmlFor="ativo">Programa ativo</Label>
      </div>

      {/* Desconto máximo */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="desconto_maximo">Desconto máximo:</Label>
        <Input
          id="desconto_maximo"
          name="desconto_maximo"
          type="number"
          step="0.01"
          min="0"
          max="999.99"
          disabled={isPending}
        />
      </div>

      {/* Erros */}
      {!!state?.errors?.length && (
        <p className="text-red-600 text-sm">{state.errors[0]}</p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-12 text-base bg-[#116F51] hover:bg-emerald-800 text-white mt-6"
      >
        {isPending ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          "Criar programa"
        )}
      </Button>
    </form>
  );
}
