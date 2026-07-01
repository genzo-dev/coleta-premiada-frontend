"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Filters = {
  data_inicio: string;
  data_fim: string;
};

type ColetasFiltersProps = {
  value: Filters;
  onApply: (filters: Filters) => void;
  onClear: () => void;
};

export function ColetasFilters({ value, onApply, onClear }: ColetasFiltersProps) {
  const [local, setLocal] = useState<Filters>(value);

  const hasActiveFilters = value.data_inicio !== "" || value.data_fim !== "";

  function handleApply() {
    onApply(local);
  }

  function handleClear() {
    setLocal({ data_inicio: "", data_fim: "" });
    onClear();
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="data_inicio"
          className="text-xs text-muted-foreground font-medium"
        >
          Data início
        </label>
        <Input
          id="data_inicio"
          type="date"
          className="w-40"
          value={local.data_inicio}
          onChange={(e) =>
            setLocal((prev) => ({ ...prev, data_inicio: e.target.value }))
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="data_fim"
          className="text-xs text-muted-foreground font-medium"
        >
          Data fim
        </label>
        <Input
          id="data_fim"
          type="date"
          className="w-40"
          value={local.data_fim}
          onChange={(e) =>
            setLocal((prev) => ({ ...prev, data_fim: e.target.value }))
          }
        />
      </div>

      <Button
        type="button"
        className="bg-[#116F51] hover:bg-emerald-800 text-white"
        onClick={handleApply}
      >
        Filtrar
      </Button>

      {hasActiveFilters && (
        <Button type="button" variant="outline" onClick={handleClear}>
          Limpar
        </Button>
      )}
    </div>
  );
}
