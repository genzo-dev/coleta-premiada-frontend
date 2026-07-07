"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SaldosPontosFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [imovelId, setImovelId] = useState(searchParams.get("imovel_id") ?? "");
  const [programaId, setProgramaId] = useState(
    searchParams.get("programa_id") ?? "",
  );
  const [ciclo, setCiclo] = useState(searchParams.get("ciclo") ?? "");

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
        updateParams({
          imovel_id: imovelId,
          programa_id: programaId,
          ciclo,
        });
      }}
      className="flex flex-col sm:flex-row gap-3 sm:items-center"
    >
      <Input
        value={imovelId}
        onChange={(e) => setImovelId(e.target.value)}
        placeholder="ID do imóvel..."
        className="sm:max-w-36"
      />

      <Input
        value={programaId}
        onChange={(e) => setProgramaId(e.target.value)}
        placeholder="ID do programa..."
        className="sm:max-w-36"
      />

      <Input
        value={ciclo}
        onChange={(e) => setCiclo(e.target.value)}
        placeholder="Ciclo..."
        className="sm:max-w-36"
      />

      <Button type="submit" variant="outline" className="sm:w-fit">
        Buscar
      </Button>
    </form>
  );
}
