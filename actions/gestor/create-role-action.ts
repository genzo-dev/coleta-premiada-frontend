"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { CreateRoleSchema } from "@/schemas/gestor/create-role-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { revalidatePath } from "next/cache";

export type CreateRoleFormState = {
  nome: string;
  descricao?: string;
  ativo: boolean;
};

type CreateRoleActionState = {
  role: CreateRoleFormState;
  errors: string[];
  success: boolean;
};

export async function createRoleAction(
  state: CreateRoleActionState,
  formData: FormData,
): Promise<CreateRoleActionState> {
  if (!(formData instanceof FormData)) {
    return {
      role: state.role,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsed = CreateRoleSchema.safeParse(formObj);

  if (!parsed.success) {
    return {
      role: formObj as unknown as CreateRoleFormState,
      errors: getZodErrorMessages(parsed.error.format()),
      success: false,
    };
  }

  const res = await apiAuthenticatedRequest("/api/accounts/roles", {
    method: "POST",
    data: parsed.data,
  });

  if (!res.success) {
    return {
      role: parsed.data,
      errors: res.errors,
      success: false,
    };
  }

  revalidatePath("/usuarios/roles");
  return {
    role: { nome: "", descricao: "", ativo: true },
    errors: [],
    success: true,
  };
}
