"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TABS = [
  { value: "impacto", label: "Impacto" },
  { value: "ranking", label: "Ranking" },
  { value: "participacao", label: "Participação" },
];

export default function RelatorioTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") ?? "impacto";

  function goToTab(tab: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 border-b border-border">
      {TABS.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => goToTab(t.value)}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            currentTab === t.value
              ? "border-[#116F51] text-[#116F51]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
