import HeroSection from "@/components/HomePage/HeroSection";
import HowToWorkSection from "@/components/HomePage/HowToWorkSection";
import CallToActionSection from "@/components/HomePage/CallToActionSection";
import MaterialsSection from "@/components/HomePage/MaterialsSection";
import Navbar from "@/components/HomePage/Navbar";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export default async function Home() {
  // Recupera o usuário logado atualmente
  const user = await getCurrentUser();

  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="flex flex-col gap-12 md:gap-24 px-4 sm:px-6 lg:px-8 mt-12">
        <HowToWorkSection />
        <MaterialsSection />
      </div>
      <CallToActionSection />
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
