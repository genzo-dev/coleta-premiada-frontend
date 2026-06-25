import { getCurrentUser } from "@/lib/auth/get-current-user";
import { redirect } from "next/navigation";

export default async function Home() {
  // Recupera o usuário logado atualmente
  const user = await getCurrentUser();

  // Se não estiver autenticado, envia para a página de login
  if (!user) redirect("/login");

  // Redireciona o usuário para o dashboard correto de acordo com o seu perfil
  if (user.perfil === "gestor") redirect("/gestor");
  if (user.perfil === "supervisor") redirect("/supervisor");
  if (user.perfil === "morador") redirect("/morador");

  // Fallback caso o perfil não corresponda a nenhum conhecido
  redirect("/login");
}
