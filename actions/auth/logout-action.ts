"use server";

import { redirect } from "next/navigation";
import { clearTokens } from "@/lib/auth/manage-login";

// Server Action responsável por limpar os cookies de sessão do usuário e redirecionar para a página de login
export async function logoutAction() {
  await clearTokens();
  redirect("/login");
}
