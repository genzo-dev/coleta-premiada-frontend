"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Leaf, Menu, X, Home } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

type NavItem = {
  label: string;
  href: string;
};

export default function NavbarClient({
  user,
  navItems,
  urlProfileUser,
}: {
  user: { nome?: string; perfil?: string } | null;
  navItems: NavItem[];
  urlProfileUser: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between md:grid md:grid-cols-3 items-center px-6 md:px-8 bg-[#1A5538] text-white">
        <div className="flex items-center gap-3 border-b border-white/10 py-5 justify-self-start">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menu"
            className="flex items-center justify-center rounded-md p-1 text-white transition hover:bg-white/10 md:hidden cursor-pointer"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-white.png"
                height={96}
                width={96}
                alt="Coleta Premiada Logo!"
                className="w-6 h-6 shrink-0"
              />
              <p className="text-sm font-bold text-white whitespace-nowrap">
                Coleta Premiada
              </p>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex justify-center">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
            >
              {label}
            </Link>
          ))}
          {urlProfileUser! && (
            <Link
              href={urlProfileUser}
              className="flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium text-black transition bg-white hover:brightness-90 ml-3"
            >
              Dashboard
            </Link>
          )}
        </div>
        <div className="justify-self-end">
          {user ? (
            <label className="text-sm truncate max-w-25 sm:max-w-60 block">
              {user.nome}
            </label>
          ) : (
            <div className="flex gap-6 items-center justify-center">
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

      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-[248px] bg-[#1A5538] transition-transform duration-200 md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full w-full flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-5">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo-white.png"
                  height={96}
                  width={96}
                  alt="Coleta Premiada Logo!"
                  className="w-6 h-6 shrink-0"
                />
                <p className="text-sm font-bold text-white whitespace-nowrap">
                  Coleta Premiada
                </p>
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
              className="flex items-center justify-center rounded-md p-1 text-white/65 transition hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
              >
                {label}
              </Link>
            ))}

            {urlProfileUser! && (
              <Link
                href={urlProfileUser}
                className="flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium text-black transition bg-white hover:brightness-90"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Bottom: user info or login */}
          <div className="border-t border-white/10 p-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium text-white/65 transition hover:bg-white/10 hover:text-white mt-1"
            >
              <Home size={18} /> Página Inicial
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
