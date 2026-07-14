import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { ParticipationItem } from "@/types/entities/relatorios";
import Link from "next/link";
import { MdPeople } from "react-icons/md";
import { ChevronUp, ChevronDown } from "lucide-react";

type SearchParams = { [key: string]: string | string[] | undefined };

function SortIcon({
  colKey,
  sortKey,
  sortDir,
}: {
  colKey: string;
  sortKey: string;
  sortDir: "asc" | "desc";
}) {
  if (sortKey !== colKey) return null;
  return sortDir === "asc" ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />;
}

export async function ParticipationTab({ 
  programaId, 
  searchParams 
}: { 
  programaId?: string,
  searchParams: SearchParams 
}) {
  const urlParams = new URLSearchParams();
  if (programaId) urlParams.set("programa_id", programaId);
  
  const response = await apiAuthenticatedRequest<ParticipationItem[] | { results: ParticipationItem[] }>(
    `/api/program/reports/participation?${urlParams.toString()}`
  );

  let dataList: ParticipationItem[] = [];
  if (response.success && response.data) {
    const rawData = response.data;
    if ("results" in rawData && Array.isArray(rawData.results)) dataList = rawData.results;
    else if (Array.isArray(rawData)) dataList = rawData;
  }

  // Handle Client-Side like sorting in Server Component by reading searchParams
  const sortKey = (searchParams.sort as string) || "pontos";
  const sortDir = (searchParams.dir as "asc" | "desc") || "desc";

  dataList.sort((a, b) => {
    let aVal: string | number = a[sortKey as keyof ParticipationItem];
    let bVal: string | number = b[sortKey as keyof ParticipationItem];

    if (sortKey === "pontos") {
      aVal = parseFloat(String(aVal || 0));
      bVal = parseFloat(String(bVal || 0));
    }
    
    if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const getSortLink = (key: string) => {
    const nextDir = sortKey === key && sortDir === "desc" ? "asc" : "desc";
    const params: Record<string, string> = {};
    for (const [k, v] of Object.entries(searchParams)) {
      if (typeof v === "string") params[k] = v;
    }
    params.sort = key;
    params.dir = nextDir;
    return `?${new URLSearchParams(params).toString()}`;
  };

  const numberFormatter = new Intl.NumberFormat("pt-BR");

  return (
    <div className="p-0 sm:p-6">
      <div className="p-6 sm:p-0 mb-4 sm:mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MdPeople className="w-5 h-5 text-emerald-600" />
          Relação de Participantes
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Histórico e engajamento dos moradores no programa. Clique nos cabeçalhos para ordenar.
        </p>
      </div>

      <div className="overflow-x-auto border-t sm:border border-border sm:rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <tr className="border-b border-border">
              <th className="px-6 py-4">
                <Link href={getSortLink("imovel__inscricao")} className="flex items-center hover:text-emerald-700 transition-colors">
                  Inscrição <SortIcon colKey="imovel__inscricao" sortKey={sortKey} sortDir={sortDir} />
                </Link>
              </th>
              <th className="px-6 py-4">
                <Link href={getSortLink("imovel__titular__nome")} className="flex items-center hover:text-emerald-700 transition-colors">
                  Titular <SortIcon colKey="imovel__titular__nome" sortKey={sortKey} sortDir={sortDir} />
                </Link>
              </th>
              <th className="px-6 py-4 text-right">
                <Link href={getSortLink("coletas")} className="flex items-center justify-end hover:text-emerald-700 transition-colors">
                  Nº Coletas <SortIcon colKey="coletas" sortKey={sortKey} sortDir={sortDir} />
                </Link>
              </th>
              <th className="px-6 py-4 text-right">
                <Link href={getSortLink("pontos")} className="flex items-center justify-end hover:text-emerald-700 transition-colors">
                  Total Pontos <SortIcon colKey="pontos" sortKey={sortKey} sortDir={sortDir} />
                </Link>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {dataList.length > 0 ? (
              dataList.map((item) => (
                <tr key={item.imovel__inscricao} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.imovel__inscricao}</td>
                  <td className="px-6 py-4 text-gray-600">{item.imovel__titular__nome || "Não informado"}</td>
                  <td className="px-6 py-4 text-right text-gray-900">{item.coletas}</td>
                  <td className="px-6 py-4 text-right font-semibold text-[#1A5538]">
                    {numberFormatter.format(parseFloat(String(item.pontos || 0)))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                  Nenhum registro encontrado para este programa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
