export const dynamic = "force-dynamic";
export const revalidate = 0;

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { Imovel } from "@/types/entities/imovel";
import PropertySearch from "./_components/property-search";
import Pagination from "./_components/pagination";
import ImovelDialog from "./_components/imovel-dialog";
import { MdApartment, MdCheckCircle, MdCancel } from "react-icons/md";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imóveis",
};

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type SearchParams = Promise<{
  search?: string;
  page?: string;
}>;

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function StatusBadge({ ativo }: { ativo: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        ativo
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-red-50 text-red-600 border border-red-200"
      }`}
    >
      {ativo ? (
        <MdCheckCircle className="w-3.5 h-3.5" />
      ) : (
        <MdCancel className="w-3.5 h-3.5" />
      )}
      {ativo ? "Ativo" : "Inativo"}
    </span>
  );
}

type ImovelWithTitularName = Imovel & { titular_nome?: string };

export default async function SupervisorImoveisPage(props: {
  searchParams: SearchParams;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // Restringe o acesso apenas para gestores, supervisores e gerentes gerais
  if (
    user.perfil !== "supervisor" &&
    user.perfil !== "gestor" &&
    user.perfil !== "gerente_geral"
  ) {
    redirect("/");
  }

  const searchParams = await props.searchParams;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;

  const response = await apiAuthenticatedRequest<
    PaginatedResponse<ImovelWithTitularName>
  >(
    `/api/program/properties?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ""}`,
  );

  let imoveisList: ImovelWithTitularName[] = [];
  let totalCount = 0;
  let errorMsg = "";

  if (response.success) {
    const rawData = response.data;
    if (rawData && typeof rawData === "object") {
      if ("results" in rawData && Array.isArray(rawData.results)) {
        imoveisList = rawData.results;
        totalCount = rawData.count;
      } else if (Array.isArray(rawData)) {
        imoveisList = rawData;
        totalCount = rawData.length;
      }
    }
  } else {
    errorMsg =
      response.errors?.[0] || "Não foi possível carregar a lista de imóveis.";
  }

  const itemsPerPage = 20; // Padrão da paginação do Django REST Framework
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdApartment className="w-6 h-6 text-[#1A5538]" />
          Gerenciamento de Imóveis
        </h1>
        <div className="flex items-center gap-2">
          <PropertySearch initialValue={search} />
          <ImovelDialog mode="create" />
        </div>
      </div>

      {errorMsg ? (
        <p className="text-sm text-destructive">{errorMsg}</p>
      ) : (
        <>
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
                    <th className="px-6 py-4">Inscrição</th>
                    <th className="px-6 py-4">Titular</th>
                    <th className="px-6 py-4">Bairro</th>
                    <th className="px-6 py-4 text-center">Moradores</th>
                    <th className="px-6 py-4">Adesão</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {imoveisList.length > 0 ? (
                    imoveisList.map((imovel) => {
                      return (
                        <tr
                          key={imovel.id}
                          className="hover:bg-muted/20 transition-colors"
                        >
                          <td className="px-6 py-4 font-semibold text-foreground">
                            {imovel.inscricao}
                          </td>
                          <td className="px-6 py-4 text-foreground font-medium">
                            {imovel.titular_nome ||
                              `ID Titular: ${imovel.titular}`}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {imovel.bairro}
                          </td>
                          <td className="px-6 py-4 text-center text-foreground font-medium">
                            {imovel.num_moradores}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {formatDate(imovel.data_adesao)}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge ativo={imovel.ativo} />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end">
                              <ImovelDialog mode="edit" imovel={imovel} />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-12 text-center text-muted-foreground text-sm"
                      >
                        Nenhum imóvel encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} />
          )}
        </>
      )}
    </div>
  );
}
