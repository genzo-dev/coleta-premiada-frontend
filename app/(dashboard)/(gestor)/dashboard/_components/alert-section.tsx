import Link from "next/link";
import { MdWarning, MdInfoOutline, MdCheckCircle, MdError, MdHourglassEmpty } from "react-icons/md";
import { ConsolidationHistory } from "@/schemas/programs/consolidation-schema";

export default function AlertsSection({
  disputesCount,
  lastConsolidation,
}: {
  disputesCount: number;
  lastConsolidation: ConsolidationHistory | null;
}) {
  const getStatusConfig = (status?: string) => {
    switch (status) {
      case "concluida":
        return { color: "text-green-600 bg-green-50 border-green-200", icon: MdCheckCircle, text: "Concluída" };
      case "processando":
        return { color: "text-blue-600 bg-blue-50 border-blue-200", icon: MdHourglassEmpty, text: "Processando" };
      case "falhou":
        return { color: "text-red-600 bg-red-50 border-red-200", icon: MdError, text: "Falhou" };
      case "pendente":
      default:
        return { color: "text-gray-600 bg-gray-50 border-gray-200", icon: MdHourglassEmpty, text: "Pendente" };
    }
  };

  const statusConfig = getStatusConfig(lastConsolidation?.status);
  const StatusIcon = statusConfig.icon;

  return (
    <>
      {/* Contestações Abertas */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-xs flex flex-col justify-center w-full">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full">
            <MdWarning className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-900">Atenção Necessária</h4>
            <p className="text-xs text-amber-700 mt-1">
              Você possui <strong>{disputesCount}</strong> contestaç{disputesCount === 1 ? 'ão' : 'ões'} em aberto.
            </p>
          </div>
        </div>
        <Link 
          href="/contestacoes" 
          className="mt-4 text-xs font-semibold text-amber-700 hover:text-amber-900 underline underline-offset-2 self-start"
        >
          Analisar contestações &rarr;
        </Link>
      </div>

      {/* Última Consolidação */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-center relative overflow-hidden w-full">
        <div className="flex items-center gap-2 border-b border-border pb-3 mb-3">
          <MdInfoOutline className="h-5 w-5 text-muted-foreground" />
          <h4 className="text-sm font-semibold text-foreground">Última Consolidação</h4>
        </div>

        {lastConsolidation ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Status</span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.text}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Ciclo</span>
              <span className="text-sm font-medium text-foreground">{lastConsolidation.ciclo_nome || "—"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Executada por</span>
              <span className="text-sm text-foreground truncate max-w-[120px]" title={lastConsolidation.executada_por_nome}>
                {lastConsolidation.executada_por_nome || "Sistema"}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Data</span>
              <span className="text-xs text-foreground">
                {new Date(lastConsolidation.executada_em).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <span className="text-sm text-muted-foreground">Nenhuma consolidação encontrada.</span>
          </div>
        )}
      </div>
    </>
  );
}
