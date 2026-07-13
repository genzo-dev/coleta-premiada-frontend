"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MdPeople,
  MdOutlineLeaderboard,
  MdInsights,
  MdAutoAwesome,
} from "react-icons/md";

const TABS = [
  { id: "participacao", label: "Participação", icon: MdPeople },
  { id: "ranking", label: "Ranking (Top 50)", icon: MdOutlineLeaderboard },
  { id: "impacto", label: "Impacto Global", icon: MdInsights },
  { id: "ia", label: "Relatórios IA", icon: MdAutoAwesome },
];

export function TabsNavigation({ currentTab }: { currentTab: string }) {
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center gap-2 border-b border-border pb-px overflow-x-auto">
      {TABS.map((tab) => {
        const isActive = currentTab === tab.id;
        const Icon = tab.icon;

        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", tab.id);

        return (
          <Link
            key={tab.id}
            href={`?${params.toString()}`}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              isActive
                ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <Icon
              className={`w-4 h-4 ${isActive ? "text-emerald-600" : ""}`}
            />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
