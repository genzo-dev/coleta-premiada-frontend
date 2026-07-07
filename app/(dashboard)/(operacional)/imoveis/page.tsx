import { MdApartment } from "react-icons/md";
import { getProperties } from "@/lib/properties/get-properties";
import { getCidades } from "@/lib/cidades/get-cidades";
import Pagination from "@/components/Pagination";
import ImoveisFilters from "./_components/imoveis-filters";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function firstParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const bairro = firstParam(params.bairro);
  const cidade = firstParam(params.cidade);
  const ativo = firstParam(params.ativo);
  const search = firstParam(params.search);
  const page = firstParam(params.page);

  const [propertiesData, cidades] = await Promise.all([
    getProperties({ bairro, cidade, ativo, search, page }),
    getCidades(),
  ]);

  const properties = propertiesData?.results ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdApartment className="w-6 h-6 text-[#116F51]" />
          Imóveis
        </h1>
      </div>

      <ImoveisFilters cidades={cidades ?? []} />

      {properties.length > 0 ? (
        <>
          <div className="w-full overflow-x-auto rounded-lg border border-border bg-white">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
                  <th className="px-4 py-3">Inscrição</th>
                  <th className="px-4 py-3">Endereço</th>
                  <th className="px-4 py-3">Bairro</th>
                  <th className="px-4 py-3">Cidade</th>
                  <th className="px-4 py-3">Nº Moradores</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Adesão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {properties.map((imovel, index) => (
                  <tr
                    key={imovel.id}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {imovel.inscricao}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {imovel.logradouro}, {imovel.numero}
                      {imovel.complemento ? ` - ${imovel.complemento}` : ""}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {imovel.bairro}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {imovel.cidade}/{imovel.estado}
                    </td>
                    <td className="px-4 py-3">{imovel.num_moradores}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          imovel.ativo
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {imovel.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(imovel.data_adesao).toLocaleDateString(
                        "pt-BR",
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination count={propertiesData?.count ?? 0} />
        </>
      ) : (
        <div className="flex items-center justify-center">
          <p className="flex items-center justify-center gap-4 text-gray-500 mt-6">
            Nenhum imóvel encontrado
          </p>
        </div>
      )}
    </div>
  );
}
