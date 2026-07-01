"use server"

import { revalidatePath } from "next/cache"
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { CreatePropertySchema } from "@/schemas/program/create-property-schema"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"

type PropertyActionState = {
  success?: boolean
  errors: string[]
}

// Helper to generate a random unique enrollment number (inscrição imobiliária)
function generateRandomInscricao(): string {
  const p1 = String(Math.floor(Math.random() * 90 + 10))
  const p2 = String(Math.floor(Math.random() * 90 + 10))
  const p3 = String(Math.floor(Math.random() * 900 + 100))
  const p4 = String(Math.floor(Math.random() * 9000 + 1000))
  const p5 = String(Math.floor(Math.random() * 900 + 100))
  return `${p1}.${p2}.${p3}.${p4}.${p5}`
}

export async function createPropertyAction(
  state: PropertyActionState | undefined,
  formData: FormData
): Promise<PropertyActionState> {
  if (!(formData instanceof FormData)) {
    return { success: false, errors: ["Dados inválidos"] }
  }

  const formObj = Object.fromEntries(formData.entries())
  const parsed = CreatePropertySchema.safeParse(formObj)

  if (!parsed.success) {
    return {
      success: false,
      errors: getZodErrorMessages(parsed.error.format()),
    }
  }

  const user = await getCurrentUser()
  if (!user) {
    return { success: false, errors: ["Usuário não autenticado."] }
  }

  const payload = {
    ...parsed.data,
    inscricao: generateRandomInscricao(),
    titular: user.id,
    ativo: true,
  }

  const response = await apiAuthenticatedRequest("/api/program/properties", {
    method: "POST",
    data: payload,
  })

  if (!response.success) {
    return {
      success: false,
      errors: response.errors,
    }
  }

  // Revalida as rotas do morador
  revalidatePath("/meu-imovel")
  revalidatePath("/imovel")
  revalidatePath("/morador")
  revalidatePath("/dashboard")

  return {
    success: true,
    errors: [],
  }
}
