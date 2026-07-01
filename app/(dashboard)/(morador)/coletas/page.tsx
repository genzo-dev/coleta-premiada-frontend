"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { MdRecycling } from "react-icons/md";
import { buscarColetasAction } from "@/actions/coleta/buscar-coletas-action";
import type { ListaColetasMoradorResponse } from "@/types/entities/coleta-microservico";
import { ColetasFilters } from "./_components/coletas-filters";
import { ColetasTable } from "./_components/coletas-table";
import { ColetasPagination } from "./_components/coletas-pagination";

type Filters = {
  data_inicio: string;
  data_fim: string;
};

export default function ColetasMoradorPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    data_inicio: "",
    data_fim: "",
  });
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [data, setData] = useState<ListaColetasMoradorResponse | null>(null);

  async function load(p: number, f: Filters) {
    setLoading(true);
    setFetchError(null);

    const result = await buscarColetasAction({
      page: p,
      data_inicio: f.data_inicio || undefined,
      data_fim: f.data_fim || undefined,
    });

    if (result.success) {
      setData(result.data);
    } else {
      setFetchError(result.error);
    }

    setLoading(false);
  }

  useEffect(() => {
    load(page, filters);
  }, [page, filters]);

  function handleApplyFilters(newFilters: Filters) {
    setPage(1);
    setFilters(newFilters);
  }

  function handleClearFilters() {
    setPage(1);
    setFilters({ data_inicio: "", data_fim: "" });
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        <MdRecycling className="w-6 h-6" />
        Histórico de Coletas
      </h1>

      <ColetasFilters
        value={filters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Carregando...
        </div>
      )}

      {!loading && fetchError && (
        <p className="text-sm text-destructive">{fetchError}</p>
      )}

      {!loading && !fetchError && data && (
        <>
          <p className="text-xs text-muted-foreground">
            {data.total}{" "}
            {data.total === 1 ? "coleta encontrada" : "coletas encontradas"}
          </p>
          <ColetasTable coletas={data.coletas} />
          {data.total_pages > 1 && (
            <ColetasPagination
              currentPage={data.page}
              totalPages={data.total_pages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
