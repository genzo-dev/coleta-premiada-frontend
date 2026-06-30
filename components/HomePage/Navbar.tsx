import Link from "next/link";
import DefaultLink from "../Link";
import { Button } from "../ui/button";
import { Leaf } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export default async function Navbar() {
  const user = await getCurrentUser();
  const getProfileUrl = () => {
    if (user?.perfil === "gestor") return "/gestor";
    if (user?.perfil === "morador") return "/morador";
    if (user?.perfil === "supervisor") return "/supervisor";

    return "/login";
  };

  const urlProfileUser = getProfileUrl();

  const navItems = [
    { label: "Início", href: "/" },
    { label: "Como funciona?", href: "#" },
    { label: "Dashboard", href: urlProfileUser },
  ];

  return (
    <>
      <nav className="flex justify-between items-center px-8 bg-[#1A5538] text-white">
        <div className="flex items-center gap-3 border-b border-white/10 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/20">
            <Leaf className="text-white" size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Coleta Premiada</p>
          </div>
        </div>
        <div className="hidden md:flex">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
        <div>
          {user ? (
            <label className="text-sm truncate max-w-25 sm:max-w-60 block">
              {user.nome}
            </label>
          ) : (
            <div className="flex gap-2 items-center justify-center">
              <Link
                href="/login"
                className="text-white text-sm hover:underline"
              >
                Entrar
              </Link>
              <Link href="/register">
                <Button className="bg-white text-black hover:bg-green-50">
                  Participar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div className="bg-green-900/90 border-t border-t-gray-400 py-1 flex items-center justify-center gap-8 md:hidden">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-[10px] px-2 py-1 text-[13px] font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}
