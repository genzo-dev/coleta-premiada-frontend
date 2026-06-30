import { getCurrentUser } from "@/lib/auth/get-current-user";
import { Leaf } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Home() {
  // Recupera o usuário logado atualmente
  const user = await getCurrentUser();

  return (
    <>
      <nav className="bg-green-700">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/20">
            <Leaf className="text-white" size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Coleta Premiada</p>
          </div>
        </div>
        <div></div>
        <div></div>
      </nav>
    </>
  );

  // // Se não estiver autenticado, envia para a página de login
  // if (!user) redirect("/login");

  // // Redireciona o usuário para o dashboard correto de acordo com o seu perfil
  // if (user.perfil === "gestor") redirect("/gestor");
  // if (user.perfil === "supervisor") redirect("/supervisor");
  // if (user.perfil === "morador") redirect("/morador");

  // // Fallback caso o perfil não corresponda a nenhum conhecido
  // redirect("/login");
}
