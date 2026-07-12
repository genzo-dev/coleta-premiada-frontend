"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import {
  CriarImovelSchema,
  type CriarImovelDto,
} from "@/schemas/imovel/criar-imovel-schema";
import { Imovel } from "@/types/entities/imovel";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { revalidatePath } from "next/cache";

type CriarImovelState = {
  errors: string[];
  success: boolean;
};

export async function criarImovelAction(
  formData: CriarImovelDto & { titular?: number | string },
): Promise<CriarImovelState> {
  // Valida os dados recebidos do formulário de acordo com as regras definidas no Schema do Zod
  const parsed = CriarImovelSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      errors: getZodErrorMessages(parsed.error.format()),
      success: false,
    };
  }

  // Verifica se o usuário atual está autenticado no sistema
  const user = await getCurrentUser();
  if (!user) {
    return { errors: ["Sessão expirada. Faça login novamente."], success: false };
  }

  // Envia a requisição POST para registrar o imóvel no banco de dados do Core
  const response = await apiAuthenticatedRequest<Imovel>(
    "/api/program/properties",
    {
      method: "POST",
      data: {
        ...parsed.data,
        titular: formData.titular || user.id,
      },
    },
  );

  if (!response.success) {
    return { errors: response.errors, success: false };
  }

  revalidatePath("/imovel");
  revalidatePath("/imoveis");

  return { errors: [], success: true };
}
