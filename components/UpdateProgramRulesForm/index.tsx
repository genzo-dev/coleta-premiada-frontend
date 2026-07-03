"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import { UpdateProgramRules } from "@/schemas/programs/update-program-rules-schema";
import {
  updateProgramRulesAction,
  UpdateProgramRulesState,
} from "@/actions/program/update-program-rules-action";

type Id = { id: number; programRules: UpdateProgramRules };

function FieldCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-border bg-white p-4 md:p-5 ${className}`}
    >
      {children}
    </div>
  );
}

function FieldDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
  );
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-muted-foreground/70 border-t border-border pt-2 mt-1">
      {children}
    </p>
  );
}

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
    <form action={action} className="flex flex-col gap-5 w-full" noValidate>
      <input type="hidden" name="id" value={id} />

      <FieldCard>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="pontos_por_real"
            className="text-base font-semibold text-foreground"
          >
            Quantos pontos equivalem a 1% de desconto
          </Label>

          <FieldDescription>
            Define a taxa de conversão entre a pontuação acumulada pelo morador
            e o percentual de desconto no IPTU.
          </FieldDescription>

          <div className="flex flex-col gap-1.5">
            <Input
              id="pontos_por_real"
              name="pontos_por_real"
              placeholder="Ex: 10"
              type="number"
              step="0.01"
              min="0.01"
              max="9999.99"
              disabled={isPending}
              defaultValue={state.programRules?.pontos_por_real}
              className="max-w-[200px]"
            />
            <FieldHint>Padrão: 10.00 | Aceita até 2 casas decimais</FieldHint>
          </div>
        </div>
      </FieldCard>

      <FieldCard>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="minimo_para_beneficio"
            className="text-base font-semibold text-foreground"
          >
            Pontuação mínima para gerar qualquer benefício
          </Label>

          <FieldDescription>
            Define um patamar de entrada: moradores com pontuação abaixo deste
            valor não recebem nenhum desconto, mesmo que tenham pontos.
          </FieldDescription>

          <div className="flex flex-col gap-1.5">
            <Input
              id="minimo_para_beneficio"
              name="minimo_para_beneficio"
              placeholder="Ex: 100"
              type="number"
              step="1"
              min="1"
              disabled={isPending}
              defaultValue={state.programRules?.minimo_para_beneficio}
              className="max-w-50"
            />
            <FieldHint>
              Padrão: 100 | Aceita apenas números inteiros positivos
            </FieldHint>
          </div>
        </div>
      </FieldCard>

      <FieldCard>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="permite_acumulo_ciclos"
            className="text-base font-semibold text-foreground"
          >
            Acumular saldo entre ciclos
          </Label>

          <FieldDescription>
            Controla se o saldo de desconto não utilizado pelo morador pode ser
            transportado para o ciclo seguinte.
          </FieldDescription>

          <div className="flex items-center gap-3 pt-1">
            <input type="hidden" name="permite_acumulo_ciclos" value="off" />
            <input
              id="permite_acumulo_ciclos"
              name="permite_acumulo_ciclos"
              type="checkbox"
              defaultChecked={state.programRules?.permite_acumulo_ciclos}
              disabled={isPending}
              value="on"
              className="accent-green-700 w-5 h-5 cursor-pointer rounded"
            />
            <Label
              htmlFor="permite_acumulo_ciclos"
              className="text-sm font-medium cursor-pointer select-none"
            >
              Permitir acúmulo entre ciclos
            </Label>
          </div>

          <FieldHint>Padrão: Não (false)</FieldHint>
        </div>
      </FieldCard>

      <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 md:p-4">
        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-xs md:text-sm text-amber-800 leading-relaxed">
          Independentemente dessas regras, o desconto total nunca ultrapassa 40%
          do IPTU (teto legal definido no programa). Esse limite é aplicado
          automaticamente na consolidação.
        </p>
      </div>

      {!!state?.errors?.length && (
        <p className="text-red-600 text-sm">{state.errors[0]}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-12 text-base bg-[#116F51] hover:bg-emerald-800 text-white"
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
