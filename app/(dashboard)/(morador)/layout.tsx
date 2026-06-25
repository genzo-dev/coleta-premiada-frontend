import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// Layout de controle que restringe o acesso somente aos usuários com perfil "morador"
export default async function MoradorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  // Caso o perfil não seja morador, redireciona de volta para a raiz para verificação
  if (user?.perfil !== "morador") redirect("/");

  return <>{children}</>;
}
