"use client";

import { MdLogout } from "react-icons/md";
import type { User } from "@/schemas/user/user-schema";
import { logoutAction } from "@/actions/auth/logout-action";
import HamburgerButton from "@/components/Sidebar/HamburgerButton";

// O Header é marcado como Client Component para permitir o uso do HamburgerButton que consome o contexto do Sidebar.
export default function Header({ user }: { user: User }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/5 bg-white px-4 lg:px-8">
      <div className="flex items-center gap-3">
        {/* Botão de toggle do menu visível apenas em telas menores */}
        <HamburgerButton />
        <span className="text-sm font-semibold text-[#1A1A1A]">
          {user.nome}
        </span>
      </div>

      {/* Formulário de logout que chama a Server Action de forma nativa */}
      <form action={logoutAction}>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-[10px] px-3 py-2 text-sm font-medium text-[#1A5538] transition hover:bg-[#1A5538]/10 cursor-pointer"
        >
          <MdLogout size={18} />
          Sair
        </button>
      </form>
    </header>
  );
}
