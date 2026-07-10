import { Metadata } from "next";
import { TabelaContestacoes } from "./_components/tabela-contestacoes";

export const metadata: Metadata = {
  title: "Gestão de Contestações",
};

export default function ContestacoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Contestações de Coletas
        </h1>
        <p className="text-sm text-gray-500">
          Analise as divergências relatadas pelos moradores, visualize as evidências e responda.
        </p>
      </div>

      <TabelaContestacoes />
    </div>
  );
}
