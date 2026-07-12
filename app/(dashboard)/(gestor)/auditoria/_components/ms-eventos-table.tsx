"use client";

import { EventoAuditoria } from "@/types/entities/evento-auditoria";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const ORIGEM_LABEL: Record<EventoAuditoria["origem"], string> = {
  api: "API (mobile)",
  fila_publish: "Publicação fila",
  fila_consume: "Consumo fila",
  management_command: "Cmd administrativo",
};

const NIVEL_STYLES: Record<
  EventoAuditoria["nivel"],
  { label: string; className: string }
> = {
  info: {
    label: "Info",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  warning: {
    label: "Atenção",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  error: {
    label: "Erro",
    className:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
};

function DetalhesSheet({ evento }: { evento: EventoAuditoria }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          Detalhes
        </Button>
      </SheetTrigger>
      <SheetContent
        title="Detalhes do Evento"
        description={`ID ${evento.id} — ${evento.evento}`}
      >
        <div className="flex flex-col gap-5 text-sm">
          {evento.coleta_offline_id && (
            <div>
              <p className="font-medium text-muted-foreground mb-1">
                Coleta offline ID
              </p>
              <p className="font-mono text-xs">{evento.coleta_offline_id}</p>
            </div>
          )}
          {evento.fila && (
            <div>
              <p className="font-medium text-muted-foreground mb-1">Fila</p>
              <p className="font-mono text-xs">{evento.fila}</p>
            </div>
          )}
          <div>
            <p className="font-medium text-muted-foreground mb-1">Detalhe</p>
            {evento.detalhe ? (
              <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto whitespace-pre-wrap break-words">
                {JSON.stringify(evento.detalhe, null, 2)}
              </pre>
            ) : (
              <p className="text-muted-foreground">—</p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function MsEventosTable({
  eventos,
}: {
  eventos: EventoAuditoria[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50 text-left text-xs font-medium text-muted-foreground">
            <th className="px-4 py-3">Data/Hora</th>
            <th className="px-4 py-3">Origem</th>
            <th className="px-4 py-3">Nível</th>
            <th className="px-4 py-3">Evento</th>
            <th className="px-4 py-3">Coletor ID</th>
            <th className="px-4 py-3">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((ev) => {
            const nivel = NIVEL_STYLES[ev.nivel];
            return (
              <tr
                key={ev.id}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                  {new Date(ev.timestamp).toLocaleString("pt-BR")}
                </td>
                <td className="px-4 py-3 text-xs">
                  {ORIGEM_LABEL[ev.origem] ?? ev.origem}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${nivel.className}`}
                  >
                    {nivel.label}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{ev.evento}</td>
                <td className="px-4 py-3 font-mono text-xs">
                  {ev.coletor_id ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <DetalhesSheet evento={ev} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
