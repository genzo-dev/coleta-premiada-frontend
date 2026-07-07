export const dynamic = "force-dynamic";
export const revalidate = 0;

// NOTA: Este arquivo foi estruturado como "supervisor-coletas-view.tsx" (ao invés de page.tsx)
// para evitar conflito de rota duplicada com a rota de coletas do morador no Next.js (Turbopack).
// A página principal em app/(dashboard)/coletas/page.tsx direciona o fluxo para cá se o perfil for supervisor/gestor.

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { apiCollectionAuthenticatedRequest } from "@/lib/api-collection-authenticated-request";
import type { Programa } from "@/types/entities/programa";
import type { ConstantePontuacao } from "@/types/entities/constante-pontuacao";
import ColetasFilters from "./_components/coletas-filters";
import Pagination from "../../imoveis/_components/pagination";
import { MdRecycling } from "react-icons/md";

type CollectionItem = {
  id: number;
  id_microservico: string;
  imovel: number;
  imovel_inscricao: string;
  titular_nome: string;
  programa: number | null;
  programa_nome: string | null;
  pontuacao: string | number;
  data_hora_coleta: string;
  peso_kg: string | number;
};

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type SearchParams = Promise<{
  programa_id?: string;
  data_inicio?: string;
  data_fim?: string;
  page?: string;
}>;

function formatDateTime(iso: string) {
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

export default async function SupervisorColetasPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const programId =
    typeof searchParams.programa_id === "string"
      ? searchParams.programa_id
      : "";
  const dataInicio =
    typeof searchParams.data_inicio === "string"
      ? searchParams.data_inicio
      : "";
  const dataFim =
    typeof searchParams.data_fim === "string" ? searchParams.data_fim : "";
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;

  // Primeiro buscamos a lista de programas e constante de pontuação para podermos cruzar dados no frontend
  const [programsRes, scoringRes] = await Promise.all([
    apiAuthenticatedRequest<Programa[] | PaginatedResponse<Programa>>(
      "/api/program/programs"
    ),
    apiAuthenticatedRequest<ConstantePontuacao>(
      "/api/program/scoring-constant"
    ),
  ]);

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

  let pontosPorKg = 1.0;
  if (scoringRes.success && scoringRes.data) {
    pontosPorKg = parseFloat(String(scoringRes.data.pontos_por_kg || 1.0));
  }

  // Interseção de datas do programa selecionado com filtros manuais
  let finalDataInicio = dataInicio;
  let finalDataFim = dataFim;

  if (programId) {
    const selectedProg = programsList.find((p) => String(p.id) === programId);
    if (selectedProg) {
      if (selectedProg.data_inicio) {
        if (!finalDataInicio || new Date(selectedProg.data_inicio) > new Date(finalDataInicio)) {
          finalDataInicio = selectedProg.data_inicio;
        }
      }
      if (selectedProg.data_fim) {
        if (!finalDataFim || new Date(selectedProg.data_fim) < new Date(finalDataFim)) {
          finalDataFim = selectedProg.data_fim;
        }
      }
    }
  }

  // Cria query params para o microsserviço
  const queryParams = new URLSearchParams();
  queryParams.set("page", page.toString());
  if (finalDataInicio) queryParams.set("data_inicio", finalDataInicio);
  if (finalDataFim) queryParams.set("data_fim", finalDataFim);

  // Carrega coletas do microsserviço
  const collectionsRes = await apiCollectionAuthenticatedRequest<PaginatedResponse<CollectionItem>>(
    `/api/supervisor/coletas?${queryParams.toString()}`
  );

  let collectionsList: CollectionItem[] = [];
  let totalCount = 0;
  let errorMsg = "";

  if (collectionsRes.success) {
    const rawData = collectionsRes.data;
    if (rawData && typeof rawData === "object") {
      if ("results" in rawData && Array.isArray(rawData.results)) {
        collectionsList = rawData.results;
        totalCount = rawData.count;
      } else if (Array.isArray(rawData)) {
        collectionsList = rawData;
        totalCount = rawData.length;
      }
    }

    // Calcula os pontos no frontend multiplicando o peso pela constante e descobre o programa por data
    collectionsList = collectionsList.map((coleta) => {
      const peso = parseFloat(String(coleta.peso_kg || 0));
      const dataHoraStr = coleta.data_hora_coleta;
      
      let progNome = "—";
      if (dataHoraStr) {
        try {
          const date = new Date(dataHoraStr);
          const prog = programsList.find((p) => {
            const start = p.data_inicio ? new Date(p.data_inicio) : null;
            const end = p.data_fim ? new Date(p.data_fim) : null;
            return (!start || date >= start) && (!end || date <= end);
          });
          if (prog) progNome = prog.nome;
        } catch {}
      }

      return {
        ...coleta,
        pontuacao: peso * pontosPorKg,
        programa_nome: progNome,
      };
    });
  } else {
    errorMsg =
      collectionsRes.errors?.[0] ||
      "Não foi possível carregar o histórico de coletas.";
  }

  const itemsPerPage = 20; // DRF Standard pagination size
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const numberFormatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdRecycling className="w-6 h-6 text-[#1A5538]" />
          Histórico Geral de Coletas
        </h1>
        <p className="text-sm text-muted-foreground">
          Histórico consolidado de todas as coletas seletivas realizadas.
        </p>
      </div>

      <ColetasFilters
        programs={programsList}
        initialProgramId={programId}
        initialDataInicio={dataInicio}
        initialDataFim={dataFim}
      />

      {errorMsg ? (
        <p className="text-sm text-destructive">{errorMsg}</p>
      ) : (
        <>
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
                    <th className="px-6 py-4">Data e hora</th>
                    <th className="px-6 py-4">Imóvel (Inscrição)</th>
                    <th className="px-6 py-4">Titular</th>
                    <th className="px-6 py-4 text-right">Peso (kg)</th>
                    <th className="px-6 py-4 text-right">Pontuação</th>
                    <th className="px-6 py-4">Programa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {collectionsList.length > 0 ? (
                    collectionsList.map((coleta) => {
                      return (
                        <tr
                          key={coleta.id}
                          className="hover:bg-muted/20 transition-colors"
                        >
                          <td className="px-6 py-4 text-foreground font-medium">
                            {formatDateTime(coleta.data_hora_coleta)}
                          </td>
                          <td className="px-6 py-4 text-foreground font-semibold">
                            {coleta.imovel_inscricao || "—"}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {coleta.titular_nome || "—"}
                          </td>
                          <td className="px-6 py-4 text-right text-foreground font-medium">
                            {numberFormatter.format(
                              parseFloat(String(coleta.peso_kg || 0))
                            )}
                          </td>
                          <td className="px-6 py-4 text-right text-foreground font-bold">
                            {parseFloat(String(coleta.pontuacao || 0)).toFixed(
                              2
                            )}{" "}
                            pts
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-medium">
                            {coleta.programa_nome || "—"}
                          </td>
                        </tr>
                      );
                    })
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

          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} />
          )}
        </>
      )}
    </div>
  );
}
