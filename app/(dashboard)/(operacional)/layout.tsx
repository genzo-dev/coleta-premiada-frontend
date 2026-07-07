import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// Layout de controle que restringe o acesso aos perfis "gestor", "supervisor" e "gerente_geral"
export default async function OperacionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  // Caso o perfil não seja um dos perfis administrativos/operacionais, redireciona de volta para a raiz
  if (!["gestor", "supervisor", "gerente_geral"].includes(user?.perfil ?? ""))
    redirect("/");

  return <>{children}</>;
}
