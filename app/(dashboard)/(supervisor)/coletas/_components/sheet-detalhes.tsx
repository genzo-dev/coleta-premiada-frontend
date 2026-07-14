"use client";

import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { editarColetaAction } from "@/actions/coleta/editar-coleta-action";
import { buildImageProxyUrl } from "@/lib/image-url";
import type { RegistroColeta } from "@/types/entities/registro-coleta";

interface SheetDetalhesProps {
  coleta: RegistroColeta | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DetalhesContent({ coleta, onClose }: { coleta: RegistroColeta; onClose: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPeso, setEditPeso] = useState(String(coleta.peso_kg || ""));
  const [savingEdit, setSavingEdit] = useState(false);
  const [error, setError] = useState("");

  async function handleSaveEdit() {
    setSavingEdit(true);
    const res = await editarColetaAction(coleta.id, { peso_kg: editPeso });
    setSavingEdit(false);
    if (res.success) {
      setIsEditing(false);
      onClose();
    } else {
      setError(res.errors?.[0] || "Erro ao editar coleta.");
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="bg-muted/50 p-4 rounded-lg border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-sm">Dados Principais</h3>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={handleSaveEdit}
                disabled={savingEdit}
              >
                {savingEdit ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="font-semibold text-muted-foreground">
            ID do Sistema:
          </span>
          <span className="truncate">{coleta.id_microservico}</span>

          <span className="font-semibold text-muted-foreground">
            Inscrição Imóvel:
          </span>
          <span>{coleta.imovel_inscricao}</span>

          <span className="font-semibold text-muted-foreground">
            Titular:
          </span>
          <span>{coleta.titular_nome}</span>

          <span className="font-semibold text-muted-foreground">
            Peso (kg):
          </span>
          {isEditing ? (
            <Input
              type="number"
              step="0.001"
              value={editPeso}
              onChange={(e) => setEditPeso(e.target.value)}
              className="h-8"
            />
          ) : (
            <span className="font-bold text-foreground">
              {coleta.peso_kg} kg
            </span>
          )}

          <span className="font-semibold text-muted-foreground">
            Pontuação:
          </span>
          <span className="font-bold text-emerald-600">
            {coleta.pontuacao} pts
          </span>

          <span className="font-semibold text-muted-foreground">
            Origem:
          </span>
          <span>
            {coleta.id_microservico ? "App de Campo" : "Lançamento Manual"}
          </span>
        </div>

        {error && <div className="text-xs text-red-500 mt-2">{error}</div>}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-3">Evidência (Foto)</h3>

        {(() => {
          const proxyUrl = buildImageProxyUrl(coleta.foto_url);
          return proxyUrl ? (
            <div className="border rounded-md overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={proxyUrl}
                alt="Evidência da coleta"
                className="w-full h-auto object-cover max-h-[300px]"
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground border border-dashed rounded-md p-4 text-center">
              Nenhuma foto anexada.
            </p>
          );
        })()}
      </div>
    </div>
  );
}

export default function SheetDetalhesColeta({
  coleta,
  open,
  onOpenChange,
}: SheetDetalhesProps) {
  if (!coleta) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent key={coleta.id}
        className="w-full sm:max-w-md overflow-y-auto"
        title="Detalhes da Coleta"
        description="Informações e evidências fotográficas"
      >
        <DetalhesContent coleta={coleta} onClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}
