import { MdGavel } from "react-icons/md";
import { getDisputes } from "@/lib/disputes/get-disputes";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import Pagination from "@/components/Pagination";
import ContestacoesFilters from "./_components/contestacoes-filters";
import ContestacoesTable from "./_components/contestacoes-table";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function firstParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function AnaliseContestacoesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const status = firstParam(params.status);
  const page = firstParam(params.page);

  const [disputesData, currentUser] = await Promise.all([
    getDisputes({ status, page }),
    getCurrentUser(),
  ]);

  const disputes = disputesData?.results ?? [];
  const canAnalyze =
    currentUser?.perfil === "gestor" || currentUser?.perfil === "gerente_geral";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdGavel className="w-6 h-6 text-[#116F51]" />
          Contestações
        </h1>
      </div>

      <ContestacoesFilters />

      {disputes.length > 0 ? (
        <>
          <ContestacoesTable contestacoes={disputes} canAnalyze={canAnalyze} />
          <Pagination count={disputesData?.count ?? 0} />
        </>
      ) : (
        <div className="flex items-center justify-center">
          <p className="flex items-center justify-center gap-4 text-gray-500 mt-6">
            Nenhuma contestação encontrada
          </p>
        </div>
      )}
    </div>
  );
}
