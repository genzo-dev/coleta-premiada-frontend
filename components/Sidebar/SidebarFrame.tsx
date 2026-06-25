"use client";

import clsx from "clsx";
import { useSidebar } from "./sidebar-context";

// Componente de layout que controla a renderização física do Sidebar de forma responsiva.
// Em telas grandes (desktop) ele se comporta de forma estática; em telas móveis vira um slide-over.
export default function SidebarFrame({ children }: { children: React.ReactNode }) {
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Backdrop (overlay escuro de fundo) ao abrir o menu lateral no mobile */}
      {/* Inicia abaixo do Header (top-16) permitindo fechar o menu ao clicar fora dele */}
      <div
        onClick={close}
        aria-hidden
        className={clsx(
          "fixed inset-x-0 bottom-0 top-16 z-30 bg-black/50 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Container físico do menu lateral. Desliza para fora da tela (translate-x-full) no mobile quando fechado */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 w-[248px] shrink-0 transition-transform duration-200",
          "lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {children}
      </aside>
    </>
  );
}
