"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import {
  UpdateUserDto,
  UpdateUserSchema,
} from "@/schemas/user/update-user-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

export type UpdateUserFormState = {
  nome: string;
  cpf: string;
};

type UpdateUserActionState = {
  user: UpdateUserFormState;
  errors: string[];
  success: boolean;
};

export async function updateUserAction(
  state: UpdateUserActionState,
  formData: FormData,
): Promise<UpdateUserActionState> {
  if (!(formData instanceof FormData)) {
    return {
      user: state?.user,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = UpdateUserSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      user: formObj as unknown as UpdateUserFormState,
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  const registerResponse = await apiAuthenticatedRequest<UpdateUserDto>(
    "/api/accounts/auth/me",
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

  redirect(`/perfil`);
}
