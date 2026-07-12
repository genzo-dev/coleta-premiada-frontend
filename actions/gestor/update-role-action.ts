"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { CreateRoleSchema } from "@/schemas/gestor/create-role-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { revalidatePath } from "next/cache";

export type UpdateRoleFormState = {
  nome: string;
  descricao?: string;
  ativo: boolean;
};

type UpdateRoleActionState = {
  role: UpdateRoleFormState;
  errors: string[];
  success: boolean;
};

export async function updateRoleAction(
  state: UpdateRoleActionState,
  formData: FormData,
): Promise<UpdateRoleActionState> {
  if (!(formData instanceof FormData)) {
    return {
      role: state.role,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const rawId = formData.get("id");

  if (!rawId) {
    return {
      role: state.role,
      errors: ["ID não informado"],
      success: false,
    };
  }

  const id = Number(rawId);

  if (Number.isNaN(id)) {
    return {
      role: state.role,
      errors: ["ID inválido"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsed = CreateRoleSchema.safeParse(formObj);

  if (!parsed.success) {
    return {
      role: formObj as unknown as UpdateRoleFormState,
      errors: getZodErrorMessages(parsed.error.format()),
      success: false,
    };
  }

  const res = await apiAuthenticatedRequest(`/api/accounts/roles/${id}`, {
    method: "PATCH",
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
    role: parsed.data,
    errors: [],
    success: true,
  };
}
