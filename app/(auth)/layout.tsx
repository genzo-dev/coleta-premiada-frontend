import { Leaf } from "lucide-react";
import clsx from "clsx";

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
          <Leaf className="w-16 h-16 text-emerald-100" />
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
