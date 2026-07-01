"use client"

import * as React from "react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createDisputeAction } from "@/actions/collection/dispute-actions"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { MdGavel, MdAdd, MdInfo, MdOutlineModeComment, MdOutlineCalendarToday } from "react-icons/md"
import { Loader2 } from "lucide-react"

interface Coleta {
  id: number
  id_microservico: string
  peso_kg: string
  pontuacao: number
  data_hora_coleta: string
}

interface Contestacao {
  id: number
  coleta: number
  motivo: string
  status: "em_analise" | "aceita" | "negada"
  resposta: string | null
  aberta_em: string
  atualizada_em: string
}

interface DisputesViewProps {
  initialDisputes: Contestacao[]
  coletas: Coleta[]
}

export default function DisputesView({ initialDisputes, coletas }: DisputesViewProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColetaId, setSelectedColetaId] = useState("")
  const [motivo, setMotivo] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    startTransition(async () => {
      const res = await createDisputeAction(undefined, {
        coleta: Number(selectedColetaId),
        motivo,
      })

      if (res.success) {
        setSuccess(true)
        setSelectedColetaId("")
        setMotivo("")
        setTimeout(() => {
          setIsOpen(false)
          setSuccess(false)
          router.refresh()
        }, 1500)
      } else {
        setError(res.errors.join(", "))
      }
    })
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
    } catch {
      return dateStr
    }
  }

  const formatStatus = (status: Contestacao["status"]) => {
    switch (status) {
      case "em_analise":
        return "Em Análise"
      case "aceita":
        return "Aceita"
      case "negada":
        return "Negada"
    }
  }

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex justify-between items-center bg-white border border-morador-outline-variant/30 rounded-xl p-5 shadow-sm">
        <div>
          <h4 className="text-base font-bold text-morador-primary">Minhas Contestações</h4>
          <p className="text-xs text-morador-on-surface-variant">Veja suas solicitações abertas ou crie uma nova.</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#003629] text-white hover:bg-emerald-950 px-5 rounded-xl font-bold gap-2">
              <MdAdd size={20} />
              Abrir Contestação
            </Button>
          </DialogTrigger>
          
          <DialogContent className="bg-white border border-morador-outline-variant/20 rounded-2xl w-full sm:max-w-md p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-morador-primary flex items-center gap-2">
                <MdGavel size={22} />
                Nova Contestação
              </DialogTitle>
              <DialogDescription className="text-xs">
                Selecione a coleta e justifique a divergência observada.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              {/* Seleção da Coleta */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="coleta" className="text-xs font-bold text-morador-primary">Coleta Referente</Label>
                <select
                  id="coleta"
                  value={selectedColetaId}
                  onChange={(e) => setSelectedColetaId(e.target.value)}
                  className="h-10 px-3 rounded-lg border border-morador-outline-variant bg-white text-sm focus:outline-none focus:ring-1 focus:ring-morador-primary focus:border-morador-primary disabled:opacity-50"
                  disabled={isPending}
                  required
                >
                  <option value="">Selecione uma coleta...</option>
                  {coletas.map((c) => {
                    const date = formatDate(c.data_hora_coleta)
                    return (
                      <option key={c.id} value={c.id}>
                        {date} – {c.peso_kg} kg (+{c.pontuacao} pts)
                      </option>
                    )
                  })}
                </select>
              </div>

              {/* Justificativa */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="motivo" className="text-xs font-bold text-morador-primary">Motivo / Justificativa</Label>
                <textarea
                  id="motivo"
                  placeholder="Explique detalhadamente o erro de pesagem ou pontuação..."
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  disabled={isPending}
                  className="min-h-[100px] w-full rounded-lg border border-[#ccc] bg-transparent px-3 py-2 text-sm transition-colors outline-none focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>

              {/* Feedback States */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-xs font-medium">
                  ✓ Contestação aberta com sucesso!
                </div>
              )}

              <DialogFooter className="pt-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-11 bg-[#003629] text-white hover:bg-emerald-950 font-bold rounded-xl"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin w-4 h-4" />
                      Enviando...
                    </span>
                  ) : (
                    "Enviar Contestação"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista das contestações */}
      <Card className="bg-white border border-morador-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
        {initialDisputes.length === 0 ? (
          <div className="text-center py-12 text-morador-on-surface-variant text-sm">
            Nenhuma contestação aberta localizada.
          </div>
        ) : (
          <div className="divide-y divide-morador-outline-variant/10">
            {initialDisputes.map((disp) => (
              <div key={disp.id} className="p-6 space-y-4">
                {/* Header do item */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-morador-primary">Ticket #{disp.id}</span>
                      <span className="text-xs text-morador-outline">•</span>
                      <span className="text-xs text-morador-outline flex items-center gap-1">
                        <MdOutlineCalendarToday size={14} />
                        {formatDate(disp.aberta_em)}
                      </span>
                    </div>
                    <p className="text-xs text-morador-on-surface-variant font-medium">
                      Coleta ID: #{disp.coleta}
                    </p>
                  </div>

                  <StatusBadge variant={disp.status === "em_analise" ? "analise" : disp.status}>
                    {formatStatus(disp.status)}
                  </StatusBadge>
                </div>

                {/* Justificativa */}
                <div className="p-3 bg-morador-surface-container-low rounded-xl border border-morador-outline-variant/10 text-sm text-morador-primary">
                  <p className="text-[10px] font-bold text-morador-outline uppercase tracking-wider mb-1">Seu Motivo</p>
                  <p className="leading-relaxed">{disp.motivo}</p>
                </div>

                {/* Resposta do Gestor se houver */}
                {disp.resposta ? (
                  <div className="p-3 bg-[#E8F5E9]/30 rounded-xl border border-[#C8E6C9]/40 text-sm text-[#2E7D32]">
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold uppercase tracking-wider text-[#2E7D32]">
                      <MdOutlineModeComment size={14} />
                      Resposta do Gestor
                    </div>
                    <p className="leading-relaxed">{disp.resposta}</p>
                  </div>
                ) : (
                  disp.status === "em_analise" && (
                    <div className="flex items-center gap-1.5 text-xs text-morador-outline italic">
                      <MdInfo size={16} />
                      Aguardando resposta do gestor do programa.
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
