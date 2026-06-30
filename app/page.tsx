import HeroSection from "@/components/HomePage/HeroSection";
import HowToWorkSection from "@/components/HomePage/HowToWorkSection";
import Navbar from "@/components/HomePage/Navbar";
import DefaultLink from "@/components/Link";
import Sidebar from "@/components/Sidebar";
import HamburgerButton from "@/components/Sidebar/HamburgerButton";
import { SidebarProvider } from "@/components/Sidebar/sidebar-context";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { ArrowLeftIcon, ArrowRightIcon, Leaf } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  // Recupera o usuário logado atualmente
  const user = await getCurrentUser();

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <HowToWorkSection />
      </div>
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
