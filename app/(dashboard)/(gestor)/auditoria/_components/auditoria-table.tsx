"use client";

import { useState } from "react";
import { AuditLog } from "@/types/entities/audit-log";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const TABELAS: Record<string, string> = {
  accounts_usuario: "Usuários",
  accounts_role: "Papéis (Roles)",
  accounts_cidade: "Cidades",
  program_imovel: "Imóveis",
  program_programa: "Programas",
  program_regraprograma: "Regras de Programa",
  program_ciclo: "Ciclos",
  program_saldopontos: "Benefícios (Saldo de Pontos)",
  program_consolidacao: "Consolidações",
  program_constantepontuacao: "Constante de Pontuação",
  collection_registrocoleta: "Coletas",
  collection_evidencia: "Evidências",
  collection_contestacao: "Contestações",
};

const OPERACAO_STYLES: Record<
  AuditLog["operacao"],
  { label: string; className: string }
> = {
  INSERT: {
    label: "Criação",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  UPDATE: {
    label: "Alteração",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  DELETE: {
    label: "Exclusão",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
  SELECT: {
    label: "Consulta",
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  },
};

function DetalhesSheet({ log }: { log: AuditLog }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Detalhes
        </Button>
      </SheetTrigger>
      <SheetContent title="Detalhes do Evento" description={`ID ${log.id} — ${log.tabela}`}>
        <div className="flex flex-col gap-5 text-sm">
          <div>
            <p className="font-medium text-muted-foreground mb-1">Dados anteriores</p>
            {log.dados_antes ? (
              <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto whitespace-pre-wrap break-words">
                {JSON.stringify(log.dados_antes, null, 2)}
              </pre>
            ) : (
              <p className="text-muted-foreground">—</p>
            )}
          </div>
          <div>
            <p className="font-medium text-muted-foreground mb-1">Dados posteriores</p>
            {log.dados_depois ? (
              <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto whitespace-pre-wrap break-words">
                {JSON.stringify(log.dados_depois, null, 2)}
              </pre>
            ) : (
              <p className="text-muted-foreground">—</p>
            )}
          </div>
          {log.ip_origem && (
            <div>
              <p className="font-medium text-muted-foreground mb-1">IP de origem</p>
              <p className="font-mono">{log.ip_origem}</p>
            </div>
          )}
          {log.endpoint && (
            <div>
              <p className="font-medium text-muted-foreground mb-1">Endpoint</p>
              <p className="font-mono break-all">{log.endpoint}</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function AuditoriaTable({
  logs,
  isGerenteGeral,
}: {
  logs: AuditLog[];
  isGerenteGeral: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50 text-left text-xs font-medium text-muted-foreground">
            <th className="px-4 py-3">Data/Hora</th>
            <th className="px-4 py-3">Usuário</th>
            <th className="px-4 py-3">Operação</th>
            <th className="px-4 py-3">Tabela</th>
            <th className="px-4 py-3">Registro</th>
            {isGerenteGeral && <th className="px-4 py-3">Cidade</th>}
            <th className="px-4 py-3">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => {
            const op = OPERACAO_STYLES[log.operacao];
            return (
              <tr
                key={log.id}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                  {new Date(log.timestamp).toLocaleString("pt-BR")}
                </td>
                <td className="px-4 py-3">
                  {log.usuario_email ?? "Sistema"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${op.className}`}
                  >
                    {op.label}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {TABELAS[log.tabela] ?? log.tabela}
                </td>
                <td className="px-4 py-3 font-mono text-xs">
                  {log.objeto_id ?? "—"}
                </td>
                {isGerenteGeral && (
                  <td className="px-4 py-3">{log.cidade ?? "—"}</td>
                )}
                <td className="px-4 py-3">
                  <DetalhesSheet log={log} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
