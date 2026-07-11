"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdAdd } from "react-icons/md";
import { buscarImovelAction } from "@/actions/imovel/buscar-imovel-action";
import { buscarConstanteAction } from "@/actions/program/buscar-constante-action";
import { registrarColetaManualAction } from "@/actions/coleta/gestor-coleta-actions";
import type { Imovel } from "@/types/entities/imovel";
import type { ConstantePontuacao } from "@/types/entities/constante-pontuacao";

function RegistroForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<{
    search: string;
    imoveis: Imovel[];
  }>({ search: "", imoveis: [] });
  const [selectedImovel, setSelectedImovel] = useState<Imovel | null>(null);

  const imoveis = search === searchResults.search ? searchResults.imoveis : [];
  const showDropdown = search !== "" && imoveis.length > 0;

  const [pesoKg, setPesoKg] = useState("");
  const [dataHora, setDataHora] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });
  const [foto, setFoto] = useState<File | null>(null);

  const [constante, setConstante] = useState<ConstantePontuacao | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    buscarConstanteAction().then((res) => {
      if (res.success && res.data) {
        setConstante(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (!search) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      buscarImovelAction(search, 5).then((res) => {
        if (res.success && res.imoveis) {
          setSearchResults({ search, imoveis: res.imoveis });
        }
      });
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [search]);

  const pontuacaoEstimada =
    pesoKg && constante
      ? (parseFloat(pesoKg) * parseFloat(constante.pontos_por_kg)).toFixed(2)
      : "0.00";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedImovel) {
      setError("Selecione um imóvel.");
      return;
    }
    if (!pesoKg || parseFloat(pesoKg) <= 0) {
      setError("Peso inválido.");
      return;
    }

    setLoading(true);
    setError("");

    const fd = new FormData();
    fd.append("imovel", String(selectedImovel.id));
    fd.append("peso_kg", pesoKg);
    fd.append("data_hora_coleta", new Date(dataHora).toISOString());
    if (foto) {
      fd.append("foto", foto);
    }

    const res = await registrarColetaManualAction(fd);
    if (res.success) {
      onClose();
      router.refresh();
    } else {
      setError(res.error || "Ocorreu um erro ao registrar.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <div className="text-sm text-red-500">{error}</div>}

      <div className="flex flex-col gap-2 relative">
        <Label>Imóvel (Busca por inscrição/titular)</Label>
        {selectedImovel ? (
          <div className="flex items-center justify-between p-2 border rounded-md bg-muted/30">
            <span className="text-sm font-medium">
              {selectedImovel.inscricao} -{" "}
              {selectedImovel.titular_nome ||
                `ID Titular: ${selectedImovel.titular}`}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-red-500"
              onClick={() => {
                setSelectedImovel(null);
                setSearch("");
              }}
            >
              Remover
            </Button>
          </div>
        ) : (
          <>
            <Input
              placeholder="Digite a inscrição ou nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {showDropdown && imoveis.length > 0 && (
              <div className=" top-[100%] left-0 w-full mt-1 bg-white border rounded-md shadow-lg  max-h-48 overflow-y-auto">
                {imoveis.map((im) => (
                  <div
                    key={im.id}
                    className="p-2 hover:bg-muted cursor-pointer text-sm"
                    onClick={() => {
                      setSelectedImovel(im);
                      setSearchResults({ search: "", imoveis: [] });
                    }}
                  >
                    <div className="font-semibold">{im.inscricao}</div>
                    <div className="text-xs text-muted-foreground">
                      {im.titular_nome || `ID Titular: ${im.titular}`} -{" "}
                      {im.bairro}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Data e Hora</Label>
        <Input
          type="datetime-local"
          value={dataHora}
          onChange={(e) => setDataHora(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Peso (kg)</Label>
        <Input
          type="number"
          step="0.001"
          min="0.001"
          placeholder="Ex: 2.5"
          value={pesoKg}
          onChange={(e) => setPesoKg(e.target.value)}
          required
        />
        {pesoKg && constante && (
          <p className="text-xs text-emerald-600 font-medium">
            Pontuação Estimada: {pontuacaoEstimada} pts
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Foto / Evidência (Opcional)</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFoto(e.target.files?.[0] || null)}
        />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>

        <Button
          type="submit"
          disabled={loading || !selectedImovel}
          className="bg-[#1A5538] hover:bg-[#123F28]"
        >
          {loading ? "Salvando..." : "Salvar Registro"}
        </Button>
      </div>
    </form>
  );
}

export default function ModalRegistroColeta() {
  const [open, setOpen] = useState(false);
  const [openKey, setOpenKey] = useState(0);

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) setOpenKey((k) => k + 1);
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#1A5538] hover:bg-[#123F28] text-white">
          <MdAdd className="mr-2 h-4 w-4" /> Registrar Coleta Manual
        </Button>
      </DialogTrigger>
      <DialogContent
        title="Registrar Coleta Manual"
        description="Insira os dados da coleta realizada."
        className="sm:max-w-[425px]"
      >
        <RegistroForm key={openKey} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
