"use server";

import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import { CreateUserSchema } from "@/schemas/user/create-user-schema";
import { PublicUser, PublicUserSchema, User } from "@/schemas/user/user-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

type CreateUserActionState = {
  user: PublicUser;
  errors: string[];
  success: boolean;
};

export async function createUserAction(
  state: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  if (!(formData instanceof FormData)) {
    return {
      user: state?.user,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateUserSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  const registerResponse = await apiAuthenticatedRequest<User>("/api/accounts/users", {
    method: "POST",
    data: parsedFormData.data,
  });

  if (!registerResponse.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: registerResponse.errors,
      success: registerResponse.success,
    };
  }

  redirect("/usuarios");
}
