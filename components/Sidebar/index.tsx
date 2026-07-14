"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import type { IconType } from "react-icons";
import {
  MdApartment,
  MdAssessment,
  MdAssignment,
  MdCardGiftcard,
  MdDoneAll,
  MdGavel,
  MdHome,
  MdLocationCity,
  MdPeople,
  MdPerson,
  MdRecycling,
  MdSecurity,
  MdSpaceDashboard,
  MdTune,
} from "react-icons/md";
import type { User } from "@/schemas/user/user-schema";
import SidebarFrame from "./SidebarFrame";

type NavItem = {
  label: string;
  href: string;
  icon: IconType;
};

// Retorna a lista de navegação lateral contendo os ícones e rotas corretas para cada tipo de perfil de usuário.
function getNavItems(perfil: string): NavItem[] {
  switch (perfil) {
    case "morador":
      return [
        { label: "Dashboard", href: "/morador", icon: MdSpaceDashboard },
        { label: "Meu Imóvel", href: "/imovel", icon: MdHome },
        { label: "Coletas", href: "/coletas", icon: MdRecycling },
        { label: "Benefícios", href: "/beneficios", icon: MdCardGiftcard },
        { label: "Contestações", href: "/contestacoes", icon: MdGavel },
        { label: "Perfil", href: "/perfil", icon: MdPerson },
      ];
    case "supervisor":
      return [
        { label: "Imóveis", href: "/imoveis", icon: MdApartment },
        { label: "Coletas", href: "/coletas", icon: MdRecycling },
        {
          label: "Contestações",
          href: "/analise-contestacoes",
          icon: MdGavel,
        },
        {
          label: "Constante de Pontuação",
          href: "/constante-pontuacao",
          icon: MdTune,
        },
        { label: "Benefícios", href: "/saldos-pontos", icon: MdCardGiftcard },
        { label: "Perfil", href: "/perfil", icon: MdPerson },
      ];
    case "gestor":
      return [
        { label: "Dashboard", href: "/gestor", icon: MdSpaceDashboard },
        { label: "Usuários", href: "/usuarios", icon: MdPeople },
        { label: "Imóveis", href: "/imoveis", icon: MdApartment },
        { label: "Programas", href: "/programas", icon: MdAssignment },
        { label: "Coletas", href: "/coletas", icon: MdRecycling },
        {
          label: "Constante de Pontuação",
          href: "/constante-pontuacao",
          icon: MdTune,
        },
        {
          label: "Contestações",
          href: "/analise-contestacoes",
          icon: MdGavel,
        },
        { label: "Consolidação", href: "/consolidacao", icon: MdDoneAll },
        { label: "Relatórios", href: "/relatorios", icon: MdAssessment },
        { label: "Benefícios", href: "/saldos-pontos", icon: MdCardGiftcard },
        { label: "Auditoria", href: "/auditoria", icon: MdSecurity },
        { label: "Perfil", href: "/perfil", icon: MdPerson },
      ];
    case "gerente_geral":
      return [
        {
          label: "Dashboard",
          href: "/gerente-geral",
          icon: MdSpaceDashboard,
        },
        { label: "Usuários", href: "/usuarios", icon: MdPeople },
        { label: "Cidades", href: "/cidades", icon: MdLocationCity },
        { label: "Imóveis", href: "/imoveis", icon: MdApartment },
        { label: "Programas", href: "/programas", icon: MdAssignment },
        { label: "Coletas", href: "/coletas", icon: MdRecycling },
        {
          label: "Contestações",
          href: "/analise-contestacoes",
          icon: MdGavel,
        },
        { label: "Relatórios", href: "/relatorios", icon: MdAssessment },
        { label: "Benefícios", href: "/saldos-pontos", icon: MdCardGiftcard },
        { label: "Auditoria", href: "/auditoria", icon: MdSecurity },
        { label: "Perfil", href: "/perfil", icon: MdPerson },
      ];
    default:
      return [];
  }
}

// Menu lateral que utiliza o SidebarFrame para o comportamento responsivo (overlay/slide-in no mobile).
export default function Sidebar({
  user,
  openDisputesCount = 0,
}: {
  user: User;
  openDisputesCount?: number;
}) {
  const navItems = getNavItems(user.perfil);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <SidebarFrame>
      <div className="flex h-full w-full flex-col overflow-y-auto bg-[#1A5538]">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/20">
            <Leaf className="text-white" size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Coleta Premiada</p>
            <p className="text-[10px] text-white/50">Portal do Cidadão</p>
          </div>
        </div>

        <nav className="flex flex-1 justify-between flex-col gap-1 p-3">
          <div>
            {navItems.map(({ label, href, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium transition ${
                    active
                      ? "bg-white/15 text-white font-semibold"
                      : "text-white/65 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    {label}
                  </div>
                  {label === "Contestações" && openDisputesCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {openDisputesCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          <div>
            <Link
              href="/"
              className={`flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium transition ${
                pathname === "/"
                  ? "bg-white/15 text-white font-semibold"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              <MdHome size={18} /> Página Inicial
            </Link>
          </div>
        </nav>
      </div>
    </SidebarFrame>
  );
}
