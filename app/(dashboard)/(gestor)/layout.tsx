import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// Layout de controle que restringe o acesso aos usuários com perfil "gestor" ou "gerente_geral"
export default async function GestorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  // Caso o perfil não seja gestor nem gerente_geral, redireciona de volta para a raiz para verificação
  if (!["gestor", "gerente_geral"].includes(user?.perfil ?? "")) redirect("/");

  return <>{children}</>;
}
