"use client";

import { useState } from "react";
import type { RegistroColeta } from "@/types/entities/registro-coleta";
import SheetDetalhesColeta from "./sheet-detalhes";
import { Badge } from "@/components/ui/badge";

interface TabelaColetasProps {
  coletas: RegistroColeta[];
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "—";
  }
}

export default function TabelaColetas({ coletas }: TabelaColetasProps) {
  const [selectedColeta, setSelectedColeta] = useState<RegistroColeta | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleRowClick(coleta: RegistroColeta) {
    setSelectedColeta(coleta);
    setSheetOpen(true);
  }

  return (
    <>
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
                <th className="px-6 py-4">Inscrição</th>
                <th className="px-6 py-4">Titular</th>
                <th className="px-6 py-4">Data/Hora</th>
                <th className="px-6 py-4 text-center">Peso (kg)</th>
                <th className="px-6 py-4 text-center">Pontos</th>
                <th className="px-6 py-4 text-center">Origem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {coletas.length > 0 ? (
                coletas.map((coleta) => (
                  <tr
                    key={coleta.id}
                    onClick={() => handleRowClick(coleta)}
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 font-semibold text-foreground">
                      {coleta.imovel_inscricao || `ID ${coleta.imovel}`}
                    </td>
                    <td className="px-6 py-4 text-foreground font-medium">
                      {coleta.titular_nome || "—"}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {formatDate(coleta.data_hora_coleta)}
                    </td>
                    <td className="px-6 py-4 text-center text-foreground font-medium">
                      {coleta.peso_kg}
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 font-bold">
                      {coleta.pontuacao}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {coleta.id_microservico ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          App Campo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Painel (Manual)
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-muted-foreground text-sm"
                  >
                    Nenhuma coleta encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SheetDetalhesColeta 
        coleta={selectedColeta}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  );
}
