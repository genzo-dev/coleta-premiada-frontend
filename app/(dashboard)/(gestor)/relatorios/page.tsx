import { MdAssessment } from "react-icons/md";
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { Programa } from "@/types/entities/programa";
import type { PaginatedResponse } from "@/types/api/paginated-response";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ParticipationTab } from "./_components/participation-tab";
import { RankingTab } from "./_components/ranking-tab";
import { ImpactTab } from "./_components/impact-tab";
import { TabsNavigation } from "./_components/tabs-navigation";
import { RelatoriosIATab } from "./_components/relatorios-ia-tab";
import ProgramFilter from "@/components/ProgramFilter";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function GestorRelatoriosPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const programaId =
    typeof searchParams.programa_id === "string"
      ? searchParams.programa_id
      : undefined;
  const currentTab =
    typeof searchParams.tab === "string" ? searchParams.tab : "participacao";

  // Busca programas para o filtro global
  const programsRes = await apiAuthenticatedRequest<
    Programa[] | PaginatedResponse<Programa>
  >("/api/program/programs");

  let programsList: Programa[] = [];
  if (programsRes.success) {
    const rawData = programsRes.data;
    if (rawData && typeof rawData === "object") {
      if ("results" in rawData && Array.isArray(rawData.results))
        programsList = rawData.results;
      else if (Array.isArray(rawData)) programsList = rawData;
    }
  }

  const renderTab = () => {
    switch (currentTab) {
      case "ranking":
        return <RankingTab programaId={programaId} />;
      case "impacto":
        return <ImpactTab programaId={programaId} />;
      case "ia":
        return <RelatoriosIATab programs={programsList} />;
      case "participacao":
      default:
        return (
          <ParticipationTab
            programaId={programaId}
            searchParams={searchParams}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <MdAssessment className="w-6 h-6 text-[#1A5538]" />
            Relatórios e Métricas
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analise a participação, o impacto, o ranking de engajamento e gere
            relatórios narrativos com IA.
          </p>
        </div>
        <ProgramFilter programs={programsList} currentProgramId={programaId} />
      </div>

      <div className="flex flex-col gap-4">
        <TabsNavigation currentTab={currentTab} />

        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden min-h-[400px]">
          <Suspense
            key={`${currentTab}-${programaId || "all"}`}
            fallback={
              <div className="flex items-center justify-center p-20 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              </div>
            }
          >
            {renderTab()}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
