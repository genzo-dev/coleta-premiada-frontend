"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PUBLIC_ROUTES = new Set([
  "/",
  "/login",
  "/register",
  "/completar-cadastro",
  "/confirmar-email",
  "/termos-de-uso",
  "/politica-de-privacidade",
  "/regulamento",
  "/auth/callback",
]);

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.has(pathname)) return true;
  if (pathname.startsWith("/confirmar-email/")) return true;
  return false;
}

export default function ScrollToTopButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isPublicRoute(pathname)) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full transition-all duration-300",
        "bg-gradient-to-br from-emerald-500 to-green-600 border-0",
        "text-white hover:text-white",
        "shadow-lg shadow-emerald-900/25",
        "hover:scale-110 hover:shadow-xl hover:shadow-emerald-900/40",
        "active:scale-95",
        "opacity-0 translate-y-2 pointer-events-none",
        visible && "opacity-100 translate-y-0 pointer-events-auto",
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="size-5" />
    </Button>
  );
}
