import Link from "next/link";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { createSlug } from "@/utils/create-slug";
import Image from "next/image";

export default async function Footer() {
  const user = await getCurrentUser();

  const urlProfileUser = createSlug(user?.perfil || "/login");

  return (
    <footer className="w-full bg-[#F6F9F6] py-12 md:py-16 text-foreground">
      <div className="container mx-auto px-4 md:px-8">
        {/* Grid Superior */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Coluna 1: Logo e Sobre */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/70"> */}
              <div>
                <Image
                  src="/logo-green.png"
                  height={96}
                  width={96}
                  alt="Coleta Premiada Logo"
                  className="w-8 h-8"
                />
                {/* <Leaf size={22} className="fill-current" /> */}
              </div>
              <span className="font-bold text-xl tracking-tight">
                Coleta Premiada
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-sm">
              Programa de incentivo à coleta seletiva com desconto no IPTU para
              moradores que participam ativamente da reciclagem.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="flex flex-col">
            <h3 className="font-bold text-base mb-4">Links Rápidos</h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/#howToWork"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Como Funciona
              </Link>
              <Link
                href="/#cities"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cidades Atendidas
              </Link>
              <Link
                href="/#callToAction"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Comece agora!
              </Link>
            </nav>
          </div>

          {/* Coluna 3: Links úteis */}
          <div className="flex flex-col">
            <h3 className="font-bold text-base mb-4">Links úteis</h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/register"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Fazer Adesão
              </Link>
              <Link
                href={urlProfileUser}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/perfil"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Minha conta
              </Link>
            </nav>
          </div>

          {/* Coluna 4: Contato */}
          <div className="flex flex-col">
            <h3 className="font-bold text-base mb-4">Contato</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone size={18} className="text-[#116F51] shrink-0 mt-0.5" />
                <a
                  href="tel:0000000000"
                  className="hover:text-foreground transition-colors"
                >
                  (00) 0000-0000
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail size={18} className="text-[#116F51] shrink-0 mt-0.5" />
                <a
                  href="mailto:contato@coletapremiada.gov.br"
                  className="hover:text-foreground transition-colors break-all"
                >
                  coletapremiada@gmail.com.br
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="text-[#116F51] shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">
                  {"Secretaria de Meio Ambiente\nPrefeitura Municipal"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Área Inferior (Copyright e Links Legais) */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
            &copy; 2025 Coleta Premiada. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 md:gap-6">
            <Link
              href="/regulamento"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Regulamento
            </Link>
            <Link
              href="/politica-de-privacidade"
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos-de-uso"
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
