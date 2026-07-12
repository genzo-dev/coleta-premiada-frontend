"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  buscarEvidenciasAction,
  anexarEvidenciaAction,
} from "@/actions/coleta/gestor-coleta-actions";
import { editarColetaAction } from "@/actions/coleta/editar-coleta-action";
import type { RegistroColeta } from "@/types/entities/registro-coleta";
import type { Evidencia } from "@/types/entities/evidencia";

interface SheetDetalhesProps {
  coleta: RegistroColeta | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DetalhesContent({ coleta, onClose }: { coleta: RegistroColeta; onClose: () => void }) {
  const [evidencias, setEvidencias] = useState<Evidencia[]>([]);
  const [loadingEvidencias, setLoadingEvidencias] = useState(true);
  const [foto, setFoto] = useState<File | null>(null);
  const [descricao, setDescricao] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editPeso, setEditPeso] = useState(String(coleta.peso_kg || ""));
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    buscarEvidenciasAction(coleta.id).then((res) => {
      if (res.success && res.data) {
        setEvidencias(res.data);
      }
      setLoadingEvidencias(false);
    });
    }, [coleta.id]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!foto) return;

    setUploading(true);
    setError("");

    const fd = new FormData();
    fd.append("arquivo", foto);
    if (descricao) {
      fd.append("descricao", descricao);
    }

    const res = await anexarEvidenciaAction(coleta.id, fd);

    if (res.success && res.data) {
      setEvidencias([res.data, ...evidencias]);
      setFoto(null);
      setDescricao("");
    } else {
      setError(res.error || "Erro ao fazer upload da evidência.");
    }

    setUploading(false);
  }

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
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-3">Evidências (Fotos)</h3>

        {loadingEvidencias ? (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        ) : evidencias.length === 0 ? (
          <p className="text-sm text-muted-foreground border border-dashed rounded-md p-4 text-center">
            Nenhuma foto anexada.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {evidencias.map((ev) => (
              <div
                key={ev.id}
                className="border rounded-md overflow-hidden relative group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ev.arquivo_url}
                  alt={ev.descricao || "Evidência"}
                  className="w-full h-auto object-cover max-h-[250px]"
                />
                {ev.descricao && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs">
                    {ev.descricao}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold mb-3 text-sm">Anexar Nova Foto</h3>
        <form onSubmit={handleUpload} className="flex flex-col gap-3">
          {error && <div className="text-xs text-red-500">{error}</div>}

          <div>
            <Input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFoto(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <Input
              placeholder="Descrição da imagem (opcional)"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="text-sm"
            />
          </div>

          <Button
            type="submit"
            disabled={!foto || uploading}
            variant="outline"
            className="w-full"
          >
            {uploading ? "Enviando..." : "Fazer Upload"}
          </Button>
        </form>
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
