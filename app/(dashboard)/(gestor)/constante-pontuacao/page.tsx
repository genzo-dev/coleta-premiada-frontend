import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getScoringConstant } from "@/lib/gestor/get-scoring-constant";
import { EditScoringConstantForm } from "./_components/edit-scoring-constant-form";
import { MdTune } from "react-icons/md";

export default async function ConstantePontuacaoPage() {
  const constante = await getScoringConstant();

  if (!constante) {
    return (
      <div className="flex flex-col gap-6 p-4">
        <h1 className="text-2xl font-semibold text-red-600">
          Erro ao carregar
        </h1>
        <p>Não foi possível carregar a constante de pontuação atual.</p>
      </div>
    );
  }

  const { pontos_por_kg, atualizado_em, atualizado_por } = constante;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdTune className="w-6 h-6 text-[#1A5538]" />
          Constante de Pontuação
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 max-w-lg flex flex-col gap-4">
          <div className="bg-white border border-border p-5 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Valor Atual Ativo
            </h3>
            <div className="text-4xl font-bold text-[#1A5538] mb-1">
              {parseFloat(pontos_por_kg).toFixed(2)}{" "}
              <span className="text-lg font-normal text-gray-500">
                pts / kg
              </span>
            </div>

            <hr className="my-4" />

            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <p>
                <strong>Última atualização:</strong>{" "}
                {format(
                  new Date(atualizado_em),
                  "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                  {
                    locale: ptBR,
                  },
                )}
              </p>
              <p>
                <strong>Atualizado por:</strong>{" "}
                {atualizado_por
                  ? `${atualizado_por.nome || "Usuário"} (${atualizado_por.email})`
                  : "Sistema"}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 text-blue-900 border border-blue-100 p-4 rounded-xl text-sm">
            <strong>Como funciona?</strong> A constante de pontuação determina a
            conversão de material reciclado em pontos no sistema. Por padrão, o
            cálculo feito para o morador ao concluir uma coleta é: <br />
            <code>Pontos = Peso (Kg) × Constante</code>.
          </div>
        </div>

        <div className="flex-1 max-w-sm">
          <EditScoringConstantForm currentValue={pontos_por_kg} />
        </div>
      </div>
    </div>
  );
}
