"use server"

import { revalidatePath } from "next/cache"
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request"

type DisputeActionState = {
  success?: boolean
  errors: string[]
}

export async function createDisputeAction(
  state: DisputeActionState | undefined,
  payload: { coleta: number; motivo: string }
): Promise<DisputeActionState> {
  if (!payload.coleta) {
    return { success: false, errors: ["Selecione uma coleta válida."] }
  }
  if (!payload.motivo || payload.motivo.trim().length < 10) {
    return { success: false, errors: ["O motivo deve ter pelo menos 10 caracteres."] }
  }

  const res = await apiAuthenticatedRequest("/api/collection/disputes", {
    method: "POST",
    data: payload,
  })

  if (!res.success) {
    return { success: false, errors: res.errors }
  }

  revalidatePath("/contestacoes")
  return { success: true, errors: [] }
}
