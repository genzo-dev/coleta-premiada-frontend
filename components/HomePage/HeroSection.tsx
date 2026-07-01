import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center bg-fixed" />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Conteúdo */}
      <section className="relative flex flex-col justify-center items-center text-center min-h-[calc(100vh-32px)] px-8 max-w-6xl mx-auto text-white">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-4 lg:mb-12 leading-tight">
          Recicle e ganhe desconto no IPTU
        </h1>

        <p className="text-sm sm:text-base md:text-xl max-w-3xl">
          Transforme seu lixo em desconto no IPTU. Simples, sustentável e direto
          no seu bolso.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 w-full sm:w-auto">
          <Link href="/login" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-green-900  hover:bg-green-950 border border-transparent px-6 py-4 sm:py-5">
              Participar agora <ArrowRightIcon />
            </Button>
          </Link>

          <Link href="#howToWork" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-white hover:bg-gray-300 px-6 py-4 sm:py-5 text-black shadow-lg">
              Como funciona?
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
