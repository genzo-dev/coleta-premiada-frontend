import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import DashboardShell from "@/components/DashboardShell";

// Layout geral do dashboard que valida a sessão do usuário no servidor e injeta o shell de layout do cliente (DashboardShell)
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Obtém informações da sessão atual
  const user = await getCurrentUser();

  // Exige autenticação para acessar qualquer sub-rota do dashboard
  if (!user) redirect("/login");

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
