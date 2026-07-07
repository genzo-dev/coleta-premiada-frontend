"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { Contestacao } from "@/types/entities/contestacao";
import AnalyzeDisputeForm from "./analyze-dispute-form";

const STATUS_LABELS: Record<Contestacao["status"], string> = {
  aberta: "Aberta",
  em_analise: "Em análise",
  aceita: "Aceita",
  negada: "Negada",
};

const STATUS_CLASSES: Record<Contestacao["status"], string> = {
  aberta: "bg-yellow-100 text-yellow-700",
  em_analise: "bg-blue-100 text-blue-700",
  aceita: "bg-green-100 text-green-700",
  negada: "bg-red-100 text-red-700",
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type ContestacaoSheetProps = {
  contestacao: Contestacao;
  canAnalyze: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ContestacaoSheet({
  contestacao,
  canAnalyze,
  open,
  onOpenChange,
}: ContestacaoSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        title={`Contestação #${contestacao.id}`}
        description={formatDateTime(contestacao.aberta_em)}
      >
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">Coleta</span>
              <span className="text-sm font-medium">
                #{contestacao.coleta}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">Status</span>
              <span
                className={`w-fit px-2 py-1 rounded-md text-xs font-medium ${STATUS_CLASSES[contestacao.status]}`}
              >
                {STATUS_LABELS[contestacao.status]}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">
                Aberta por
              </span>
              <span className="text-sm font-medium">
                #{contestacao.aberta_por}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">
                Atualizada em
              </span>
              <span className="text-sm font-medium">
                {formatDateTime(contestacao.atualizada_em)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">Motivo</span>
            <p className="text-sm">{contestacao.motivo}</p>
          </div>

          {contestacao.resposta && (
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">Resposta</span>
              <p className="text-sm">{contestacao.resposta}</p>
            </div>
          )}

          {canAnalyze && (
            <div className="border-t border-border pt-4">
              <AnalyzeDisputeForm
                disputeId={contestacao.id}
                dispute={{
                  status:
                    contestacao.status === "aberta"
                      ? "em_analise"
                      : contestacao.status,
                  resposta: contestacao.resposta,
                }}
              />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
