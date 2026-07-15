import type { Metadata } from "next";
import "./globals.css";
// import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import ScrollToTopButton from "@/components/scroll-to-top-button";

export const metadata: Metadata = {
  title: {
    default: "Coleta Premiada",
    template: "%s",
  },
};

// Layout raiz que define a estrutura global HTML/Body da aplicação
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="font-manrope h-full antialiased scroll-smooth"
    >
      <body className="min-h-full flex flex-col">
        {/* Container flex-1 para empurrar o Footer para o rodapé caso a página tenha pouco conteúdo */}
        <div className="flex-1 flex flex-col">{children}</div>
        {/* <Footer /> */}
        <Toaster />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
