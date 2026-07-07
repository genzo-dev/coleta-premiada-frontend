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

type EditarImovelState = {
  errors: string[];
  success: boolean;
};

export async function editarImovelAction(
  id: string | number,
  formData: CriarImovelDto & { ativo?: boolean },
): Promise<EditarImovelState> {
  // Valida os dados atualizados com o Schema do Zod
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

  // Envia a requisição PATCH para atualizar o imóvel no banco de dados do Core
  const response = await apiAuthenticatedRequest<Imovel>(
    `/api/program/properties/${id}`,
    {
      method: "PATCH",
      data: {
        ...parsed.data,
        ativo: formData.ativo !== undefined ? formData.ativo : true,
      },
    },
  );

  if (!response.success) {
    return { errors: response.errors, success: false };
  }

  revalidatePath("/imoveis");

  return { errors: [], success: true };
}
