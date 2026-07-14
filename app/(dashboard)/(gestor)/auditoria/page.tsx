"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MdSecurity } from "react-icons/md";
import { Loader2 } from "lucide-react";
import {
  getAuditoriaDataAction,
  GetAuditoriaDataResult,
} from "@/actions/auditoria/get-auditoria-data-action";
import Pagination from "@/components/Pagination";
import AuditoriaFilters from "./_components/auditoria-filters";
import AuditoriaTable from "./_components/auditoria-table";
import MsEventosTable from "./_components/ms-eventos-table";
import ExportCsvButton from "./_components/export-csv-button";

export default function AuditoriaPage() {
  const AUDIT_PAGE_SIZE = "11";

  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GetAuditoriaDataResult | null>(null);

  const fonte = searchParams.get("fonte") === "ms" ? "ms" : "core";

  const paramsString = searchParams ? searchParams.toString() : "";

  useEffect(() => {
    let aborted = false;

    async function load() {
      if (!aborted) setLoading(true);

      try {
        const result = await getAuditoriaDataAction({
          fonte,
          // Core params
          usuario_id: searchParams.get("usuario_id") ?? undefined,
          tabela: searchParams.get("tabela") ?? undefined,
          operacao: searchParams.get("operacao") ?? undefined,
          objeto_id: searchParams.get("objeto_id") ?? undefined,
          cidade: searchParams.get("cidade") ?? undefined,
          // MS params
          coletor_id: searchParams.get("coletor_id") ?? undefined,
          nivel: searchParams.get("nivel") ?? undefined,
          evento: searchParams.get("evento") ?? undefined,
          // Shared
          data_inicio: searchParams.get("data_inicio") ?? undefined,
          data_fim: searchParams.get("data_fim") ?? undefined,
          page: searchParams.get("page") ?? undefined,
        });

        if (!aborted) {
          setData(result);
        }
      } catch (err) {
        if (!aborted) {
          setData(null);
        }
      } finally {
        if (!aborted) setLoading(false);
      }
    }

    load();

    return () => {
      aborted = true;
    };
  }, [paramsString, fonte]);

  const isEmpty =
    data &&
    (fonte === "ms" ? data.msEventos.length === 0 : data.logs.length === 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdSecurity className="w-6 h-6 text-[#116F51]" />
          Auditoria
        </h1>
        {fonte === "core" && <ExportCsvButton />}
      </div>

      <AuditoriaFilters
        cidades={data?.isGerenteGeral ? (data.cidades ?? []) : undefined}
      />

      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Carregando...
        </div>
      )}

      {!loading && data && !isEmpty && fonte === "core" && (
        <div className="flex flex-1 min-h-0 flex-col">
          <>
            <AuditoriaTable
              logs={data.logs}
              isGerenteGeral={data.isGerenteGeral}
            />
          </>
          <div className="mt-4">
            <Pagination count={data.count} pageSize={Number(AUDIT_PAGE_SIZE)} />
          </div>
        </div>
      )}

      {!loading && data && !isEmpty && fonte === "ms" && (
        <div className="flex flex-1 min-h-0 flex-col">
          <>
            <MsEventosTable eventos={data.msEventos} />
          </>
          <div className="mt-4">
            <Pagination count={data.count} pageSize={Number(AUDIT_PAGE_SIZE)} />
          </div>
        </div>
      )}

      {!loading && isEmpty && (
        <div className="flex items-center justify-center">
          <p className="flex items-center justify-center gap-4 text-gray-500 mt-6">
            Nenhum evento de auditoria encontrado
          </p>
        </div>
      )}
    </div>
  );
}
