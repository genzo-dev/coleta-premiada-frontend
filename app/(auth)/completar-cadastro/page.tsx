import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import GoogleCadastroComplementarForm from "@/components/GoogleCadastroComplementarForm";
import { ClipboardList } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Completar cadastro",
};

export default async function CompletarCadastroPage() {
  const user = await getCurrentUser();

  // Não autenticado → volta para o login
  if (!user) redirect("/login");

  // Cadastro já completo → vai para a área correta
  if (user.cadastro_completo) {
    if (user.perfil === "gerente_geral") redirect("/usuarios");
    if (user.perfil === "gestor") redirect("/dashboard");
    if (user.perfil === "supervisor") redirect("/imoveis");
    redirect("/morador");
  }

  return (
    <div className="w-full max-w-[440px] px-8">
      <div className="font-bold text-lg uppercase flex items-center gap-2 mb-2 text-foreground">
        <ClipboardList className="w-6 h-6" />
        Completar cadastro
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Para continuar, precisamos de mais algumas informações. Elas são
        necessárias para identificar você no sistema.
      </p>

      <GoogleCadastroComplementarForm />
    </div>
  );
}
