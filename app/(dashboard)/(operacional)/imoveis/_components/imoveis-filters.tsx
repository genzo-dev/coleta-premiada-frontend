"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Cidade } from "@/types/entities/cidade";

const selectClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

type ImoveisFiltersProps = {
  cidades: Cidade[];
};

export default function ImoveisFilters({ cidades }: ImoveisFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [bairro, setBairro] = useState(searchParams.get("bairro") ?? "");

  function updateParams(entries: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(entries)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateParams({ search, bairro });
      }}
      className="flex flex-col sm:flex-row gap-3 sm:items-center"
    >
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por inscrição..."
        className="sm:max-w-52"
      />

      <Input
        value={bairro}
        onChange={(e) => setBairro(e.target.value)}
        placeholder="Filtrar por bairro..."
        className="sm:max-w-44"
      />

      <select
        className={`${selectClassName} sm:max-w-44`}
        defaultValue={searchParams.get("cidade") ?? ""}
        onChange={(e) => updateParams({ cidade: e.target.value })}
      >
        <option value="">Todas as cidades</option>
        {cidades.map((cidade) => (
          <option key={cidade.id} value={cidade.nome}>
            {cidade.nome}/{cidade.uf}
          </option>
        ))}
      </select>

      <select
        className={`${selectClassName} sm:max-w-36`}
        defaultValue={searchParams.get("ativo") ?? ""}
        onChange={(e) => updateParams({ ativo: e.target.value })}
      >
        <option value="">Todos os status</option>
        <option value="true">Ativos</option>
        <option value="false">Inativos</option>
      </select>

      <Button type="submit" variant="outline" className="sm:w-fit">
        Buscar
      </Button>
    </form>
  );
}
