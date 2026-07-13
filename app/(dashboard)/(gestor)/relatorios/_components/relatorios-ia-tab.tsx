"use client";

import { useState, useCallback } from "react";
import { FormCriarRelatorio } from "./form-criar-relatorio";
import { ListaRelatoriosIA } from "./lista-relatorios-ia";
import type { Programa } from "@/types/entities/programa";

type Props = {
  programs: Programa[];
};

export function RelatoriosIATab({ programs }: Props) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreated = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6">
      <FormCriarRelatorio programs={programs} onCreated={handleCreated} />
      <ListaRelatoriosIA refreshTrigger={refreshTrigger} />
    </div>
  );
}
