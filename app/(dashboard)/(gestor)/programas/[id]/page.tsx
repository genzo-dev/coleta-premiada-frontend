import { getProgramById } from "@/lib/programs/get-program-by-id";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import UpdateProgramButton from "@/components/UpdateProgramButton";
import { formatDateToDisplay } from "@/utils/format-date";
import UpdateProgramRulesButton from "@/components/UpdateProgramRulesButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detalhes do Programa",
};

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [program, user] = await Promise.all([
    getProgramById(Number(id)),
    getCurrentUser(),
  ]);

  if (!program) notFound();

  const isGestor = user?.perfil === "gestor";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 border-b border-border pb-5">
        <Link
          href="/programas"
          className="text-muted-foreground hover:text-foreground transition"
        >
          <FaArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          {program.nome}
        </h1>
      </div>

      <div className="rounded-lg border border-border bg-white p-6">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Nome
            </dt>
            <dd className="mt-1 text-sm font-medium">{program.nome}</dd>
          </div>

          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Cidade
            </dt>
            <dd className="mt-1 text-sm">
              {program.cidade_nome ? (
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                  {program.cidade_nome}
                </span>
              ) : (
                <span className="text-muted-foreground italic text-xs">
                  Este programa ainda não tem cidade vinculada.
                </span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Descrição
            </dt>
            <dd className="mt-1 text-sm whitespace-normal wrap-break-word">
              {program.descricao || "-"}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Data de Início
            </dt>
            <dd className="mt-1 text-sm">
              {formatDateToDisplay(program.data_inicio)}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Data de Fim
            </dt>
            <dd className="mt-1 text-sm">
              {formatDateToDisplay(program.data_fim)}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Status
            </dt>
            <dd className="mt-1">
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${
                  program.ativo
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {program.ativo ? "Ativo" : "Inativo"}
              </span>
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Desconto Máximo
            </dt>
            <dd className="mt-1 text-sm font-semibold text-(--color-morador-secondary)">
              {program.desconto_maximo}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Pontos por Real
            </dt>
            <dd className="mt-1 text-sm">
              {program.regras?.pontos_por_real ?? "-"}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Mínimo para Benefício
            </dt>
            <dd className="mt-1 text-sm">
              {program.regras?.minimo_para_beneficio ?? "-"}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Permite Acúmulo de Ciclos
            </dt>
            <dd className="mt-1 text-sm">
              {program.regras?.permite_acumulo_ciclos ? "Sim" : "Não"}
            </dd>
          </div>
        </dl>
      </div>

      {isGestor && (
        <div className="flex items-center gap-4 self-center sm:self-end">
          <UpdateProgramButton
            id={program.id}
            program={program}
            userCidade={user?.cidade ?? null}
          />
          <UpdateProgramRulesButton
            id={program.id}
            programRules={program.regras}
          />
        </div>
      )}
    </div>
  );
}
