import { HiOutlineShieldCheck } from "react-icons/hi";
import { getAuditLogs } from "@/lib/gestor/get-audit-logs";
import { AuditFilters } from "./_components/audit-filters";
import { AuditTable } from "./_components/audit-table";

export default async function AuditoriaPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const page_size = 100;
  
  const usuario_id = searchParams.usuario_id || "";
  const tabela = searchParams.tabela || "";
  const operacao = searchParams.operacao || "";
  const data_inicio = searchParams.data_inicio || "";
  const data_fim = searchParams.data_fim || "";
  const objeto_id = searchParams.objeto_id || "";

  const response = await getAuditLogs({
    page,
    page_size,
    ...(usuario_id && { usuario_id }),
    ...(tabela && { tabela }),
    ...(operacao && { operacao }),
    ...(data_inicio && { data_inicio }),
    ...(data_fim && { data_fim }),
    ...(objeto_id && { objeto_id }),
  });

  const logs = response?.results ?? [];
  const count = response?.count ?? 0;
  const totalPages = Math.ceil(count / page_size);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <HiOutlineShieldCheck className="w-6 h-6 text-[#1A5538]" />
          Auditoria de Sistema
        </h1>
      </div>

      <AuditFilters
        searchParams={{
          usuario_id,
          tabela,
          operacao,
          data_inicio,
          data_fim,
          objeto_id,
        }}
      />

      <AuditTable logs={logs} />

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 text-sm mt-4">
          <p className="text-muted-foreground">
            Mostrando {(page - 1) * page_size + 1}–
            {Math.min(page * page_size, count)} de {count} logs
          </p>
          <div className="flex items-center gap-2">
            {page > 1 ? (
              <a
                href={`?page=${page - 1}`}
                className="px-3 py-1.5 rounded-md border border-border text-sm font-medium hover:bg-gray-50 transition"
              >
                Anterior
              </a>
            ) : (
              <span className="px-3 py-1.5 rounded-md border border-border text-sm text-muted-foreground cursor-not-allowed">
                Anterior
              </span>
            )}
            {page < totalPages ? (
              <a
                href={`?page=${page + 1}`}
                className="px-3 py-1.5 rounded-md border border-border text-sm font-medium hover:bg-gray-50 transition"
              >
                Próximo
              </a>
            ) : (
              <span className="px-3 py-1.5 rounded-md border border-border text-sm text-muted-foreground cursor-not-allowed">
                Próximo
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
