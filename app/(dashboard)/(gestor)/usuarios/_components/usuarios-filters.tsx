"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const selectClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export default function UsuariosFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateParam("search", search);
      }}
      className="flex flex-col sm:flex-row gap-3 sm:items-center"
    >
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por nome, e-mail ou CPF..."
        className="sm:max-w-64"
      />

      <select
        className={`${selectClassName} sm:max-w-44`}
        defaultValue={searchParams.get("perfil") ?? ""}
        onChange={(e) => updateParam("perfil", e.target.value)}
      >
        <option value="">Todos os perfis</option>
        <option value="morador">Morador</option>
        <option value="supervisor">Supervisor</option>
        <option value="gestor">Gestor</option>
        <option value="gerente_geral">Gerente Geral</option>
      </select>

      <select
        className={`${selectClassName} sm:max-w-36`}
        defaultValue={searchParams.get("ativo") ?? ""}
        onChange={(e) => updateParam("ativo", e.target.value)}
      >
        <option value="">Todos os status</option>
        <option value="true">Ativos</option>
        <option value="false">Inativos</option>
      </select>

      <Button
        type="submit"
        variant="outline"
        className="sm:w-fit"
      >
        Buscar
      </Button>
    </form>
  );
}
