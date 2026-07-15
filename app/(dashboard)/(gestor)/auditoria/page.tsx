import { Metadata } from "next";
import AuditoriaPageClient from "./_components/auditoria-page";

export const metadata: Metadata = {
  title: "Auditoria",
};

export default function AuditoriaPage() {
  return <AuditoriaPageClient />;
}
