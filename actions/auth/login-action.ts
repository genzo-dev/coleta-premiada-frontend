"use server";

import { apiRequest } from "@/lib/api-request";
import { setTokens } from "@/lib/auth/manage-login";
import { LoginSchema } from "@/schemas/auth/login-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";

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

  // Busca as informações do usuário para redirecionar conforme o perfil
  const user = await getCurrentUser();
  if (user) {
    if (user.perfil === "supervisor") {
      redirect("/imoveis");
    } else if (user.perfil === "gestor") {
      redirect("/dashboard");
    } else if (user.perfil === "morador") {
      redirect("/morador");
    }
  }

  redirect("/");
}
