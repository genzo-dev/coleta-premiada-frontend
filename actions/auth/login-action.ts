"use server";

import { apiRequest } from "@/lib/api-request";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { setTokens } from "@/lib/auth/manage-login";
import { LoginSchema } from "@/schemas/auth/login-schema";
import { PublicUserSchema } from "@/schemas/user/user-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

type LoginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(
  state: LoginActionState | undefined,
  formData: FormData,
) {
  if (!(formData instanceof FormData)) {
    return {
      email: "",
      errors: ["Dados inválidos"],
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const formUser = formObj?.email?.toString() || "";

  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      email: formUser,
      errors: getZodErrorMessages(parsedFormData.error.format()),
    };
  }

  const loginResponse = await apiRequest<{
    access: string;
    refresh: string;
  }>("/api/token/", {
    method: "POST",
    data: parsedFormData.data,
  });

  if (!loginResponse.success) {
    return {
      email: formUser,
      errors: loginResponse.errors,
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
