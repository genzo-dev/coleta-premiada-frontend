import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// Layout de controle que restringe o acesso somente aos usuários com perfil "supervisor"
export default async function SupervisorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  // Caso o perfil não seja supervisor, redireciona de volta para a raiz para verificação
  if (user?.perfil !== "supervisor") redirect("/");

  return <>{children}</>;
}
