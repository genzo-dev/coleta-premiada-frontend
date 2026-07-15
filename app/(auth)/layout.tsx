import { Leaf } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Lado Esquerdo (Branding) */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-900 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/logo-white.png"
            height={96}
            width={96}
            alt="Coleta Premiada Logo"
            className="w-18 h-18"
          />
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Coleta Premiada
          </h1>
        </div>
      </div>

      {/* Lado Direito (Formulário) */}
      <div className="flex-1 w-full lg:w-1/2 bg-background flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
