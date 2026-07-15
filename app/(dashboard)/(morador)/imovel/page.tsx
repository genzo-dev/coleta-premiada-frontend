import { Metadata } from "next";
import ImovelPageClient from "./imovel-page";

export const metadata: Metadata = {
  title: "Meu Imóvel",
};

export default function MeuImovelPage() {
  return <ImovelPageClient />;
}
