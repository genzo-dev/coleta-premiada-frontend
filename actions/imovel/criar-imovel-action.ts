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
  formData: CriarImovelDto,
): Promise<CriarImovelState> {
  const parsed = CriarImovelSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      errors: getZodErrorMessages(parsed.error.format()),
      success: false,
    };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { errors: ["Sessão expirada. Faça login novamente."], success: false };
  }

  const response = await apiAuthenticatedRequest<Imovel>(
    "/api/program/properties",
    {
      method: "POST",
      data: { ...parsed.data, titular: user.id },
    },
  );

  if (!response.success) {
    return { errors: response.errors, success: false };
  }

  revalidatePath("/imovel");

  return { errors: [], success: true };
}
