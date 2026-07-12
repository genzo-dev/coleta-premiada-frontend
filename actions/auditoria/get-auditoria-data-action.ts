"use server";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { getAuditLogs, GetAuditLogsParams } from "@/lib/audit-logs/get-audit-logs";
import { getMsEventos, GetMsEventosParams } from "@/lib/ms-audit/get-ms-eventos";
import { getCidades } from "@/lib/cidades/get-cidades";
import { AuditLog } from "@/types/entities/audit-log";
import { EventoAuditoria } from "@/types/entities/evento-auditoria";
import { Cidade } from "@/types/entities/cidade";

export type Fonte = "core" | "ms";

export type GetAuditoriaDataParams = GetAuditLogsParams &
  GetMsEventosParams & { fonte?: Fonte };

export type GetAuditoriaDataResult = {
  fonte: Fonte;
  logs: AuditLog[];
  msEventos: EventoAuditoria[];
  count: number;
  isGerenteGeral: boolean;
  cidades: Cidade[] | null;
};

export async function getAuditoriaDataAction(
  params: GetAuditoriaDataParams,
): Promise<GetAuditoriaDataResult> {
  const currentUser = await getCurrentUser();
  const isGerenteGeral = currentUser?.perfil === "gerente_geral";
  const fonte: Fonte = params.fonte === "ms" ? "ms" : "core";

  if (fonte === "ms") {
    const msData = await getMsEventos({
      coletor_id: params.coletor_id,
      nivel: params.nivel,
      evento: params.evento,
      data_inicio: params.data_inicio,
      data_fim: params.data_fim,
      page: params.page,
    });
    return {
      fonte,
      logs: [],
      msEventos: msData?.results ?? [],
      count: msData?.count ?? 0,
      isGerenteGeral,
      cidades: null,
    };
  }

  const [logsData, cidades] = await Promise.all([
    getAuditLogs({
      usuario_id: params.usuario_id,
      tabela: params.tabela,
      operacao: params.operacao,
      objeto_id: params.objeto_id,
      data_inicio: params.data_inicio,
      data_fim: params.data_fim,
      cidade: isGerenteGeral ? params.cidade : undefined,
      page: params.page,
    }),
    isGerenteGeral ? getCidades() : Promise.resolve(null),
  ]);

  return {
    fonte,
    logs: logsData?.results ?? [],
    msEventos: [],
    count: logsData?.count ?? 0,
    isGerenteGeral,
    cidades,
  };
}
