"use client";

import { createContext, useContext, useState } from "react";

// Valor exposto pelo contexto de controle do estado (aberto/fechado) do menu lateral
type SidebarContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

// Contexto do React para gerenciar o menu lateral responsivo
const SidebarContext = createContext<SidebarContextValue | null>(null);

// Componente provedor que encapsula o estado de visibilidade do menu lateral
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((prev) => !prev),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// Hook customizado para acessar de forma facilitada e tipada o estado do menu lateral
export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}
