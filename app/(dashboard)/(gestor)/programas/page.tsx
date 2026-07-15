import Link from "next/link";
import { getPrograms } from "@/lib/programs/get-programs";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { FaClipboardList, FaRecycle } from "react-icons/fa";
import NewProgramButton from "@/components/NewProgramButton";
import { formatDateToDisplay } from "@/utils/format-date";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programas",
};

export default async function ProgramasPage() {
  const [programs, user] = await Promise.all([getPrograms(), getCurrentUser()]);

  const isGestor = user?.perfil === "gestor";
  const isGerenteGeral = user?.perfil === "gerente_geral";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <FaRecycle className="w-6 h-6 text-[#1A5538]" />
          Programas
        </h1>

        {isGestor && (
          <NewProgramButton userCidade={user?.cidade ?? null} />
        )}
      </div>
      {programs && programs.length > 0 ? (
        <div className="w-full overflow-x-auto overflow-y-auto max-h-[calc(100vh-220px)] rounded-lg border border-border bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left">
                <th className="px-4 py-3">Nome</th>
                {isGerenteGeral && <th className="px-4 py-3">Cidade</th>}
                <th className="px-4 py-3">Descrição</th>
                <th className="px-4 py-3">Início</th>
                <th className="px-4 py-3">Fim</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Desconto Máx.</th>
                <th className="px-4 py-3">Pts/Real</th>
                <th className="px-4 py-3">Mín. Benefício</th>
                <th className="px-4 py-3">Acúmulo</th>
              </tr>
              <tr></tr>
            </thead>

            <tbody className="divide-y divide-border">
              {programs.map((program, index) => (
                <tr
                  key={program.id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    <Link
                      href={`/programas/${program.id}`}
                      className="text-[#1A5538] hover:underline"
                    >
                      {program.nome}
                    </Link>
                  </td>

                  {isGerenteGeral && (
                    <td className="px-4 py-3 whitespace-nowrap">
                      {program.cidade_nome ? (
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                          {program.cidade_nome}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                  )}

                  <td className="px-4 py-3 text-gray-600 max-w-50 truncate">
                    {program?.descricao || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {formatDateToDisplay(program.data_inicio)}
                  </td>

                  <td className="px-4 py-3">
                    {formatDateToDisplay(program.data_fim)}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        program.ativo
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {program.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>

                  <td className="px-4 py-3 font-semibold text-(--color-morador-secondary)">
                    {program.desconto_maximo}
                  </td>

                  <td className="px-4 py-3">
                    {program.regras?.pontos_por_real ?? "-"}
                  </td>

                  <td className="px-4 py-3">
                    {program.regras?.minimo_para_beneficio ?? "-"}
                  </td>

                  <td className="px-4 py-3">
                    {program.regras?.permite_acumulo_ciclos ? "Sim" : "Não"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="flex items-center justify-center gap-4 text-gray-500 mt-6">
            <FaClipboardList /> Nenhum programa encontrado
          </p>
        </div>
      )}
    </div>
  );
}
