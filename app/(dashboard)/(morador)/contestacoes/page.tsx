import * as React from "react"
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request"
import DisputesView from "@/components/DisputesView"

interface Coleta {
  id: number
  id_microservico: string
  peso_kg: string
  pontuacao: number
  data_hora_coleta: string
}

interface ColetasResponse {
  count: number
  results: Coleta[]
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

interface DisputesResponse {
  count: number
  results: Contestacao[]
}

export default async function ContestacoesPage() {
  // Busca lista de contestações
  const disputesRes = await apiAuthenticatedRequest<DisputesResponse>("/api/collection/disputes")
  const disputes = disputesRes.success ? disputesRes.data.results : []

  // Busca coletas do morador para carregar no select do formulário de abertura
  const coletasRes = await apiAuthenticatedRequest<ColetasResponse>("/api/collection/collections?limit=100")
  const coletas = coletasRes.success ? coletasRes.data.results : []

  return (
    <div className="max-w-4xl mx-auto space-y-7 font-manrope">
      {/* Header */}
      <section className="space-y-1">
        <h1 className="text-3xl font-extrabold text-morador-primary tracking-tight">Contestações</h1>
        <p className="text-sm text-morador-on-surface-variant">Acompanhe suas solicitações abertas ou conteste pesagens do seu imóvel.</p>
      </section>

      {/* View de Contestações */}
      <DisputesView initialDisputes={disputes} coletas={coletas} />
    </div>
  )
}
