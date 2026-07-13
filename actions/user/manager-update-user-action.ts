"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { ManagerUpdateUserSchema } from "@/schemas/user/manager-update-user-schema";
import { User } from "@/schemas/user/user-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

export type ManagerUpdateUserFormState = {
  nome: string;
  cpf?: string | null;
  perfil: string;
  cidade?: number | null;
  ativo?: boolean;
};

type ManagerUpdateUserActionState = {
  user: ManagerUpdateUserFormState;
  errors: string[];
  success: boolean;
};

export async function managerUpdateUserAction(
  state: ManagerUpdateUserActionState,
  formData: FormData,
): Promise<ManagerUpdateUserActionState> {
  if (!(formData instanceof FormData)) {
    return {
      user: state?.user,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const rawId = formData.get("id");

  if (!rawId) {
    return {
      user: state?.user,
      errors: ["ID não informado"],
      success: false,
    };
  }

  const id = Number(rawId);

  if (Number.isNaN(id)) {
    return {
      user: state?.user,
      errors: ["ID inválido"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = ManagerUpdateUserSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      user: formObj as unknown as ManagerUpdateUserFormState,
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  const registerResponse = await apiAuthenticatedRequest<User>(
    `/api/accounts/users/${id}`,
    {
      method: "PATCH",
      data: parsedFormData.data,
    },
  );

  if (!registerResponse.success) {
    return {
      user: parsedFormData.data,
      errors: registerResponse.errors,
      success: registerResponse.success,
    };
  }

  redirect("/usuarios");
}
