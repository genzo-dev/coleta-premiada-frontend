"use server";

import { apiRequest } from "@/lib/api-request";
import { setTokens } from "@/lib/auth/manage-login";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { redirect } from "next/navigation";

type State = {
  token: string;
  errors: string[];
};

export async function definirSenhaAction(
  state: State,
  formData: FormData,
): Promise<State> {
  const password = formData.get("password") as string;
  const password2 = formData.get("password2") as string;

  if (!password || password.length < 8) {
    return { ...state, errors: ["A senha deve ter no mínimo 8 caracteres."] };
  }

  if (password !== password2) {
    return { ...state, errors: ["As senhas não coincidem."] };
  }

  const response = await apiRequest<{
    access: string;
    refresh: string;
    cadastro_completo: boolean;
  }>("/api/accounts/auth/definir-senha", {
    method: "POST",
    data: { token: state.token, password },
  });

  if (!response.success) {
    return { ...state, errors: response.errors };
  }

  await setTokens(response.data.access, response.data.refresh);

  const user = await getCurrentUser();
  if (user?.perfil === "gerente_geral") redirect("/usuarios");
  if (user?.perfil === "gestor") redirect("/dashboard");
  if (user?.perfil === "supervisor") redirect("/imoveis");
  redirect("/");
}
