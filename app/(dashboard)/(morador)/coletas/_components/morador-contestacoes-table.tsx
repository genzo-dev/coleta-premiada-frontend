"use client";

import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import type { Contestacao } from "@/types/entities/contestacao";

function formatDateTime(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: Contestacao["status"] }) {
  switch (status) {
    case "aberta":
      return (
        <Badge variant="outline" className="text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" /> Aberta
        </Badge>
      );
    case "em_analise":
      return (
        <Badge variant="secondary" className="text-yellow-600 bg-yellow-100/50 hover:bg-yellow-100/80 border-yellow-200">
          <AlertCircle className="mr-1 h-3 w-3" /> Em análise
        </Badge>
      );
    case "aceita":
      return (
        <Badge variant="secondary" className="text-green-700 bg-green-100/50 hover:bg-green-100/80 border-green-200">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Aceita
        </Badge>
      );
    case "negada":
      return (
        <Badge variant="secondary" className="text-red-700 bg-red-100/50 hover:bg-red-100/80 border-red-200">
          <XCircle className="mr-1 h-3 w-3" /> Negada
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

type MoradorContestacoesTableProps = {
  contestacoes: Contestacao[];
};

export function MoradorContestacoesTable({ contestacoes }: MoradorContestacoesTableProps) {
  const [selected, setSelected] = useState<Contestacao | null>(null);

  if (contestacoes.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground border border-dashed rounded-lg">
        Você não possui nenhuma contestação registrada.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Abertura
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Coleta Relacionada
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                Motivo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {contestacoes.map((item) => (
              <tr
                key={item.id}
                onClick={() => setSelected(item)}
                className="cursor-pointer hover:bg-muted/40 transition-colors"
              >
                <td className="px-4 py-3 text-foreground whitespace-nowrap">
                  {formatDateTime(item.aberta_em)}
                </td>
                <td className="px-4 py-3 text-foreground whitespace-nowrap">
                  <div className="font-medium">
                    {item.coleta_peso ? `${parseFloat(item.coleta_peso).toFixed(2)} kg` : "—"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDateTime(item.coleta_data ?? "")}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell max-w-[200px] truncate">
                  {item.motivo}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent 
          title="Detalhes da Contestação" 
          description="Acompanhe o andamento da sua solicitação."
          className="flex flex-col h-full"
        >
          {selected && (
            <div className="flex flex-col gap-6 flex-1 h-full">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status Atual</span>
                <StatusBadge status={selected.status} />
              </div>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Seu Motivo
                </h3>
                <div className="rounded-md bg-muted/50 p-4 text-sm whitespace-pre-wrap">
                  {selected.motivo}
                </div>
              </section>

              {selected.status !== "aberta" && selected.status !== "em_analise" && (
                <section className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Resposta do Gestor
                  </h3>
                  <div className="rounded-md border p-4 text-sm whitespace-pre-wrap">
                    {selected.resposta || <span className="italic text-muted-foreground">Sem resposta escrita.</span>}
                  </div>
                </section>
              )}

              <section className="space-y-3 mt-auto pt-6 border-t">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Histórico
                </h3>
                <dl className="grid grid-cols-2 gap-y-3 text-sm">
                  <dt className="text-muted-foreground">Data de Abertura</dt>
                  <dd className="text-right font-medium">{formatDateTime(selected.aberta_em)}</dd>
                  
                  <dt className="text-muted-foreground">Última Atualização</dt>
                  <dd className="text-right font-medium">{formatDateTime(selected.atualizada_em)}</dd>

                  <dt className="text-muted-foreground">Coleta Contestada</dt>
                  <dd className="text-right font-medium">
                    {selected.coleta_peso ? `${parseFloat(selected.coleta_peso).toFixed(2)} kg` : "—"}
                  </dd>
                </dl>
              </section>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
