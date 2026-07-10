"use client";

import { useEffect, useState, useTransition } from "react";
import { format } from "date-fns";
import type { Contestacao } from "@/types/entities/contestacao";
import { buscarContestacoesGestorAction } from "@/actions/contestacao/gestor-contestacao-actions";
import { SheetContestacao } from "./sheet-contestacao";

export function TabelaContestacoes() {
  const [statusFiltro, setStatusFiltro] = useState<string>("aberta");
  const [contestacoes, setContestacoes] = useState<Contestacao[]>([]);
  const [loading, startTransition] = useTransition();
  const [selected, setSelected] = useState<Contestacao | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const carregar = (statusStr: string) => {
    startTransition(async () => {
      const res = await buscarContestacoesGestorAction({ status: statusStr === "todas" ? undefined : statusStr });
      if (res.success && res.data) {
        setContestacoes(res.data.results);
      } else {
        setContestacoes([]);
      }
    });
  };

  useEffect(() => {
    carregar(statusFiltro);
  }, [statusFiltro]);

  const handleRowClick = (cont: Contestacao) => {
    setSelected(cont);
    setIsSheetOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aberta":
        return <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">Aberta</span>;
      case "em_analise":
        return <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">Em Análise</span>;
      case "aceita":
        return <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">Aceita</span>;
      case "negada":
        return <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">Negada</span>;
      default:
        return <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-black/5">
        <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700">Filtrar por Status:</label>
        <select
          id="statusFilter"
          value={statusFiltro}
          onChange={(e) => setStatusFiltro(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-[#1A5538] focus:ring-1 focus:ring-[#1A5538]"
        >
          <option value="aberta">Abertas</option>
          <option value="em_analise">Em Análise</option>
          <option value="aceita">Aceitas</option>
          <option value="negada">Negadas</option>
          <option value="todas">Todas</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-black/5">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">Abertura</th>
                <th className="px-6 py-4 font-medium text-gray-500">Morador</th>
                <th className="px-6 py-4 font-medium text-gray-500">Imóvel (Inscrição)</th>
                <th className="px-6 py-4 font-medium text-gray-500">Coleta (Peso / Data)</th>
                <th className="px-6 py-4 font-medium text-gray-500">Motivo</th>
                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Carregando contestações...</td>
                </tr>
              ) : contestacoes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Nenhuma contestação encontrada.</td>
                </tr>
              ) : (
                contestacoes.map((cont) => (
                  <tr 
                    key={cont.id} 
                    onClick={() => handleRowClick(cont)}
                    className="group cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{format(new Date(cont.aberta_em), "dd/MM/yyyy HH:mm")}</td>
                    <td className="px-6 py-4">{cont.morador_nome || "-"}</td>
                    <td className="px-6 py-4">{cont.imovel_inscricao || "-"}</td>
                    <td className="px-6 py-4">
                      {cont.coleta_peso} kg <br />
                      <span className="text-xs text-gray-500">
                        {cont.coleta_data ? format(new Date(cont.coleta_data), "dd/MM/yyyy") : "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-[200px] truncate" title={cont.motivo}>
                      {cont.motivo}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(cont.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SheetContestacao
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        contestacao={selected}
        onResolved={() => carregar(statusFiltro)}
      />
    </div>
  );
}
