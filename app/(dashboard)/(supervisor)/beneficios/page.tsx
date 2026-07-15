import { MdCardGiftcard } from "react-icons/md";
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { Programa } from "@/types/entities/programa";
import type { SaldoBeneficio } from "@/types/entities/relatorios";
import BenefitsFilter from "./_components/benefits-filter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benefícios",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export default async function SupervisorBeneficiosPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const programaId = typeof searchParams.programa_id === "string" ? searchParams.programa_id : undefined;
  const cicloId = typeof searchParams.ciclo === "string" ? searchParams.ciclo : undefined;

  // Busca programas para o filtro
  const programsRes = await apiAuthenticatedRequest<Programa[] | PaginatedResponse<Programa>>(
    "/api/program/programs"
  );
  
  let programsList: Programa[] = [];
  if (programsRes.success) {
    const rawData = programsRes.data;
    if (rawData && typeof rawData === "object") {
      if ("results" in rawData && Array.isArray(rawData.results)) programsList = rawData.results;
      else if (Array.isArray(rawData)) programsList = rawData;
    }
  }

  // Busca benefícios (saldos)
  const urlParams = new URLSearchParams();
  if (programaId) urlParams.set("programa_id", programaId);
  if (cicloId) urlParams.set("ciclo", cicloId);

  const benefitsRes = await apiAuthenticatedRequest<PaginatedResponse<SaldoBeneficio>>(
    `/api/program/benefits?${urlParams.toString()}`
  );

  let benefitsList: SaldoBeneficio[] = [];
  if (benefitsRes.success && benefitsRes.data && "results" in benefitsRes.data) {
    benefitsList = benefitsRes.data.results;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <MdCardGiftcard className="w-6 h-6 text-[#1A5538]" />
            Extrato de Benefícios (IPTU)
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Consulte todos os saldos de desconto gerados por ciclo para os imóveis.
          </p>
        </div>
        <BenefitsFilter programs={programsList} currentProgramId={programaId} currentCicloId={cicloId} />
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              <tr className="border-b border-border">
                <th className="px-6 py-4">ID Imóvel</th>
                <th className="px-6 py-4">ID Programa</th>
                <th className="px-6 py-4">ID Ciclo</th>
                <th className="px-6 py-4">Desconto (%)</th>
                <th className="px-6 py-4">Data de Apuração</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {benefitsList.length > 0 ? (
                benefitsList.map((saldo) => (
                  <tr key={saldo.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      Imóvel #{saldo.imovel}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      Programa #{saldo.programa}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      Ciclo #{saldo.ciclo}
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-700">
                      +{parseFloat(saldo.desconto_percentual).toFixed(2).replace(".", ",")}%
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {format(new Date(saldo.atualizado), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Nenhum extrato de benefício encontrado com os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
