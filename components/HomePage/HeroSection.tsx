import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex flex-col justify-center items-center text-center min-h-[calc(100vh-32px)] max-w-6xl mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-4 lg:mb-12 leading-tight">
        Recicle e ganhe <span className="text-green-900">desconto no IPTU</span>
      </h1>

      <p className="text-sm sm:text-base md:text-lg max-w-3xl">
        Participe do <label className="text-green-900">Coleta Premiada</label> e
        transforme sua separação de resíduos em economia real. <br />
        Cada quilo reciclado vale pontos que viram desconto no seu IPTU
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 w-full sm:w-auto">
        <Link href="#" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-green-900 hover:bg-green-800 border border-green-900 px-6 py-4 sm:py-5">
            Participar agora <ArrowRightIcon />
          </Button>
        </Link>

        <Link href="#" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-white hover:bg-gray-100 border border-gray-300 px-6 py-4 sm:py-5 text-black shadow-lg">
            Como funciona?
          </Button>
        </Link>
      </div>
    </div>
  );
}
