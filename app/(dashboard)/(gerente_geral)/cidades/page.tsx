import { MdLocationCity } from "react-icons/md";
import { getCidades } from "@/lib/cidades/get-cidades";
import NewCidadeButton from "./_components/new-cidade-button";
import CidadesTable from "./_components/cidades-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cidades",
};

export default async function CidadesPage() {
  const cidades = await getCidades();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdLocationCity className="w-6 h-6 text-[#116F51]" />
          Cidades
        </h1>

        <NewCidadeButton />
      </div>

      {cidades && cidades.length > 0 ? (
        <CidadesTable cidades={cidades} />
      ) : (
        <div className="flex items-center justify-center">
          <p className="flex items-center justify-center gap-4 text-gray-500 mt-6">
            Nenhuma cidade encontrada
          </p>
        </div>
      )}
    </div>
  );
}
