'use server'

import { apiCollectionAuthenticatedRequest } from '@/lib/api-collection-authenticated-request'
import { revalidatePath } from 'next/cache'
import type { Coletor } from './list-coletores-action'

export type CreateColetorInput = {
  matricula: string
  senha: string
  nome: string
  email: string
  zona: string
  cargo?: string
}

export async function createColetorAction(
  data: CreateColetorInput,
): Promise<{ coletor?: Coletor; error?: string }> {
  const response = await apiCollectionAuthenticatedRequest<Coletor>(
    '/api/gestao/coletores',
    {
      method: 'POST',
      data,
    },
  )

  if (!response.success) {
    return { error: response.errors?.[0] ?? 'Erro ao criar coletor' }
  }

  revalidatePath('/coletores')
  return { coletor: response.data }
}
