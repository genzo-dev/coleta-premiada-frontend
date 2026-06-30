import Link from "next/link";
import { Button } from "../ui/button";
import { LuCircleCheck } from "react-icons/lu";

export default function CallToActionSection() {
  return (
    <div className="bg-green-900 mt-12 md:mt-24 py-12 px-8">
      <div className="flex flex-col gap-8 text-white text-center items-center justify-between">
        <h2 className="text-3xl sm:text-5xl font-bold">Pronto pra começar? </h2>
        <p className="sm:text-lg">
          Faça sua adesão gratuita e comece a acumular pontos na próxima coleta.
          É rápido, fácil e gratuito!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/register" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-white hover:bg-gray-200 px-6 py-5 text-green-900">
              <LuCircleCheck /> Fazer adesão gratuita
            </Button>
          </Link>

          <Link href="/login" className="w-full sm:w-auto hover:underline">
            Já sou participante
          </Link>
        </div>
      </div>
    </div>
  );
}
