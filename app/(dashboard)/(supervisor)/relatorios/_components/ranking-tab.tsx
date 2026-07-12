import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { RankingItem } from "@/types/entities/relatorios";
import { MdOutlineLeaderboard } from "react-icons/md";

export async function RankingTab({ programaId }: { programaId?: string }) {
  const url = `/api/program/reports/ranking${programaId ? `?programa_id=${programaId}` : ""}`;
  const response = await apiAuthenticatedRequest<RankingItem[] | { results: RankingItem[] }>(url);

  let rankingList: RankingItem[] = [];
  if (response.success && response.data) {
    const rawData = response.data;
    if ("results" in rawData && Array.isArray(rawData.results)) rankingList = rawData.results;
    else if (Array.isArray(rawData)) rankingList = rawData;
  }

  const top50 = rankingList.slice(0, 50);
  const numberFormatter = new Intl.NumberFormat("pt-BR");

  return (
    <div className="p-0 sm:p-6">
      <div className="p-6 sm:p-0 mb-4 sm:mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MdOutlineLeaderboard className="w-5 h-5 text-amber-500" />
          Ranking de Imóveis (Top 50)
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Os 50 imóveis com maior acumulação de pontos em toda a cidade. Imóveis nas três primeiras posições recebem destaque.
        </p>
      </div>

      <div className="overflow-x-auto border-t sm:border border-border sm:rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
            <tr className="border-b border-border">
              <th className="px-6 py-4 w-20">Posição</th>
              <th className="px-6 py-4">Inscrição Imobiliária</th>
              <th className="px-6 py-4">Titular</th>
              <th className="px-6 py-4 text-right">Pontos Totais</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {top50.length > 0 ? (
              top50.map((item, index) => {
                const isTop3 = index < 3;
                return (
                  <tr key={item.imovel__inscricao} className={`transition-colors hover:bg-gray-50/50 ${isTop3 ? "bg-amber-50/20" : "bg-white"}`}>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                        index === 0 ? "bg-amber-100 text-amber-700 ring-2 ring-amber-300" :
                        index === 1 ? "bg-gray-200 text-gray-600 ring-2 ring-gray-300" :
                        index === 2 ? "bg-orange-100 text-orange-700 ring-2 ring-orange-300" :
                        "bg-gray-50 text-gray-500"
                      }`}>
                        {index + 1}º
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{item.imovel__inscricao}</td>
                    <td className="px-6 py-4 text-gray-600">{item.imovel__titular__nome || "Não informado"}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-bold ${isTop3 ? "text-amber-700" : "text-gray-900"}`}>
                        {numberFormatter.format(parseFloat(String(item.pontos || 0)))}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                  Nenhum registro encontrado para a formação do Ranking neste programa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
