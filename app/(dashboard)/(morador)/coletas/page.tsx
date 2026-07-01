import * as React from "react"
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request"
import CollectionsTable from "@/components/CollectionsTable"

interface Coleta {
  id: number
  id_microservico: string
  imovel: number
  pontuacao: number
  data_hora_coleta: string
  peso_kg: string
}

interface CollectionsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Coleta[]
}

// Next.js App Router Page Component props typing for searchParams
interface PageProps {
  searchParams: Promise<{
    page?: string
    inicio?: string
    fim?: string
  }>
}

export default async function ColetasPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  
  const page = resolvedSearchParams.page || "1"
  const inicio = resolvedSearchParams.inicio || ""
  const fim = resolvedSearchParams.fim || ""

  // Monta a URL com os filtros adequados para a API do Backend Core
  let apiPath = `/api/collection/collections?page=${page}`
  if (inicio) apiPath += `&data_inicio=${inicio}`
  if (fim) apiPath += `&data_fim=${fim}`

  const response = await apiAuthenticatedRequest<CollectionsResponse>(apiPath)

  const collectionsData = response.success
    ? response.data
    : { count: 0, next: null, previous: null, results: [] }

  return (
    <div className="max-w-7xl mx-auto space-y-7 font-manrope">
      {/* Header */}
      <section className="space-y-1">
        <h1 className="text-3xl font-extrabold text-morador-primary tracking-tight">Histórico de Coletas</h1>
        <p className="text-sm text-morador-on-surface-variant">Acompanhe todos os seus registros de pesagem e pontos creditados no ciclo.</p>
      </section>

      {/* Tabela Interativa de Coletas */}
      <CollectionsTable
        initialData={collectionsData}
        currentPage={Number(page)}
        inicio={inicio}
        fim={fim}
      />
    </div>
  )
}
