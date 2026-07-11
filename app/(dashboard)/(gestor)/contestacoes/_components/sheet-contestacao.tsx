"use client";

import { useState, useTransition, useEffect } from "react";
import { format } from "date-fns";
import type { Contestacao } from "@/types/entities/contestacao";
import type { Evidencia } from "@/types/entities/evidencia";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { resolverContestacaoAction } from "@/actions/contestacao/gestor-contestacao-actions";
import { buscarEvidenciasAction } from "@/actions/coleta/gestor-coleta-actions";

interface SheetContestacaoProps {
  contestacao: Contestacao | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onResolved: () => void;
}

export function SheetContestacao({
  contestacao,
  isOpen,
  onOpenChange,
  onResolved,
}: SheetContestacaoProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string>(
    contestacao?.status === "aberta" ? "em_analise" : contestacao?.status || "",
  );
  const [resposta, setResposta] = useState(contestacao?.resposta || "");
  const [evidencias, setEvidencias] = useState<Evidencia[]>([]);
  const [loadingEvidencias, setLoadingEvidencias] = useState(true);

  useEffect(() => {
    if (!contestacao || !isOpen) return;

    buscarEvidenciasAction(contestacao.coleta)
      .then((res) => {
        if (res.success && res.data) {
          setEvidencias(res.data || []);
        }
      })
      .finally(() => setLoadingEvidencias(false));
  }, [contestacao, isOpen]);

  if (!contestacao) return null;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setStatus(val);
    if (val === "aceita") {
      toast.info("Atenção", {
        description:
          "Considere ajustar manualmente a pontuação da coleta se necessário, após aceitar a contestação.",
        duration: 8000,
      });
    }
  };

  const handleResolve = () => {
    if (!resposta.trim()) {
      toast.error("Resposta obrigatória", {
        description: "Você precisa fornecer uma justificativa para a decisão.",
      });
      return;
    }

    startTransition(async () => {
      const res = await resolverContestacaoAction(contestacao.id, {
        status,
        resposta,
      });

      if (res.success) {
        toast.success("Sucesso", {
          description: "Contestação atualizada com sucesso.",
        });
        onResolved();
        onOpenChange(false);
      } else {
        toast.error("Erro", {
          description: res.errors?.[0] || "Erro ao resolver contestação.",
        });
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent key={contestacao.id}
        title={`Contestação #${contestacao.id}`}
        description={`Aberta por ${contestacao.morador_nome} em ${format(new Date(contestacao.aberta_em), "dd/MM/yyyy HH:mm")}`}
      >
        <div className="flex flex-col gap-6 py-4">
          <div className="space-y-4 rounded-lg bg-muted p-4">
            <h4 className="font-semibold">Dados da Coleta</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Imóvel</p>
                <p className="font-medium">{contestacao.imovel_inscricao}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Data da Coleta</p>
                <p className="font-medium">
                  {contestacao.coleta_data
                    ? format(
                        new Date(contestacao.coleta_data),
                        "dd/MM/yyyy HH:mm",
                      )
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Peso (kg)</p>
                <p className="font-medium">{contestacao.coleta_peso}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Pontuação</p>
                <p className="font-medium">{contestacao.coleta_pontuacao}</p>
              </div>
            </div>

            {loadingEvidencias ? (
              <p className="text-xs text-muted-foreground mt-2">
                Carregando evidências...
              </p>
            ) : evidencias.length > 0 ? (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {evidencias.map((ev) => (
                  <div
                    key={ev.id}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border"
                  >
                    <img
                      src={ev.arquivo_url}
                      alt="Evidência"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground mt-2">
                Nenhuma evidência (foto) vinculada.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Motivo da Contestação (Morador)</Label>
            <div className="rounded-md border bg-card p-3 text-sm text-card-foreground">
              {contestacao.motivo}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="status">Decisão (Status)</Label>
              <select
                id="status"
                value={status}
                onChange={handleStatusChange}
                disabled={isPending}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="em_analise">Em Análise</option>
                <option value="aceita">Aceitar (Procedente)</option>
                <option value="negada">Negar (Improcedente)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resposta">Resposta / Justificativa</Label>
              <Textarea
                id="resposta"
                value={resposta}
                onChange={(e) => setResposta(e.target.value)}
                placeholder="Escreva aqui a resposta que o morador vai ler..."
                rows={4}
                disabled={isPending}
              />
            </div>

            <Button
              className="w-full"
              onClick={handleResolve}
              disabled={isPending}
            >
              {isPending ? "Salvando..." : "Salvar Resolução"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
