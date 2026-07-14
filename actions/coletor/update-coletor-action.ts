'use server'

import { apiCollectionAuthenticatedRequest } from '@/lib/api-collection-authenticated-request'
import { revalidatePath } from 'next/cache'
import type { Coletor } from './list-coletores-action'

export type UpdateColetorInput = {
  nome?: string
  email?: string
  zona?: string
  cargo?: string
}

export async function updateColetorAction(
  id: string,
  data: UpdateColetorInput,
): Promise<{ coletor?: Coletor; error?: string }> {
  const response = await apiCollectionAuthenticatedRequest<Coletor>(
    `/api/gestao/coletores/${id}`,
    {
      method: 'PATCH',
      data,
    },
  )

  if (!response.success) {
    return { error: response.errors?.[0] ?? 'Erro ao atualizar coletor' }
  }

  revalidatePath('/coletores')
  return { coletor: response.data }
}
