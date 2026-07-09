export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import {
  MdRecycling,
  MdAssessment,
  MdStars,
  MdHome,
  MdCardGiftcard,
  MdSpaceDashboard,
} from "react-icons/md";
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { Programa } from "@/types/entities/programa";
import type { Dispute } from "@/types/entities/dispute";
import type { ConsolidationHistory } from "@/schemas/programs/consolidation-schema";
import ProgramFilter from "./_components/program-filter";
import ParticipationChart from "./_components/participation-chart";
import AlertsSection from "./_components/alert-section";
import ActiveProgramCard from "./_components/active-program-card";

type ImpactData = {
  total_coletas: number;
  total_pontos: string | number;
  total_imoveis_participantes: number;
  soma_desconto_percentual: string | number;
};

type RankingItem = {
  imovel__inscricao: string;
  imovel__titular__nome: string;
  pontos: string | number;
};

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function MetricCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  description?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 flex items-center justify-between shadow-xs">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#116F51]">
        <Icon size={24} />
      </div>
    </div>
  );
}

export default async function SupervisorDashboardPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  let programaId =
    typeof searchParams.programa_id === "string"
      ? searchParams.programa_id
      : undefined;

  // Primeiro busca a lista de programas para descobrir qual é o ativo caso nenhum tenha sido passado
  const programsRes = await apiAuthenticatedRequest<Programa[] | PaginatedResponse<Programa>>(
    "/api/program/programs"
  );
  
  let programsList: Programa[] = [];
  if (programsRes.success) {
    const rawData = programsRes.data;
    if (rawData && typeof rawData === "object") {
      if ("results" in rawData && Array.isArray(rawData.results)) programsList = rawData.results;
      else if (Array.isArray(rawData)) programsList = rawData;
    }
  }

  const activeProgram = programaId 
    ? programsList.find(p => p.id.toString() === programaId)
    : programsList.find(p => p.ativo) || programsList[0];

  const resolvedProgramaId = activeProgram?.id?.toString();

  const [
    impactRes,
    rankingRes,
    lastConsolidationRes,
    disputesRes,
    participationRes
  ] = await Promise.all([
    apiAuthenticatedRequest<ImpactData>(
      `/api/program/reports/impact${resolvedProgramaId ? `?programa_id=${resolvedProgramaId}` : ""}`
    ),
    apiAuthenticatedRequest<RankingItem[] | PaginatedResponse<RankingItem>>(
      `/api/program/reports/ranking${resolvedProgramaId ? `?programa_id=${resolvedProgramaId}` : ""}`
    ),
    apiAuthenticatedRequest<PaginatedResponse<ConsolidationHistory>>(
      `/api/program/consolidations?page_size=1${resolvedProgramaId ? `&programa=${resolvedProgramaId}` : ""}`
    ),
    apiAuthenticatedRequest<PaginatedResponse<Dispute> | Dispute[]>(
      "/api/collection/disputes?status=aberta" // Typically disputes aren't bound strictly to a program in UI, but could be.
    ),
    apiAuthenticatedRequest<any>(
      `/api/program/reports/collections-by-cycle${resolvedProgramaId ? `?programa_id=${resolvedProgramaId}` : ""}`
    )
  ]);

  let impact: ImpactData = {
    total_coletas: 0,
    total_pontos: 0,
    total_imoveis_participantes: 0,
    soma_desconto_percentual: 0,
  };
  if (impactRes.success && impactRes.data) impact = impactRes.data;

  let rankingList: RankingItem[] = [];
  if (rankingRes.success) {
    const rawData = rankingRes.data;
    if (rawData && typeof rawData === "object") {
      if ("results" in rawData && Array.isArray(rawData.results)) rankingList = rawData.results;
      else if (Array.isArray(rawData)) rankingList = rawData;
    }
  }


  let lastConsolidation: ConsolidationHistory | null = null;
  if (lastConsolidationRes.success && lastConsolidationRes.data?.results?.length) {
    lastConsolidation = lastConsolidationRes.data.results[0];
  }

  let disputesCount = 0;
  if (disputesRes.success) {
    const rawData = disputesRes.data;
    if (rawData && typeof rawData === "object") {
      if ("count" in rawData) disputesCount = rawData.count;
      else if (Array.isArray(rawData)) disputesCount = rawData.length;
    }
  }

  // Participation chart formatting
  let chartData: { ciclo: string; coletas: number }[] = [];
  if (participationRes.success) {
    const data = participationRes.data;
    const rawChartData = Array.isArray(data) ? data : data?.results || [];
    console.log("CHART DATA RAW FOR PROGRAM:", resolvedProgramaId, " -> ", JSON.stringify(rawChartData));
    chartData = rawChartData.map((item: any) => ({
      ciclo: item.ciclo_nome || "—",
      coletas: item.total_coletas || 0
    }));
  }


  const numberFormatter = new Intl.NumberFormat("pt-BR");
  const percentFormatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdSpaceDashboard className="w-6 h-6 text-[#1A5538]" />
          Dashboard do Gestor
        </h1>
        <ProgramFilter programs={programsList} currentProgramId={programaId} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total de Coletas" value={numberFormatter.format(impact.total_coletas)} icon={MdRecycling} description="Coletas registradas" />
        <MetricCard title="Total de Pontos" value={`${numberFormatter.format(Math.round(parseFloat(String(impact.total_pontos || 0))))} pts`} icon={MdStars} description="Pontos acumulados" />
        <MetricCard title="Imóveis Participantes" value={numberFormatter.format(impact.total_imoveis_participantes)} icon={MdHome} description="Imóveis com coletas" />
        <MetricCard title="Descontos Gerados" value={`${percentFormatter.format(parseFloat(String(impact.soma_desconto_percentual || 0)))}%`} icon={MdCardGiftcard} description="Soma dos descontos" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ParticipationChart data={chartData} />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6 h-[640px]">
          <AlertsSection disputesCount={disputesCount} lastConsolidation={lastConsolidation} />
          <ActiveProgramCard program={activeProgram} />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <MdAssessment className="w-5 h-5 text-[#116F51]" />
            Top 10 Imóveis por Pontuação
          </h3>
          <span className="text-xs bg-emerald-50 text-[#116F51] font-semibold px-2.5 py-1 rounded-full">
            Ranking Geral
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
                rankingList.slice(0, 10).map((item, index) => (
                  <tr key={item.imovel__inscricao} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#116F51]">{index + 1}º</td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.imovel__inscricao}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.imovel__titular__nome || "—"}</td>
                    <td className="px-4 py-3 text-right font-bold text-foreground">
                      {numberFormatter.format(parseFloat(String(item.pontos || 0)))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground text-sm">
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
