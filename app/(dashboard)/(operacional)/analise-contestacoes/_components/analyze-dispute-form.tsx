"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  analyzeDisputeAction,
  AnalyzeDisputeFormState,
} from "@/actions/dispute/analyze-dispute-action";

const selectClassName =
  "flex h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

type AnalyzeDisputeFormProps = {
  disputeId: number;
  dispute: AnalyzeDisputeFormState;
};

export default function AnalyzeDisputeForm({
  disputeId,
  dispute,
}: AnalyzeDisputeFormProps) {
  const [state, formAction, isPending] = useActionState(analyzeDisputeAction, {
    dispute,
    errors: [],
    success: false,
  });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="id" value={disputeId} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={state.dispute.status}
          className={selectClassName}
        >
          <option value="em_analise">Em análise</option>
          <option value="aceita">Aceita</option>
          <option value="negada">Negada</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="resposta" className="text-sm font-medium">
          Resposta
        </label>
        <textarea
          id="resposta"
          name="resposta"
          rows={4}
          defaultValue={state.dispute.resposta}
          className="flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          placeholder="Descreva a decisão tomada..."
        />
      </div>

      {state.errors.length > 0 && (
        <ul className="text-sm text-destructive list-disc pl-5">
          {state.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="bg-green-700 hover:bg-green-800"
      >
        {isPending ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          "Salvar análise"
        )}
      </Button>
    </form>
  );
}
