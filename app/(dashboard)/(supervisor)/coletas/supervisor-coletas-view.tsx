export const dynamic = "force-dynamic";
export const revalidate = 0;

import { buscarColetasGestorAction } from "@/actions/coleta/gestor-coleta-actions";
import { MdRecycling } from "react-icons/md";
import Pagination from "@/app/(dashboard)/imoveis/_components/pagination";
import TabelaColetas from "./_components/tabela-coletas";
import ModalRegistroColeta from "./_components/modal-registro";
import ColetasFilters from "./_components/coletas-filters";
import type { RegistroColeta } from "@/types/entities/registro-coleta";
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { Programa } from "@/types/entities/programa";

type SearchParams = Promise<{
  page?: string;
  programa_id?: string;
  data_inicio?: string;
  data_fim?: string;
}>;

export default async function SupervisorColetasView(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const programa_id = typeof searchParams.programa_id === "string" ? searchParams.programa_id : undefined;
  const data_inicio = typeof searchParams.data_inicio === "string" ? searchParams.data_inicio : undefined;
  const data_fim = typeof searchParams.data_fim === "string" ? searchParams.data_fim : undefined;

  const [response, programsRes] = await Promise.all([
    buscarColetasGestorAction({ page, limit: 20, programa_id, data_inicio, data_fim }),
    apiAuthenticatedRequest<Programa[] | { results: Programa[] }>("/api/program/programs")
  ]);

  let programsList: Programa[] = [];
  if (programsRes.success && programsRes.data) {
    if (Array.isArray(programsRes.data)) {
      programsList = programsRes.data;
    } else if ("results" in programsRes.data) {
      programsList = programsRes.data.results;
    }
  }

  let coletasList: RegistroColeta[] = [];
  let totalCount = 0;
  let errorMsg = "";

  if (response.success && response.data) {
    coletasList = response.data.results;
    totalCount = response.data.count;
  } else {
    errorMsg = response.error || "Não foi possível carregar a lista de coletas.";
  }

  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <MdRecycling className="w-6 h-6 text-[#1A5538]" />
            Gestão de Coletas
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Histórico consolidado de coletas e lançamento manual.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ModalRegistroColeta />
        </div>
      </div>

      <ColetasFilters
        programs={programsList}
        initialProgramId={programa_id}
        initialDataInicio={data_inicio}
        initialDataFim={data_fim}
      />

      {errorMsg ? (
        <p className="text-sm text-destructive">{errorMsg}</p>
      ) : (
        <>
          <TabelaColetas coletas={coletasList} />
          
          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} />
          )}
        </>
      )}
    </div>
  );
}
