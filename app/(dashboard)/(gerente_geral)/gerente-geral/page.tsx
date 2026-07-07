export const dynamic = "force-dynamic";
export const revalidate = 0;

import {
  MdRecycling,
  MdStars,
  MdHome,
  MdCardGiftcard,
  MdSpaceDashboard,
} from "react-icons/md";
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { getImpactReport, ImpactData } from "@/lib/reports/get-impact-report";
import { getRankingReport, RankingItem } from "@/lib/reports/get-ranking-report";
import type { PaginatedResponse } from "@/types/api/paginated-response";
import type { Programa } from "@/types/entities/programa";
import ProgramFilter from "@/components/ProgramFilter";
import MetricCard from "@/components/MetricCard";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function GerenteGeralDashboardPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const programaId =
    typeof searchParams.programa_id === "string"
      ? searchParams.programa_id
      : undefined;

  // Realiza as requisições à API em paralelo. Os relatórios já retornam
  // agregados do sistema inteiro para o gerente_geral, sem filtro de cidade.
  const [impactData, rankingData, programsRes] = await Promise.all([
    getImpactReport(programaId),
    getRankingReport(programaId),
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdSpaceDashboard className="w-6 h-6 text-[#1A5538]" />
          Dashboard Geral
        </h1>

        <ProgramFilter programs={programsList} currentProgramId={programaId} />
      </div>

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

      <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <MdStars className="w-5 h-5 text-[#116F51]" />
            Top 5 Imóveis por Pontuação
          </h3>
          <span className="text-xs bg-emerald-50 text-[#116F51] font-semibold px-2.5 py-1 rounded-full">
            Ranking
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
                <th className="px-4 py-3 w-16">Posição</th>
                <th className="px-4 py-3">Inscrição</th>
                <th className="px-4 py-3">Titular</th>
                <th className="px-4 py-3 text-right">Pontos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rankingList.length > 0 ? (
                rankingList.slice(0, 5).map((item, index) => (
                  <tr
                    key={item.imovel__inscricao}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-[#116F51]">
                      {index + 1}º
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {item.imovel__inscricao}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {item.imovel__titular__nome || "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-foreground">
                      {numberFormatter.format(
                        parseFloat(String(item.pontos || 0)),
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-muted-foreground text-sm"
                  >
                    Nenhum dado de ranking disponível.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
