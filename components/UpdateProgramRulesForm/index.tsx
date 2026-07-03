"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { formatDateToInput } from "@/utils/format-date";
import { UpdateProgramRules } from "@/schemas/programs/update-program-rules-schema";
import {
  updateProgramRulesAction,
  UpdateProgramRulesState,
} from "@/actions/program/update-program-rules-action";

type Id = { id: number; programRules: UpdateProgramRules };

export default function UpdateProgramRulesForm({ id, programRules }: Id) {
  const initialProgram: UpdateProgramRulesState = {
    pontos_por_real: programRules?.pontos_por_real,
    minimo_para_beneficio: programRules?.minimo_para_beneficio,
    permite_acumulo_ciclos: programRules?.permite_acumulo_ciclos ?? false,
  };

  const [state, action, isPending] = useActionState(updateProgramRulesAction, {
    programRules: initialProgram,
    errors: [],
    success: false,
  });

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      <input type="hidden" name="id" value={id} />

      <div className="flex flex-col gap-2">
        <Label htmlFor="pontos_por_real">Quantos pontos por real?</Label>
        <Input
          id="pontos_por_real"
          name="pontos_por_real"
          placeholder="Digite quantos pontos por real..."
          type="number"
          disabled={isPending}
          defaultValue={state.programRules?.pontos_por_real}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="minimo_para_beneficio">
          Qual o mínimo para obter os benefícios?
        </Label>
        <Input
          id="minimo_para_beneficio"
          name="minimo_para_beneficio"
          type="number"
          placeholder="Digite o mínimo para obter o benefício..."
          disabled={isPending}
          defaultValue={state.programRules?.minimo_para_beneficio}
        />
      </div>

      <div className="flex items-center gap-2">
        <input type="hidden" name="permite_acumulo_ciclos" value="off" />
        <input
          id="permite_acumulo_ciclos"
          name="permite_acumulo_ciclos"
          type="checkbox"
          defaultChecked={state.programRules?.permite_acumulo_ciclos}
          disabled={isPending}
          value="on"
          className="accent-green-700 w-4 h-4 cursor-pointer"
        />
        <Label htmlFor="permite_acumulo_ciclos">Permitir acúmulos?</Label>
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
