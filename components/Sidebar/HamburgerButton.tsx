"use client";

import { MdClose, MdMenu } from "react-icons/md";
import { useSidebar } from "./sidebar-context";

// Botão de menu (hambúrguer) visível em telas menores (mobile)
// Alterna dinamicamente entre os ícones MdMenu (abrir) e MdClose (fechar) com base no estado do sidebar.
export default function HamburgerButton() {
  const { isOpen, toggle } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      className="flex items-center justify-center rounded-md p-2 text-[#1A5538] transition hover:bg-[#1A5538]/10 lg:hidden cursor-pointer"
    >
      {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
    </button>
  );
}
