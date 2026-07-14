'use server'

import { apiCollectionAuthenticatedRequest } from '@/lib/api-collection-authenticated-request'

export type Coletor = {
  id: string
  nome: string
  matricula: string
  email: string
  avatar_url: string | null
  zona: string
  cargo: string
  ativo: boolean
  criado_em: string
}

export async function listColetoresAction(params?: {
  search?: string
  ativo?: boolean
}): Promise<{ coletores: Coletor[]; error?: string }> {
  const query = new URLSearchParams()
  if (params?.search) query.set('search', params.search)
  if (params?.ativo !== undefined) query.set('ativo', String(params.ativo))

  const qs = query.toString()
  const path = `/api/gestao/coletores${qs ? `?${qs}` : ''}`

  const response = await apiCollectionAuthenticatedRequest<Coletor[]>(path, {
    method: 'GET',
  })

  if (!response.success) {
    return { coletores: [], error: response.errors?.[0] ?? 'Erro ao carregar coletores' }
  }

  return { coletores: response.data ?? [] }
}
