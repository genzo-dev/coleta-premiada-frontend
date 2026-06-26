"use client";

import type { User } from "@/schemas/user/user-schema";
import { SidebarProvider } from "@/components/Sidebar/sidebar-context";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// Componente de estrutura principal (Shell) do Dashboard que roda do lado do cliente
// Permite que o estado do menu (SidebarProvider) seja compartilhado corretamente entre os componentes filhos.
export default function DashboardShell({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-[#F2F4F2]">
        {/* Menu lateral fixo/toggleable */}
        <Sidebar user={user} />

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header superior com ações de perfil e botão hambúrguer */}
          <Header user={user} />
          {/* Área principal do conteúdo */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-9">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
