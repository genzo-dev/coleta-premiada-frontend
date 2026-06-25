"use client";

import Link from "next/link";
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
        { label: "Meu Imóvel", href: "/meu-imovel", icon: MdHome },
        { label: "Coletas", href: "/coletas", icon: MdRecycling },
        { label: "Benefícios", href: "/beneficios", icon: MdCardGiftcard },
        { label: "Contestações", href: "/contestacoes", icon: MdGavel },
        { label: "Perfil", href: "/perfil", icon: MdPerson },
      ];
    case "supervisor":
      return [
        { label: "Dashboard", href: "/supervisor", icon: MdSpaceDashboard },
        { label: "Imóveis", href: "/imoveis", icon: MdApartment },
        { label: "Coletas", href: "/coletas", icon: MdRecycling },
        {
          label: "Constante de Pontuação",
          href: "/constante-pontuacao",
          icon: MdTune,
        },
        { label: "Relatórios", href: "/relatorios", icon: MdAssessment },
        { label: "Benefícios", href: "/beneficios", icon: MdCardGiftcard },
        { label: "Perfil", href: "/perfil", icon: MdPerson },
      ];
    case "gestor":
      return [
        { label: "Dashboard", href: "/gestor", icon: MdSpaceDashboard },
        { label: "Usuários", href: "/usuarios", icon: MdPeople },
        { label: "Imóveis", href: "/imoveis", icon: MdApartment },
        { label: "Programas", href: "/programas", icon: MdAssignment },
        { label: "Coletas", href: "/coletas", icon: MdRecycling },
        { label: "Contestações", href: "/contestacoes", icon: MdGavel },
        { label: "Consolidação", href: "/consolidacao", icon: MdDoneAll },
        { label: "Relatórios", href: "/relatorios", icon: MdAssessment },
        { label: "Auditoria", href: "/auditoria", icon: MdSecurity },
        { label: "Perfil", href: "/perfil", icon: MdPerson },
      ];
    default:
      return [];
  }
}

// Menu lateral que utiliza o SidebarFrame para o comportamento responsivo (overlay/slide-in no mobile).
export default function Sidebar({ user }: { user: User }) {
  // Gera os itens de navegação personalizados para o perfil atual do usuário
  const navItems = getNavItems(user.perfil);

  return (
    <SidebarFrame>
      <div className="flex h-full w-full flex-col overflow-y-auto bg-[#1A5538]">
        {/* Cabeçalho do menu lateral com identidade visual */}
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/20">
            <Leaf className="text-white" size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Coleta Premiada</p>
            <p className="text-[10px] text-white/50">Portal do Cidadão</p>
          </div>
        </div>

        {/* Links de navegação dinâmica do menu */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </SidebarFrame>
  );
}
