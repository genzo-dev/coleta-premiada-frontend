"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Programa } from "@/types/entities/programa";

type ColetasFiltersProps = {
  programs: Programa[];
  initialProgramId?: string;
  initialDataInicio?: string;
  initialDataFim?: string;
};

export default function ColetasFilters({
  programs,
  initialProgramId = "",
  initialDataInicio = "",
  initialDataFim = "",
}: ColetasFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [programId, setProgramId] = useState(initialProgramId);
  const [dataInicio, setDataInicio] = useState(initialDataInicio);
  const [dataFim, setDataFim] = useState(initialDataFim);

  function handleFilter(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (programId) {
      params.set("programa_id", programId);
    } else {
      params.delete("programa_id");
    }

    if (dataInicio) {
      params.set("data_inicio", dataInicio);
    } else {
      params.delete("data_inicio");
    }

    if (dataFim) {
      params.set("data_fim", dataFim);
    } else {
      params.delete("data_fim");
    }

    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  }

  function handleClear() {
    setProgramId("");
    setDataInicio("");
    setDataFim("");

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.delete("programa_id");
    params.delete("data_inicio");
    params.delete("data_fim");

    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  }

  const hasActiveFilters =
    initialProgramId !== "" ||
    initialDataInicio !== "" ||
    initialDataFim !== "";

  return (
    <form
      onSubmit={handleFilter}
      className="flex flex-wrap items-end gap-4 bg-card border border-border rounded-xl p-5 shadow-xs"
    >
      <div className="flex flex-col gap-1 w-full sm:w-56">
        <label
          htmlFor="program-select"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
        >
          Filtrar por Programa
        </label>
        <select
          id="program-select"
          value={programId}
          onChange={(e) => setProgramId(e.target.value)}
          className="h-8 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-1 text-sm text-foreground focus:border-emerald-600 focus:outline-none transition"
        >
          <option value="">Todos</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id.toString()}>
              {program.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 w-full sm:w-44">
        <label
          htmlFor="data-inicio"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
        >
          Data Início
        </label>
        <Input
          id="data-inicio"
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          className="bg-background"
        />
      </div>

      <div className="flex flex-col gap-1 w-full sm:w-44">
        <label
          htmlFor="data-fim"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
        >
          Data Fim
        </label>
        <Input
          id="data-fim"
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          className="bg-background"
        />
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <Button
          type="submit"
          className="bg-[#116F51] hover:bg-emerald-800 text-white font-semibold px-5"
        >
          Filtrar
        </Button>
        {hasActiveFilters && (
          <Button type="button" variant="outline" onClick={handleClear}>
            Limpar
          </Button>
        )}
      </div>
    </form>
  );
}
