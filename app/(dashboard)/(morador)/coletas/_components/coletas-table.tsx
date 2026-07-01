"use client";

import { useState } from "react";
import { ColetaSheet } from "./coleta-sheet";
import type { ColetaMicroservico } from "@/types/entities/coleta-microservico";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type ColetasTableProps = {
  coletas: ColetaMicroservico[];
};

export function ColetasTable({ coletas }: ColetasTableProps) {
  const [selected, setSelected] = useState<ColetaMicroservico | null>(null);

  if (coletas.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4">
        Nenhuma coleta encontrada para o período selecionado.
      </p>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Data e hora
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Peso (kg)
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Pontuação
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                Programa
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {coletas.map((coleta) => (
              <tr
                key={coleta.id}
                onClick={() => setSelected(coleta)}
                className="cursor-pointer hover:bg-muted/40 transition-colors"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelected(coleta);
                }}
              >
                <td className="px-4 py-3 text-foreground">
                  {formatDateTime(coleta.data_hora)}
                </td>
                <td className="px-4 py-3 text-right text-foreground">
                  {parseFloat(coleta.peso_total_kg).toFixed(3)}
                </td>
                <td className="px-4 py-3 text-right font-medium text-foreground">
                  {coleta.pontuacao
                    ? `${parseFloat(coleta.pontuacao).toFixed(2)} pts`
                    : "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                  {coleta.programa ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <ColetaSheet
          coleta={selected}
          open
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
        />
      )}
    </>
  );
}
