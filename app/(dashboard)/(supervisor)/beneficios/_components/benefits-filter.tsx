"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Programa } from "@/types/entities/programa";

type BenefitsFilterProps = {
  programs: Programa[];
  currentProgramId?: string;
  currentCicloId?: string;
};

export default function BenefitsFilter({
  programs,
  currentProgramId,
  currentCicloId,
}: BenefitsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleProgramChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("programa_id", value);
    else params.delete("programa_id");
    
    // reset ciclo on program change
    params.delete("ciclo");

    router.push(`${pathname}?${params.toString()}`);
  }

  function handleCicloChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("ciclo", value);
    else params.delete("ciclo");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col sm:flex-row items-end gap-3 w-full max-w-md">
      <div className="flex flex-col gap-1 w-full flex-1">
        <label
          htmlFor="program-select"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
        >
          Programa
        </label>
        <select
          id="program-select"
          value={currentProgramId || ""}
          onChange={handleProgramChange}
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-emerald-600 focus:outline-none transition shadow-xs"
        >
          <option value="">Todos</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id.toString()}>
              {program.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 w-full flex-1">
        <label
          htmlFor="ciclo-input"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
        >
          Ciclo (ID)
        </label>
        <input
          type="number"
          id="ciclo-input"
          value={currentCicloId || ""}
          onChange={handleCicloChange}
          placeholder="Ex: 5"
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-emerald-600 focus:outline-none transition shadow-xs"
        />
      </div>
    </div>
  );
}
