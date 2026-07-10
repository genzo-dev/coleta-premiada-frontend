"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  updateProgramAction,
  UpdateProgramFormState,
} from "@/actions/program/update-program-action";
import { Program } from "@/schemas/programs/programs-schema";
import { formatDateToInput } from "@/utils/format-date";
import type { Cidade } from "@/types/entities/cidade";

type UpdateProgramFormProps = { id: number; program: Program; userCidade: Cidade | null };

export default function UpdateProgramForm({ id, program, userCidade }: UpdateProgramFormProps) {
  const cidadeId = program.cidade ?? userCidade?.id;
  const cidadeDisplay = program.cidade_nome
    ? `${program.cidade_nome}${userCidade ? ` - ${userCidade.uf}` : ""}`
    : userCidade
    ? `${userCidade.nome} - ${userCidade.uf}`
    : null;

  const initialProgram: UpdateProgramFormState = {
    nome: program.nome,
    descricao: program.descricao,
    cidade: cidadeId,
    data_inicio: program.data_inicio,
    data_fim: program.data_fim,
    ativo: program.ativo,
    desconto_maximo: program.desconto_maximo,
  };

  const [state, action, isPending] = useActionState(updateProgramAction, {
    program: initialProgram,
    errors: [],
    success: false,
  });

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="cidade" value={cidadeId ?? ""} />

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

      <div className="flex flex-col gap-2">
        <Label htmlFor="descricao">Descrição:</Label>
        <textarea
          id="descricao"
          name="descricao"
          placeholder="Descrição opcional..."
          disabled={isPending}
          defaultValue={state.program?.descricao}
          className="w-full min-h-20 max-h-50 resize-y rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Cidade:</Label>
        {!program.cidade_nome && (
          <p className="text-amber-600 text-xs">
            Este programa ainda não tem cidade vinculada. Será associado à sua cidade.
          </p>
        )}
        <div className="rounded-md border border-input bg-muted px-2.5 py-2 text-sm text-muted-foreground">
          {cidadeDisplay ?? "Cidade não definida"}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="data_inicio">Data de início:</Label>
        <Input
          id="data_inicio"
          name="data_inicio"
          type="date"
          disabled={isPending}
          defaultValue={formatDateToInput(state.program.data_inicio)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="data_fim">Data de fim:</Label>
        <Input
          id="data_fim"
          name="data_fim"
          type="date"
          disabled={isPending}
          defaultValue={formatDateToInput(state.program.data_fim)}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="ativo"
          name="ativo"
          type="checkbox"
          defaultChecked={state.program?.ativo}
          disabled={isPending}
          className="accent-green-700 w-4 h-4 cursor-pointer"
        />
        <Label htmlFor="ativo">Programa ativo</Label>
      </div>

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
          defaultValue={String(state.program.desconto_maximo ?? "")}
        />
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
          "Atualizar programa"
        )}
      </Button>
    </form>
  );
}
