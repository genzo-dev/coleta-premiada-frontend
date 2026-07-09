import { ConsolidationHistory } from "@/schemas/programs/consolidation-schema";
import { StatusBadge } from "@/components/ui/status-badge";
import { format } from "date-fns";

export default function ConsolidationHistoryTable({
  history: rawHistory,
}: {
  history: ConsolidationHistory[];
}) {
  const history = Array.isArray(rawHistory) 
    ? rawHistory 
    : Array.isArray((rawHistory as any)?.data) 
      ? (rawHistory as any).data 
      : Array.isArray((rawHistory as any)?.results)
        ? (rawHistory as any).results
        : Array.isArray((rawHistory as any)?.consolidations)
          ? (rawHistory as any).consolidations
          : [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Histórico de Consolidações
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium">
            <tr>
              <th className="px-6 py-4">Data de Execução</th>
              <th className="px-6 py-4">Programa</th>
              <th className="px-6 py-4">Ciclo</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total Imóveis</th>
              <th className="px-6 py-4">Total Pontos</th>
              <th className="px-6 py-4">Executor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {history.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  Nenhuma consolidação encontrada.
                </td>
              </tr>
            ) : (
              history.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    {item.executada_em 
                      ? format(new Date(item.executada_em), "dd/MM/yyyy HH:mm") 
                      : "-"}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {item.programa_nome || `Programa #${item.programa}`}
                  </td>
                  <td className="px-6 py-4">{item.ciclo_nome || item.ciclo || "-"}</td>
                  <td className="px-6 py-4">
                    <StatusBadge variant={item.status?.toLowerCase() as any || "default"} />
                  </td>
                  <td className="px-6 py-4">{item.total_imoveis}</td>
                  <td className="px-6 py-4">{item.total_pontos}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.executada_por_nome || item.executada_por || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
