"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const selectClassName =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export default function ContestacoesFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
      <select
        className={`${selectClassName} sm:max-w-48`}
        defaultValue={searchParams.get("status") ?? ""}
        onChange={(e) => updateParams({ status: e.target.value })}
      >
        <option value="">Todos os status</option>
        <option value="aberta">Aberta</option>
        <option value="em_analise">Em análise</option>
        <option value="aceita">Aceita</option>
        <option value="negada">Negada</option>
      </select>
    </div>
  );
}
