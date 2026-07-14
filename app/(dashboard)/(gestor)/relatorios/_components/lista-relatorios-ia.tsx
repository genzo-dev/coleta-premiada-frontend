"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2, Eye, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { getReportHistoryAction, getReportDetailAction } from "@/actions/gestor/reports-ia-actions";
import type { RelatorioLLM } from "@/types/entities/relatorios";

const TIPO_LABELS: Record<string, string> = {
  participacao: "Participação",
  impacto: "Impacto",
  ranking: "Ranking",
  auditoria: "Auditoria",
};

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string; icon: React.ComponentType<{ className?: string }> }
> = {
  pendente: {
    label: "Pendente",
    className: "bg-gray-100 text-gray-700",
    icon: Clock,
  },
  processando: {
    label: "Processando",
    className: "bg-blue-100 text-blue-700",
    icon: Loader2,
  },
  concluido: {
    label: "Concluído",
    className: "bg-emerald-100 text-emerald-700",
    icon: CheckCircle2,
  },
  erro: {
    label: "Erro",
    className: "bg-red-100 text-red-700",
    icon: AlertCircle,
  },
};

type Props = {
  refreshTrigger: number;
};

export function ListaRelatoriosIA({ refreshTrigger }: Props) {
  const [reports, setReports] = useState<RelatorioLLM[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<RelatorioLLM | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const data = await getReportHistoryAction();
      if (!cancelled && data) {
        setReports(data.results);
      }
      if (!cancelled) {
        setLoading(false);
      }
    };

    load();

    return () => { cancelled = true; };
  }, [refreshTrigger]);

  // Polling: verifica itens pendentes/processando a cada 5s
  useEffect(() => {
    const hasPending = reports.some(
      (r) => r.status === "pendente" || r.status === "processando"
    );
    if (!hasPending) return;

    const interval = setInterval(() => {
      getReportHistoryAction().then((data) => {
        if (data) setReports(data.results);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [reports]);

  const handleView = async (report: RelatorioLLM) => {
    setModalLoading(true);
    setSelectedReport(report);
    const detail = await getReportDetailAction(report.id);
    if (detail) {
      setSelectedReport(detail);
    }
    setModalLoading(false);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-base font-semibold text-foreground">
            Histórico de Relatórios
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Relatórios gerados por IA ficam disponíveis aqui após o
            processamento.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/50 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
              <tr className="border-b border-border">
                <th className="px-5 py-3">Tipo</th>
                <th className="px-5 py-3">Período</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Criado em</th>
                <th className="px-5 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reports.length > 0 ? (
                reports.map((r) => {
                  const statusCfg = STATUS_CONFIG[r.status] ?? STATUS_CONFIG.pendente;
                  const StatusIcon = statusCfg.icon;
                  const isProcessing =
                    r.status === "pendente" || r.status === "processando";
                  return (
                    <tr
                      key={r.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-medium text-foreground">
                        {TIPO_LABELS[r.tipo] ?? r.tipo}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        {new Date(r.periodo.inicio).toLocaleDateString("pt-BR")}{" "}
                        –{" "}
                        {new Date(r.periodo.fim).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusCfg.className}`}
                        >
                          <StatusIcon
                            className={`w-3.5 h-3.5 ${isProcessing ? "animate-spin" : ""}`}
                          />
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        {formatDate(r.gerado_em)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleView(r)}
                          disabled={isProcessing}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Ver
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-muted-foreground text-sm"
                  >
                    Nenhum relatório gerado ainda. Use o formulário acima para
                    criar o primeiro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de visualização */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Relatório{" "}
                  {TIPO_LABELS[selectedReport.tipo] ?? selectedReport.tipo}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(selectedReport.periodo.inicio).toLocaleDateString(
                    "pt-BR"
                  )}{" "}
                  –{" "}
                  {new Date(selectedReport.periodo.fim).toLocaleDateString(
                    "pt-BR"
                  )}
                </p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-gray-100 transition-colors"
              >
                x
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {modalLoading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                </div>
              ) : (
                <div className="prose prose-sm max-w-none text-foreground">
                  {selectedReport.relatorio ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedReport.relatorio}
                    </ReactMarkdown>
                  ) : (
                    "Conteúdo ainda não disponível."
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
