"use server";

import { apiRequest } from "@/lib/api-request";
import { setTokens } from "@/lib/auth/manage-login";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";

type GoogleAuthActionState = {
  code: string;
  redirect_uri: string;
  errors: string[];
};

export default async function googleAuthAction(
  state: GoogleAuthActionState | undefined,
) {
  if (!state?.code || !state?.redirect_uri) {
    return {
      code: "",
      redirect_uri: "",
      errors: ["Código do Google não fornecido"],
    };
  }

  const response = await apiRequest<{
    access: string;
    refresh: string;
    cadastro_completo: boolean;
  }>("/api/accounts/auth/google", {
    method: "POST",
    data: {
      code: state?.code,
      redirect_uri: state?.redirect_uri,
    },
  });

  if (!response.success) {
    return {
      code: state?.code || "",
      redirect_uri: state?.redirect_uri || "",
      errors: response.errors,
    };
  }

  await setTokens(response.data.access, response.data.refresh);

  // Usuário novo via Google: redireciona para o cadastro complementar obrigatório
  if (!response.data.cadastro_completo) {
    redirect("/completar-cadastro");
  }

  // Usuário já cadastrado: redireciona conforme o perfil
  const user = await getCurrentUser();
  if (user) {
    if (user.perfil === "supervisor") redirect("/imoveis");
    if (user.perfil === "gestor") redirect("/dashboard");
    if (user.perfil === "morador") redirect("/morador");
  }

  redirect("/");
}
