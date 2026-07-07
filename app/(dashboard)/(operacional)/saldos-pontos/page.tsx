import { MdCardGiftcard } from "react-icons/md";
import { getBenefits } from "@/lib/benefits/get-benefits";
import Pagination from "@/components/Pagination";
import SaldosPontosFilters from "./_components/saldos-pontos-filters";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function firstParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function SaldosPontosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const imovel_id = firstParam(params.imovel_id);
  const programa_id = firstParam(params.programa_id);
  const ciclo = firstParam(params.ciclo);
  const page = firstParam(params.page);

  const benefitsData = await getBenefits({
    imovel_id,
    programa_id,
    ciclo,
    page,
  });

  const benefits = benefitsData?.results ?? [];
  const percentFormatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdCardGiftcard className="w-6 h-6 text-[#116F51]" />
          Benefícios
        </h1>
      </div>

      <SaldosPontosFilters />

      {benefits.length > 0 ? (
        <>
          <div className="w-full overflow-x-auto rounded-lg border border-border bg-white">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
                  <th className="px-4 py-3">Imóvel</th>
                  <th className="px-4 py-3">Programa</th>
                  <th className="px-4 py-3">Ciclo</th>
                  <th className="px-4 py-3">Desconto (%)</th>
                  <th className="px-4 py-3">Atualizado em</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {benefits.map((beneficio, index) => (
                  <tr
                    key={beneficio.id}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="px-4 py-3 font-medium">
                      #{beneficio.imovel}
                    </td>
                    <td className="px-4 py-3">
                      {beneficio.programa ? `#${beneficio.programa}` : "-"}
                    </td>
                    <td className="px-4 py-3">{beneficio.ciclo}</td>
                    <td className="px-4 py-3 font-semibold text-(--color-morador-secondary)">
                      {percentFormatter.format(
                        parseFloat(beneficio.desconto_percentual),
                      )}
                      %
                    </td>
                    <td className="px-4 py-3">
                      {new Date(beneficio.atualizado).toLocaleString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination count={benefitsData?.count ?? 0} />
        </>
      ) : (
        <div className="flex items-center justify-center">
          <p className="flex items-center justify-center gap-4 text-gray-500 mt-6">
            Nenhum benefício encontrado
          </p>
        </div>
      )}
    </div>
  );
}
