"use client";

import { useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { MdImage } from "react-icons/md";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { buscarEvidenciasAction } from "@/actions/coleta/buscar-evidencias-action";
import type { ColetaMicroservico } from "@/types/entities/coleta-microservico";
import type { Evidencia } from "@/types/entities/evidencia";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function EvidenciaGallery({ coletaId }: { coletaId: number }) {
  const [isPending, startTransition] = useTransition();
  const [evidencias, setEvidencias] = useState<Evidencia[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: refactor - avoiding re-render issue
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEvidencias(null);
    setError(null);
    startTransition(async () => {
      const result = await buscarEvidenciasAction(coletaId);
      if (result.success) {
        setEvidencias(result.evidencias);
      } else {
        setError(result.error);
      }
    });
  }, [coletaId]);

  if (isPending) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Carregando evidências…
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (!evidencias || evidencias.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhuma evidência registrada para esta coleta.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {evidencias.map((ev) => (
        <a
          key={ev.id}
          href={ev.arquivo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-muted"
        >
          {/\.(jpg|jpeg|png|webp|gif)$/i.test(ev.arquivo_url) ? (
            <img
              src={ev.arquivo_url}
              alt={ev.descricao || `Evidência ${ev.id}`}
              className="h-24 w-full object-cover transition-opacity group-hover:opacity-80"
            />
          ) : (
            <div className="flex h-24 items-center justify-center bg-muted text-muted-foreground">
              <MdImage className="h-8 w-8" />
            </div>
          )}
          {ev.descricao && (
            <p className="px-2 py-1 text-xs text-muted-foreground line-clamp-1">
              {ev.descricao}
            </p>
          )}
        </a>
      ))}
    </div>
  );
}

type ColetaSheetProps = {
  coleta: ColetaMicroservico;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ColetaSheet({ coleta, open, onOpenChange }: ColetaSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        title={`Coleta ${coleta.codigo}`}
        description={formatDateTime(coleta.data_hora)}
      >
        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Dados da coleta
            </h2>
            <dl className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-muted-foreground">Data e hora</dt>
                <dd className="text-sm text-foreground">
                  {formatDateTime(coleta.data_hora)}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-muted-foreground">Peso (kg)</dt>
                <dd className="text-sm text-foreground">
                  {parseFloat(coleta.peso_total_kg).toFixed(3)} kg
                </dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-muted-foreground">
                  Pontuação gerada
                </dt>
                <dd className="text-sm text-foreground font-medium">
                  {coleta.pontuacao
                    ? `${parseFloat(coleta.pontuacao).toFixed(2)} pts`
                    : "—"}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-muted-foreground">
                  Programa vinculado
                </dt>
                <dd className="text-sm text-foreground">
                  {coleta.programa ?? "—"}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-muted-foreground">Status</dt>
                <dd className="text-sm text-foreground capitalize">
                  {coleta.status}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs text-muted-foreground">Sincronizado</dt>
                <dd className="text-sm text-foreground">
                  {coleta.sincronizado ? "Sim" : "Pendente"}
                </dd>
              </div>
              <div className="col-span-2 flex flex-col gap-0.5">
                <dt className="text-xs text-muted-foreground">Código</dt>
                <dd className="text-sm font-mono text-muted-foreground">
                  {coleta.codigo}
                </dd>
              </div>
            </dl>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Evidências
            </h2>
            {open && <EvidenciaGallery coletaId={Number(coleta.id)} />}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
