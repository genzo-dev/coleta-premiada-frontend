"use server"

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request"

export async function getColetaEvidencesAction(coletaId: number) {
  const res = await apiAuthenticatedRequest<any[]>(`/api/collection/collections/${coletaId}/evidences`)
  if (!res.success) {
    return { success: false, errors: res.errors, data: [] }
  }
  return { success: true, errors: [], data: res.data }
}
