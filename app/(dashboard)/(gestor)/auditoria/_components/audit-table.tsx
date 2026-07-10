"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AuditLog } from "@/types/entities/audit-log";
import { FaEye } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

function OperationBadge({ operacao }: { operacao: string }) {
  const colors: Record<string, string> = {
    INSERT: "bg-blue-100 text-blue-800",
    UPDATE: "bg-yellow-100 text-yellow-800",
    DELETE: "bg-red-100 text-red-800",
    SELECT: "bg-gray-100 text-gray-800",
  };

  const className = colors[operacao] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${className}`}
    >
      {operacao}
    </span>
  );
}

function JsonDiffViewer({
  antes: rawAntes,
  depois: rawDepois,
}: {
  antes: any;
  depois: any;
}) {
  let antes = rawAntes;
  let depois = rawDepois;
  
  try { if (typeof rawAntes === "string") antes = JSON.parse(rawAntes); } catch(e){}
  try { if (typeof rawDepois === "string") depois = JSON.parse(rawDepois); } catch(e){}

  const keys = Array.from(
    new Set([...Object.keys(antes || {}), ...Object.keys(depois || {})]),
  );

  return (
    <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto mt-4 text-sm font-mono bg-gray-50 p-4 rounded-md border border-gray-200">
      <div className="flex flex-col gap-2">
        <h4 className="font-bold text-gray-700 border-b pb-2 mb-2">
          Antes (dados_antes)
        </h4>
        {keys.map((key) => {
          const valAntes = antes ? antes[key] : undefined;
          const valDepois = depois ? depois[key] : undefined;
          const isChanged = valAntes !== valDepois;
          const isRemoved = valAntes !== undefined && valDepois === undefined;

          let colorClass = "text-gray-600";
          if (isRemoved) colorClass = "bg-red-100 text-red-800 line-through";
          else if (isChanged) colorClass = "bg-yellow-100 text-yellow-900";

          return (
            <div key={key} className={`break-words p-1 rounded ${colorClass}`}>
              <span className="font-bold">{key}: </span>
              {valAntes !== undefined ? JSON.stringify(valAntes) : <span className="text-gray-400 italic">n/a</span>}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 border-l border-gray-300 pl-4">
        <h4 className="font-bold text-gray-700 border-b pb-2 mb-2">
          Depois (dados_depois)
        </h4>
        {keys.map((key) => {
          const valAntes = antes ? antes[key] : undefined;
          const valDepois = depois ? depois[key] : undefined;
          const isChanged = valAntes !== valDepois;
          const isAdded = valAntes === undefined && valDepois !== undefined;

          let colorClass = "text-gray-600";
          if (isAdded) colorClass = "bg-green-100 text-green-800 font-medium";
          else if (isChanged) colorClass = "bg-yellow-100 text-yellow-900 font-medium";

          return (
            <div key={key} className={`break-words p-1 rounded ${colorClass}`}>
              <span className="font-bold">{key}: </span>
              {valDepois !== undefined ? JSON.stringify(valDepois) : <span className="text-gray-400 italic">n/a</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AuditTable({ logs }: { logs: AuditLog[] }) {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  if (logs.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 border rounded-lg bg-gray-50 mt-6 text-gray-500">
        Nenhum log encontrado com os filtros selecionados.
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg border border-border bg-white mt-4 shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left bg-gray-50/50">
              <th className="px-4 py-3">Data/Hora</th>
              <th className="px-4 py-3">Usuário</th>
              <th className="px-4 py-3">Operação</th>
              <th className="px-4 py-3">Tabela</th>
              <th className="px-4 py-3">ID Obj</th>
              <th className="px-4 py-3">IP Origem</th>
              <th className="px-4 py-3">Endpoint</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {logs.map((log, index) => (
              <tr
                key={log.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                } hover:bg-gray-100 transition ${
                  log.operacao === "UPDATE" || log.dados_antes || log.dados_depois
                    ? "cursor-pointer"
                    : ""
                }`}
                onClick={() => {
                  if (log.operacao === "UPDATE" || log.dados_antes || log.dados_depois) {
                    setSelectedLog(log);
                  }
                }}
              >
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {format(new Date(log.timestamp), "dd/MM/yyyy HH:mm:ss", {
                    locale: ptBR,
                  })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {log.usuario_email || "Sistema/Anônimo"}
                    </span>
                    {log.usuario_id && (
                      <span className="text-xs text-gray-400">
                        ID: {log.usuario_id}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <OperationBadge operacao={log.operacao} />
                </td>
                <td className="px-4 py-3 font-medium text-gray-700">
                  {log.tabela}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {log.objeto_id || "-"}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs truncate max-w-[120px]" title={log.ip_origem || ""}>
                  {log.ip_origem || "-"}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs truncate max-w-[150px]" title={log.endpoint || ""}>
                  {log.endpoint || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent 
          title="Detalhes da Operação"
          className="max-w-4xl max-h-[85vh] overflow-y-auto"
        >
          {selectedLog && (
            <div className="flex items-center gap-2 mb-2">
              <OperationBadge operacao={selectedLog.operacao} />
            </div>
          )}
          {selectedLog && (
            <div className="mt-2 text-sm text-gray-600 flex flex-col gap-1">
              <p><strong>Tabela:</strong> {selectedLog.tabela} | <strong>Objeto ID:</strong> {selectedLog.objeto_id}</p>
              <p><strong>Usuário:</strong> {selectedLog.usuario_email} (ID: {selectedLog.usuario_id})</p>
              <p><strong>Data:</strong> {format(new Date(selectedLog.timestamp), "dd/MM/yyyy HH:mm:ss", { locale: ptBR })}</p>
              <p className="text-xs truncate"><strong>Endpoint:</strong> {selectedLog.endpoint}</p>
            </div>
          )}

          {selectedLog && (
            <JsonDiffViewer
              antes={selectedLog.dados_antes}
              depois={selectedLog.dados_depois}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
