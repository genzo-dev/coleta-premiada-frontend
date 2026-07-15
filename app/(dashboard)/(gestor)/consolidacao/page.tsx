import { Metadata } from "next";
import { getPrograms } from "@/lib/programs/get-programs";
import { getConsolidations } from "./queries";
import ConsolidationForm from "./_components/ConsolidationForm";
import ConsolidationHistoryTable from "./_components/ConsolidationHistoryTable";

export const metadata: Metadata = {
  title: "Consolidação de IPTU",
  description:
    "Página para executar e visualizar consolidações de descontos de IPTU.",
};

export default async function ConsolidacaoPage() {
  const [programs, history] = await Promise.all([
    getPrograms(),
    getConsolidations(),
  ]);

  const activePrograms = (programs || []).filter((p) => p.ativo);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#116F51]">
          Consolidação de IPTU
        </h1>
      </div>

      <ConsolidationForm programs={activePrograms} />
      <ConsolidationHistoryTable history={history || []} />
    </div>
  );
}
