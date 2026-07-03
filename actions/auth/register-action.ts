"use server";

import { apiRequest } from "@/lib/api-request";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { setTokens } from "@/lib/auth/manage-login";
import { CreateUserSchema } from "@/schemas/user/create-user-schema";
import { PublicUser, PublicUserSchema, User } from "@/schemas/user/user-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

type RegisterActionState = {
  user: PublicUser;
  errors: string[];
  success: boolean;
};

export async function registerAction(
  state: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
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

  const registerResponse = await apiRequest<User>("/api/accounts/auth", {
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

  const loginRequestData = {
    email: parsedFormData.data.email,
    password: parsedFormData.data.password,
  };

  const loginResponse = await apiRequest<{
    access: string;
    refresh: string;
  }>("/api/token/", {
    method: "POST",
    data: loginRequestData,
  });

  if (!loginResponse.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: loginResponse.errors,
      success: false,
    };
  }

  await setTokens(loginResponse.data.access, loginResponse.data.refresh);

  let currentUser;

  try {
    currentUser = await getCurrentUser();
  } catch {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: ["Erro ao obter dados do usuário."],
      success: false,
    };
  }

  const roleToRedirect = currentUser?.perfil;

  if (!currentUser || !currentUser.perfil) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: ["Não foi possível identificar o perfil do usuário."],
      success: false,
    };
  }

  redirect(`/${roleToRedirect}`);
}
