'use server'

import { apiCollectionAuthenticatedRequest } from '@/lib/api-collection-authenticated-request'
import { revalidatePath } from 'next/cache'
import type { Coletor } from './list-coletores-action'

export async function toggleColetorAtivoAction(
  id: string,
  ativo: boolean,
): Promise<{ coletor?: Coletor; error?: string }> {
  const response = await apiCollectionAuthenticatedRequest<Coletor>(
    `/api/gestao/coletores/${id}`,
    {
      method: 'PATCH',
      data: { ativo },
    },
  )

  if (!response.success) {
    return { error: response.errors?.[0] ?? 'Erro ao atualizar status do coletor' }
  }

  revalidatePath('/coletores')
  return { coletor: response.data }
}
