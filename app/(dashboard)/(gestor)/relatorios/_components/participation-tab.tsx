import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { ParticipationItem } from "@/types/entities/relatorios";
import Link from "next/link";
import { MdPeople } from "react-icons/md";
import { ChevronUp, ChevronDown } from "lucide-react";

type SearchParams = { [key: string]: string | string[] | undefined };

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
};

export async function ParticipationTab({ 
  programaId, 
  searchParams 
}: { 
  programaId?: string,
  searchParams: SearchParams 
}) {
  const urlParams = new URLSearchParams();
  if (programaId) urlParams.set("programa_id", programaId);
  
  // DRF generic paginator usually uses `page` or `limit`/`offset` depending on setup.
  // We will assume it fetches everything if not strictly paginated, or we just rely on standard sorting in JS or DRF.
  // The prompt asked for "ordenável por colunas". If the backend doesn't support generic ordering in this view, 
  // we can sort in JS (since we are receiving all or paginated array).
  
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
    let aVal: any = a[sortKey as keyof ParticipationItem];
    let bVal: any = b[sortKey as keyof ParticipationItem];

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
    const p = new URLSearchParams(searchParams as any);
    p.set("sort", key);
    p.set("dir", nextDir);
    return `?${p.toString()}`;
  };

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) return null;
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />;
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
                  Inscrição <SortIcon colKey="imovel__inscricao" />
                </Link>
              </th>
              <th className="px-6 py-4">
                <Link href={getSortLink("imovel__titular__nome")} className="flex items-center hover:text-emerald-700 transition-colors">
                  Titular <SortIcon colKey="imovel__titular__nome" />
                </Link>
              </th>
              <th className="px-6 py-4 text-right">
                <Link href={getSortLink("coletas")} className="flex items-center justify-end hover:text-emerald-700 transition-colors">
                  Nº Coletas <SortIcon colKey="coletas" />
                </Link>
              </th>
              <th className="px-6 py-4 text-right">
                <Link href={getSortLink("pontos")} className="flex items-center justify-end hover:text-emerald-700 transition-colors">
                  Total Pontos <SortIcon colKey="pontos" />
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
