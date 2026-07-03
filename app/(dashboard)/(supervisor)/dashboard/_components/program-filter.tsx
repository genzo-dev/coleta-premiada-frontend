"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Programa } from "@/types/entities/programa";

type ProgramFilterProps = {
  programs: Programa[];
  currentProgramId?: string;
};

// Função para renderizar o filtro de programas
export default function ProgramFilter({
  programs,
  currentProgramId,
}: ProgramFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Função para lidar com a mudança de seleção no filtro
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("programa_id", value);
    } else {
      params.delete("programa_id");
    }

    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-1 w-full max-w-xs">
      <label
        htmlFor="program-select"
        className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
      >
        Filtrar por Programa
      </label>
      <select
        id="program-select"
        value={currentProgramId || ""}
        onChange={handleChange}
        className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-emerald-600 focus:outline-none transition shadow-xs"
      >
        <option value="">Todos os Programas</option>
        {programs.map((program) => (
          <option key={program.id} value={program.id.toString()}>
            {program.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
