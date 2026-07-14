import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import bgImage from "@/public/bg.png";

export default function HeroSection() {
  return (
    <section
      id="start"
      className="relative min-h-[calc(100vh-76px)] flex items-center overflow-hidden"
    >
      <Image
        src={bgImage}
        alt=""
        fill
        className="object-cover object-center"
        priority
        placeholder="blur"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#1A5538]/80" />

      <div className="absolute top-20 left-1/4 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

      <section className="relative z-10 flex flex-col justify-center items-center text-center px-4 sm:px-8 max-w-4xl mx-auto text-white py-20">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.08] tracking-tight">
          Reciclar é bom.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-200 to-green-100">
            Ganhar desconto
          </span>{" "}
          é melhor ainda.
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
          É simples: você separa os recicláveis, a gente cuida do resto. No fim,
          vira desconto no IPTU. Todo mundo ganha.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
          <Link href="/login" className="w-full sm:w-auto group">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 border-0 px-8 py-6 text-base font-semibold shadow-lg shadow-green-900/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-900/40 hover:scale-[1.02] cursor-pointer">
              Participar agora
              <ArrowRightIcon className="size-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link href="#howToWork" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-6 text-base font-semibold text-white border border-white/20 shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
              Como funciona?
            </Button>
          </Link>
        </div>
      </section>
    </section>
  );
}
