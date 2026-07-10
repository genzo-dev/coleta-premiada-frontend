"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { Program } from "@/schemas/programs/programs-schema";
import { executarConsolidacaoAction, criarCicloAction, getProgramCyclesAction } from "../actions";
import { Ciclo } from "@/types/entities/ciclo";

export default function ConsolidationForm({
  programs,
}: {
  programs: Program[];
}) {
  const router = useRouter();
  const [programaId, setProgramaId] = useState<string>("");
  const [ciclos, setCiclos] = useState<Ciclo[]>([]);
  const [cicloId, setCicloId] = useState<string>("");
  
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewCycleDialogOpen, setIsNewCycleDialogOpen] = useState(false);

  // New cycle form state
  const [newCycleName, setNewCycleName] = useState("");
  const [newCycleStart, setNewCycleStart] = useState("");
  const [newCycleEnd, setNewCycleEnd] = useState("");
  const [isCreatingCycle, setIsCreatingCycle] = useState(false);

  useEffect(() => {
    if (programaId) {
      let cancelled = false;
      getProgramCyclesAction(programaId).then(data => {
        if (!cancelled) {
          setCiclos(data);
          if (data.length > 0) setCicloId(data[0].id.toString());
          else setCicloId("");
        }
      });
      return () => { cancelled = true; };
    }
  }, [programaId]);

  const handleCreateCycle = async () => {
    if (!programaId || !newCycleName || !newCycleStart || !newCycleEnd) {
      setMessage({ type: "error", text: "Preencha todos os campos do novo ciclo." });
      return;
    }

    setIsCreatingCycle(true);
    const fd = new FormData();
    fd.append("programaId", programaId);
    fd.append("nome", newCycleName);
    fd.append("dataInicio", newCycleStart);
    fd.append("dataFim", newCycleEnd);

    const result = await criarCicloAction({}, fd);
    setIsCreatingCycle(false);

    if (result.success) {
      setIsNewCycleDialogOpen(false);
      setNewCycleName("");
      setNewCycleStart("");
      setNewCycleEnd("");
      
      // refresh cycles
      const data = await getProgramCyclesAction(programaId);
      setCiclos(data);
      if (data.length > 0) setCicloId(data[0].id.toString());
      setMessage({ type: "success", text: "Ciclo criado com sucesso." });
    } else {
      setMessage({ type: "error", text: result.errors?.join(", ") || "Erro." });
    }
  };

  const handleExecute = async () => {
    if (!programaId || !cicloId) {
      setMessage({ type: "error", text: "Selecione o programa e o ciclo." });
      setIsDialogOpen(false);
      return;
    }

    setIsPending(true);
    setMessage(null);
    const formData = new FormData();
    formData.append("programaId", programaId);
    formData.append("cicloId", cicloId);

    const result = await executarConsolidacaoAction({}, formData);

    setIsPending(false);
    setIsDialogOpen(false);

    if (result.success) {
      setMessage({
        type: "success",
        text: `Consolidação concluída: ${result.totalImoveis} imóveis processados, ${result.totalPontos} pontos totais.`,
      });
      // Refresh cycles to remove the closed one
      const data = await getProgramCyclesAction(programaId);
      setCiclos(data);
      if (data.length > 0) setCicloId(data[0].id.toString());
      else setCicloId("");
      router.refresh();
    } else {
      setMessage({
        type: "error",
        text: result.errors?.join(", ") || "Erro ao executar consolidação.",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Executar Consolidação
      </h2>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <Label htmlFor="programaId">Programa Ativo</Label>
          <select
            id="programaId"
            value={programaId}
            onChange={(e) => {
              setProgramaId(e.target.value);
              setCiclos([]);
              setCicloId("");
            }}
            disabled={isPending}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Selecione um programa</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <div className="flex justify-between items-center">
            <Label htmlFor="cicloId">Ciclo Aberto</Label>
            {programaId && (
               <Dialog open={isNewCycleDialogOpen} onOpenChange={setIsNewCycleDialogOpen}>
                 <DialogTrigger asChild>
                   <Button variant="link" size="sm" className="h-auto p-0 text-[#116F51]">
                     <Plus className="w-3 h-3 mr-1" /> Novo Ciclo
                   </Button>
                 </DialogTrigger>
                 <DialogContent title="Criar Novo Ciclo">
                   <div className="space-y-4 py-4">
                     <div className="space-y-2">
                       <Label>Nome do Ciclo</Label>
                       <Input placeholder="Ex: Maio/2026, 1º Semestre" value={newCycleName} onChange={e => setNewCycleName(e.target.value)} />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label>Data Início</Label>
                         <Input type="date" value={newCycleStart} onChange={e => setNewCycleStart(e.target.value)} />
                       </div>
                       <div className="space-y-2">
                         <Label>Data Fim</Label>
                         <Input type="date" value={newCycleEnd} onChange={e => setNewCycleEnd(e.target.value)} />
                       </div>
                     </div>
                     <Button onClick={handleCreateCycle} disabled={isCreatingCycle} className="w-full bg-[#116F51] hover:bg-emerald-800 text-white">
                        {isCreatingCycle ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        Criar Ciclo
                     </Button>
                   </div>
                 </DialogContent>
               </Dialog>
            )}
          </div>
          <select
            id="cicloId"
            value={cicloId}
            onChange={(e) => setCicloId(e.target.value)}
            disabled={isPending || !programaId || ciclos.length === 0}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{ciclos.length > 0 ? "Selecione o ciclo" : "Nenhum ciclo aberto"}</option>
            {ciclos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome} ({new Date(c.data_inicio + 'T00:00:00').toLocaleDateString('pt-BR')} a {new Date(c.data_fim + 'T00:00:00').toLocaleDateString('pt-BR')})
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-auto">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                disabled={isPending || !programaId || !cicloId} 
                className="w-full md:w-auto h-10 bg-[#116F51] hover:bg-emerald-800 text-white"
              >
                Executar Consolidação
              </Button>
            </DialogTrigger>
            <DialogContent
              title="Confirmar Consolidação"
              description="Esta ação fechará este ciclo permanentemente e registrará os descontos no IPTU para todos os imóveis participantes. Tem certeza?"
            >
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isPending}>
                  Cancelar
                </Button>
                <Button onClick={handleExecute} disabled={isPending} className="bg-[#116F51] hover:bg-emerald-800 text-white">
                  {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Confirmar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 mt-6 rounded-md ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
