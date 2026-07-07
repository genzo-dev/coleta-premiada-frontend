import { MdRecycling } from "react-icons/md";
import { getCollections } from "@/lib/collections/get-collections";
import Pagination from "@/components/Pagination";
import ColetasRegistradasFilters from "./_components/coletas-registradas-filters";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function firstParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function ColetasRegistradasPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const imovel_id = firstParam(params.imovel_id);
  const programa_id = firstParam(params.programa_id);
  const data_inicio = firstParam(params.data_inicio);
  const data_fim = firstParam(params.data_fim);
  const page = firstParam(params.page);

  const collectionsData = await getCollections({
    imovel_id,
    programa_id,
    data_inicio,
    data_fim,
    page,
  });

  const collections = collectionsData?.results ?? [];
  const numberFormatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdRecycling className="w-6 h-6 text-[#116F51]" />
          Coletas
        </h1>
      </div>

      <ColetasRegistradasFilters />

      {collections.length > 0 ? (
        <>
          <div className="w-full overflow-x-auto rounded-lg border border-border bg-white">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
                  <th className="px-4 py-3">ID Microsserviço</th>
                  <th className="px-4 py-3">Imóvel</th>
                  <th className="px-4 py-3">Programa</th>
                  <th className="px-4 py-3">Pontuação</th>
                  <th className="px-4 py-3">Peso (kg)</th>
                  <th className="px-4 py-3">Data da Coleta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {collections.map((coleta, index) => (
                  <tr
                    key={coleta.id}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="px-4 py-3 font-medium whitespace-nowrap text-gray-600">
                      {coleta.id_microservico}
                    </td>
                    <td className="px-4 py-3">#{coleta.imovel}</td>
                    <td className="px-4 py-3">
                      {coleta.programa ? `#${coleta.programa}` : "-"}
                    </td>
                    <td className="px-4 py-3 font-semibold text-(--color-morador-secondary)">
                      {numberFormatter.format(parseFloat(coleta.pontuacao))}
                    </td>
                    <td className="px-4 py-3">
                      {numberFormatter.format(parseFloat(coleta.peso_kg))}
                    </td>
                    <td className="px-4 py-3">
                      {coleta.data_hora_coleta
                        ? new Date(coleta.data_hora_coleta).toLocaleString(
                            "pt-BR",
                          )
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination count={collectionsData?.count ?? 0} />
        </>
      ) : (
        <div className="flex items-center justify-center">
          <p className="flex items-center justify-center gap-4 text-gray-500 mt-6">
            Nenhuma coleta encontrada
          </p>
        </div>
      )}
    </div>
  );
}
