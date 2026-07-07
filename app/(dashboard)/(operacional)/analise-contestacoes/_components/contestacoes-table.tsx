"use client";

import { useState } from "react";
import type { Contestacao } from "@/types/entities/contestacao";
import { ContestacaoSheet } from "./contestacao-sheet";

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

type ContestacoesTableProps = {
  contestacoes: Contestacao[];
  canAnalyze: boolean;
};

export default function ContestacoesTable({
  contestacoes,
  canAnalyze,
}: ContestacoesTableProps) {
  const [selected, setSelected] = useState<Contestacao | null>(null);

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg border border-border bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
              <th className="px-4 py-3">Coleta</th>
              <th className="px-4 py-3">Motivo</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aberta por</th>
              <th className="px-4 py-3">Aberta em</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {contestacoes.map((contestacao, index) => (
              <tr
                key={contestacao.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition cursor-pointer`}
                onClick={() => setSelected(contestacao)}
              >
                <td className="px-4 py-3 font-medium">
                  #{contestacao.coleta}
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                  {contestacao.motivo}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${STATUS_CLASSES[contestacao.status]}`}
                  >
                    {STATUS_LABELS[contestacao.status]}
                  </span>
                </td>
                <td className="px-4 py-3">#{contestacao.aberta_por}</td>
                <td className="px-4 py-3">
                  {new Date(contestacao.aberta_em).toLocaleDateString(
                    "pt-BR",
                  )}
                </td>
                <td className="px-4 py-3 text-right text-xs text-muted-foreground">
                  Ver detalhes
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <ContestacaoSheet
          contestacao={selected}
          canAnalyze={canAnalyze}
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
        />
      )}
    </>
  );
}
