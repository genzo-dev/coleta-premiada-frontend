"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getColetaEvidencesAction } from "@/actions/collection/collection-actions"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { MdRecycling, MdChevronRight, MdChevronLeft, MdFilterList, MdCalendarToday, MdInfo, MdPhoto } from "react-icons/md"
import { Loader2 } from "lucide-react"

interface Coleta {
  id: number
  id_microservico: string
  imovel: number
  pontuacao: number
  data_hora_coleta: string
  peso_kg: string
}

interface Evidence {
  id: number
  coleta: number
  descricao: string
  arquivo_url: string
  enviada_em: string
  enviada_por: number
}

interface CollectionsTableProps {
  initialData: {
    count: number
    results: Coleta[]
  }
  currentPage: number
  inicio: string
  fim: string
}

export default function CollectionsTable({
  initialData,
  currentPage,
  inicio: initialInicio,
  fim: initialFim,
}: CollectionsTableProps) {
  const router = useRouter()
  const [inicio, setInicio] = useState(initialInicio)
  const [fim, setFim] = useState(initialFim)
  const [selectedColeta, setSelectedColeta] = useState<Coleta | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [evidences, setEvidences] = useState<Evidence[]>([])
  const [isLoadingEvidences, setIsLoadingEvidences] = useState(false)

  // Load evidences when a coleta is selected and sheet opens
  useEffect(() => {
    if (selectedColeta && isSheetOpen) {
      setIsLoadingEvidences(true)
      getColetaEvidencesAction(selectedColeta.id)
        .then((res) => {
          if (res.success) {
            setEvidences(res.data || [])
          } else {
            setEvidences([])
          }
        })
        .catch((err) => {
          console.error("Failed to load evidences:", err)
          setEvidences([])
        })
        .finally(() => {
          setIsLoadingEvidences(false)
        })
    }
  }, [selectedColeta, isSheetOpen])

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set("page", "1")
    if (inicio) params.set("inicio", inicio)
    if (fim) params.set("fim", fim)
    router.push(`/coletas?${params.toString()}`)
  }

  const handleClearFilters = () => {
    setInicio("")
    setFim("")
    router.push("/coletas?page=1")
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams()
    params.set("page", newPage.toString())
    if (inicio) params.set("inicio", inicio)
    if (fim) params.set("fim", fim)
    router.push(`/coletas?${params.toString()}`)
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
    } catch {
      return dateStr
    }
  }

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    } catch {
      return ""
    }
  }

  const totalPages = Math.ceil(initialData.count / 20) || 1

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="bg-white border border-morador-outline-variant/30 p-5 rounded-xl shadow-sm">
        <form onSubmit={handleFilterSubmit} className="flex flex-col md:flex-row items-end gap-4">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inicio" className="text-xs font-bold text-morador-primary">Data Início</Label>
              <Input
                id="inicio"
                type="date"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fim" className="text-xs font-bold text-morador-primary">Data Fim</Label>
              <Input
                id="fim"
                type="date"
                value={fim}
                onChange={(e) => setFim(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Button type="submit" className="flex-1 md:flex-none bg-[#003629] text-white hover:bg-emerald-950 px-5 rounded-xl font-bold gap-2">
              <MdFilterList size={18} />
              Filtrar
            </Button>
            {(initialInicio || initialFim) && (
              <Button type="button" variant="outline" onClick={handleClearFilters} className="rounded-xl border border-morador-outline-variant/30 text-morador-on-surface-variant font-bold">
                Limpar
              </Button>
            )}
          </div>
        </form>
      </Card>

      {/* Tabela de Coletas */}
      <Card className="bg-white border border-morador-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
        {initialData.results.length === 0 ? (
          <div className="text-center py-12 text-morador-on-surface-variant">
            Nenhuma coleta localizada com os filtros selecionados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-morador-surface-container-low border-b border-morador-outline-variant/20">
                  <th className="px-6 py-4 text-xs font-bold text-morador-on-surface-variant">Data</th>
                  <th className="px-6 py-4 text-xs font-bold text-morador-on-surface-variant">Horário</th>
                  <th className="px-6 py-4 text-xs font-bold text-morador-on-surface-variant">Peso</th>
                  <th className="px-6 py-4 text-xs font-bold text-morador-on-surface-variant">Pontuação</th>
                  <th className="px-6 py-4 text-xs font-bold text-morador-on-surface-variant">Status</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-morador-outline-variant/10">
                {initialData.results.map((coleta) => (
                  <tr
                    key={coleta.id}
                    onClick={() => {
                      setSelectedColeta(coleta)
                      setIsSheetOpen(true)
                    }}
                    className="group hover:bg-morador-surface-container-low transition-colors duration-150 cursor-pointer"
                  >
                    <td className="px-6 py-4 font-bold text-morador-primary text-sm">
                      {formatDate(coleta.data_hora_coleta)}
                    </td>
                    <td className="px-6 py-4 text-morador-on-surface-variant text-sm">
                      {formatTime(coleta.data_hora_coleta)}
                    </td>
                    <td className="px-6 py-4 text-morador-primary font-semibold text-sm">
                      {coleta.peso_kg} kg
                    </td>
                    <td className="px-6 py-4 text-morador-secondary font-bold text-sm">
                      +{coleta.pontuacao} pts
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge variant="confirmado">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] inline-block" />
                        Confirmado
                      </StatusBadge>
                    </td>
                    <td className="pr-4 text-morador-outline group-hover:translate-x-0.5 transition-transform">
                      <MdChevronRight size={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Controles de Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-white border border-morador-outline-variant/30 rounded-xl p-4 shadow-sm">
          <Button
            variant="outline"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="rounded-xl border-morador-outline-variant/30 text-morador-primary font-bold gap-1.5"
          >
            <MdChevronLeft size={20} />
            Anterior
          </Button>

          <span className="text-xs font-bold text-morador-outline uppercase tracking-wider">
            Página {currentPage} de {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="rounded-xl border-morador-outline-variant/30 text-morador-primary font-bold gap-1.5"
          >
            Próximo
            <MdChevronRight size={20} />
          </Button>
        </div>
      )}

      {/* Informações adicionais */}
      <div className="flex items-start gap-4 p-4 bg-morador-primary/5 rounded-xl border border-morador-primary/10">
        <MdInfo className="text-morador-primary mt-0.5 shrink-0" size={20} />
        <p className="text-xs text-morador-on-surface-variant">
          As coletas são validadas automaticamente pelo sistema. Se você discordar da pesagem ou notar divergências na pontuação, poderá abrir uma contestação na aba de Contestações.
        </p>
      </div>

      {/* Sheet Lateral de Detalhes da Coleta */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-md bg-white border-l border-morador-outline-variant/20 p-6 flex flex-col gap-6 overflow-y-auto">
          <SheetHeader className="border-b border-morador-outline-variant/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-morador-surface-container rounded-lg flex items-center justify-center text-morador-primary">
                <MdRecycling size={24} />
              </div>
              <div>
                <SheetTitle className="text-lg font-bold text-morador-primary">Detalhes da Coleta</SheetTitle>
                <SheetDescription className="text-xs">Registro de pesagem do seu imóvel</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {selectedColeta && (
            <div className="flex-1 space-y-6">
              {/* Informações Numéricas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-morador-surface-container-low rounded-xl border border-morador-outline-variant/10">
                  <p className="text-[10px] font-bold text-morador-outline uppercase tracking-wider">Peso Coletado</p>
                  <p className="text-xl font-extrabold text-morador-primary mt-1">{selectedColeta.peso_kg} kg</p>
                </div>
                <div className="p-4 bg-[#E8F5E9]/50 rounded-xl border border-[#C8E6C9]/30">
                  <p className="text-[10px] font-bold text-[#2E7D32] uppercase tracking-wider">Pontos Gerados</p>
                  <p className="text-xl font-extrabold text-[#2E7D32] mt-1">+{selectedColeta.pontuacao} pts</p>
                </div>
              </div>

              {/* Tabela de Metadados */}
              <div className="space-y-4 border-t border-b border-morador-outline-variant/10 py-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-morador-on-surface-variant font-medium">Data</span>
                  <span className="text-morador-primary font-bold">{formatDate(selectedColeta.data_hora_coleta)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-morador-on-surface-variant font-medium">Horário</span>
                  <span className="text-morador-primary font-bold">{formatTime(selectedColeta.data_hora_coleta)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-morador-on-surface-variant font-medium">ID do Registro</span>
                  <span className="text-morador-outline font-mono text-xs select-all">#{selectedColeta.id_microservico}</span>
                </div>
              </div>

              {/* Galeria de Evidências */}
              <div className="space-y-3">
                <h5 className="text-sm font-bold text-morador-primary flex items-center gap-1.5">
                  <MdPhoto size={18} />
                  Evidências Fotográficas
                </h5>

                {isLoadingEvidences ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                  </div>
                ) : evidences.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-6 border border-dashed border-morador-outline-variant/40 rounded-xl text-morador-outline text-center">
                    <MdPhoto size={36} className="opacity-40" />
                    <p className="text-xs mt-2">Nenhuma evidência fotográfica anexada.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {evidences.map((ev) => (
                      <div
                        key={ev.id}
                        className="group relative h-28 rounded-xl overflow-hidden border border-morador-outline-variant/30 cursor-pointer"
                        onClick={() => window.open(ev.arquivo_url, "_blank")}
                        title={ev.descricao || "Visualizar imagem"}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ev.arquivo_url}
                          alt={ev.descricao || "Evidência de Coleta"}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-end p-2">
                          <span className="text-[10px] text-white font-medium truncate w-full">
                            {ev.descricao || "Ver Imagem"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <SheetFooter className="border-t border-morador-outline-variant/10 pt-4">
            <SheetClose asChild>
              <Button className="w-full bg-morador-surface-container hover:bg-morador-surface-container-high text-morador-primary font-bold rounded-xl h-11">
                Fechar Detalhes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
