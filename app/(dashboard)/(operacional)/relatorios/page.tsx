export const dynamic = "force-dynamic";
export const revalidate = 0;

import {
  MdAssessment,
  MdRecycling,
  MdStars,
  MdHome,
  MdCardGiftcard,
} from "react-icons/md";
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { getImpactReport, ImpactData } from "@/lib/reports/get-impact-report";
import { getRankingReport, RankingItem } from "@/lib/reports/get-ranking-report";
import {
  getParticipationReport,
  ParticipationItem,
} from "@/lib/reports/get-participation-report";
import type { PaginatedResponse } from "@/types/api/paginated-response";
import type { Programa } from "@/types/entities/programa";
import ProgramFilter from "@/components/ProgramFilter";
import MetricCard from "@/components/MetricCard";
import Pagination from "@/components/Pagination";
import RelatorioTabs from "./_components/relatorio-tabs";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function RelatoriosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const programaId =
    typeof params.programa_id === "string" ? params.programa_id : undefined;
  const tab = typeof params.tab === "string" ? params.tab : "impacto";
  const page = typeof params.page === "string" ? params.page : undefined;

  const [impactData, rankingData, participationData, programsRes] =
    await Promise.all([
      getImpactReport(programaId),
      tab === "ranking" ? getRankingReport(programaId, page) : null,
      tab === "participacao"
        ? getParticipationReport(programaId, page)
        : null,
      apiAuthenticatedRequest<Programa[] | PaginatedResponse<Programa>>(
        "/api/program/programs",
      ),
    ]);

  const impact: ImpactData = impactData ?? {
    total_coletas: 0,
    total_pontos: 0,
    total_imoveis_participantes: 0,
    soma_desconto_percentual: 0,
  };

  const rankingList: RankingItem[] = rankingData?.results ?? [];
  const participationList: ParticipationItem[] =
    participationData?.results ?? [];

  let programsList: Programa[] = [];
  if (programsRes.success) {
    const rawData = programsRes.data;
    if (rawData && typeof rawData === "object") {
      if ("results" in rawData && Array.isArray(rawData.results)) {
        programsList = rawData.results;
      } else if (Array.isArray(rawData)) {
        programsList = rawData;
      }
    }
  }

  const numberFormatter = new Intl.NumberFormat("pt-BR");
  const percentFormatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  const formattedColetas = numberFormatter.format(impact.total_coletas);
  const formattedPontos = numberFormatter.format(
    Math.round(parseFloat(String(impact.total_pontos || 0))),
  );
  const formattedImoveis = numberFormatter.format(
    impact.total_imoveis_participantes,
  );
  const formattedDesconto = `${percentFormatter.format(
    parseFloat(String(impact.soma_desconto_percentual || 0)),
  )}%`;

  const currentPage = Math.max(1, Number(page || "1"));
  const pageOffset = (currentPage - 1) * 20;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdAssessment className="w-6 h-6 text-[#116F51]" />
          Relatórios
        </h1>

        <ProgramFilter programs={programsList} currentProgramId={programaId} />
      </div>

      <RelatorioTabs />

      {tab === "impacto" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total de Coletas"
            value={formattedColetas}
            icon={MdRecycling}
            description="Coletas registradas"
          />
          <MetricCard
            title="Total de Pontos"
            value={`${formattedPontos} pts`}
            icon={MdStars}
            description="Pontos acumulados"
          />
          <MetricCard
            title="Imóveis Participantes"
            value={formattedImoveis}
            icon={MdHome}
            description="Imóveis com coletas"
          />
          <MetricCard
            title="Descontos Gerados"
            value={formattedDesconto}
            icon={MdCardGiftcard}
            description="Soma dos descontos"
          />
        </div>
      )}

      {tab === "ranking" &&
        (rankingList.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto rounded-lg border border-border bg-white">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
                    <th className="px-4 py-3 w-16">Posição</th>
                    <th className="px-4 py-3">Inscrição</th>
                    <th className="px-4 py-3">Titular</th>
                    <th className="px-4 py-3 text-right">Pontos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rankingList.map((item, index) => (
                    <tr
                      key={item.imovel__inscricao}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="px-4 py-3 font-semibold text-[#116F51]">
                        {pageOffset + index + 1}º
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {item.imovel__inscricao}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {item.imovel__titular__nome || "-"}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        {numberFormatter.format(
                          parseFloat(String(item.pontos || 0)),
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination count={rankingData?.count ?? 0} />
          </>
        ) : (
          <div className="flex items-center justify-center">
            <p className="flex items-center justify-center gap-4 text-gray-500 mt-6">
              Nenhum dado de ranking disponível
            </p>
          </div>
        ))}

      {tab === "participacao" &&
        (participationList.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto rounded-lg border border-border bg-white">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
                    <th className="px-4 py-3">Inscrição</th>
                    <th className="px-4 py-3">Titular</th>
                    <th className="px-4 py-3 text-right">Coletas</th>
                    <th className="px-4 py-3 text-right">Pontos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {participationList.map((item, index) => (
                    <tr
                      key={item.imovel__inscricao}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="px-4 py-3 font-medium">
                        {item.imovel__inscricao}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {item.imovel__titular__nome || "-"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {numberFormatter.format(item.coletas)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        {numberFormatter.format(
                          parseFloat(String(item.pontos || 0)),
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination count={participationData?.count ?? 0} />
          </>
        ) : (
          <div className="flex items-center justify-center">
            <p className="flex items-center justify-center gap-4 text-gray-500 mt-6">
              Nenhum dado de participação disponível
            </p>
          </div>
        ))}
    </div>
  );
}
