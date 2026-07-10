"use client";

// NOTA: Este arquivo era originalmente "page.tsx", mas foi renomeado para "morador-coletas-view.tsx"
// para evitar conflito de rota duplicada com a página de coletas do supervisor no Next.js.
// A renderização real é coordenada dinamicamente em app/(dashboard)/coletas/page.tsx com base no perfil do usuário.

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { MdRecycling } from "react-icons/md";
import { buscarColetasAction } from "@/actions/coleta/buscar-coletas-action";
import type { ListaColetasMoradorResponse } from "@/types/entities/coleta-microservico";
import { ColetasFilters } from "./_components/coletas-filters";
import { ColetasTable } from "./_components/coletas-table";
import { ColetasPagination } from "./_components/coletas-pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buscarContestacoesMoradorAction } from "@/actions/contestacao/morador-contestacao-actions";
import { MoradorContestacoesTable } from "./_components/morador-contestacoes-table";
import type { Contestacao } from "@/types/entities/contestacao";

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

  const [contestacoes, setContestacoes] = useState<Contestacao[]>([]);
  const [loadingContestacoes, setLoadingContestacoes] = useState(true);

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

  async function loadContestacoes() {
    setLoadingContestacoes(true);
    const result = await buscarContestacoesMoradorAction({ limit: 100 });
    if (result.success && result.data) {
      setContestacoes(result.data.results || []);
    }
    setLoadingContestacoes(false);
  }

  useEffect(() => {
    // TODO: refactor - avoiding re-render issue
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load(page, filters);
  }, [page, filters]);

  useEffect(() => {
    loadContestacoes();
  }, []);

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
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdRecycling className="w-6 h-6" />
          Gestão de Coletas
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe o seu histórico de entregas e contestações abertas.
        </p>
      </div>

      <Tabs defaultValue="historico" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="historico">Histórico de Coletas</TabsTrigger>
          <TabsTrigger value="contestacoes">Minhas Contestações</TabsTrigger>
        </TabsList>

        <TabsContent value="historico" className="mt-6 flex flex-col gap-6">
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
        </TabsContent>

        <TabsContent value="contestacoes" className="mt-6">
          {loadingContestacoes ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Carregando contestações...
            </div>
          ) : (
            <MoradorContestacoesTable contestacoes={contestacoes} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
