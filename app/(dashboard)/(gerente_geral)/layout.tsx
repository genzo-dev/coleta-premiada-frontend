import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// Layout de controle que restringe o acesso somente aos usuários com perfil "gerente_geral"
export default async function GerenteGeralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  // Caso o perfil não seja gerente_geral, redireciona de volta para a raiz para verificação
  if (user?.perfil !== "gerente_geral") redirect("/");

  return <>{children}</>;
}
