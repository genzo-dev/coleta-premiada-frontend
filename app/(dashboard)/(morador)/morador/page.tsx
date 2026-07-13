import Link from "next/link";
import { getDashboardData } from "@/lib/morador/get-dashboard-data";
import { MdInfo, MdAdd, MdCardGiftcard } from "react-icons/md";
import { Button } from "@/components/ui/button";

export default async function MoradorDashboard() {
  const data = await getDashboardData();

  if (!data.hasImovel) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">Dashboard do Morador</h1>
        <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-xl flex flex-col items-center justify-center text-center gap-4">
          <div className="bg-emerald-100 p-4 rounded-full">
            <MdCardGiftcard className="w-8 h-8 text-emerald-600" />
          </div>
          <div className="max-w-md">
            <h2 className="text-xl font-medium text-emerald-900 mb-2">
              Você está quase lá!
            </h2>
            <p className="text-emerald-700 text-sm mb-6">
              Para começar a acumular pontos com suas reciclagens e ganhar
              descontos incríveis no IPTU, você precisa vincular o seu imóvel ao
              nosso programa.
            </p>
            <Button
              asChild
              className="bg-[#1A5538] hover:bg-[#114028] w-full sm:w-auto"
            >
              <Link href="/imovel" className="flex items-center gap-2">
                <MdAdd className="w-5 h-5" />
                Vincular Meu Imóvel Agora
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!data.beneficio) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">Dashboard do Morador</h1>
        <p className="text-gray-600">
          Nenhum dado de benefício encontrado no momento. Verifique se o programa
          está ativo.
        </p>
      </div>
    );
  }

  const { beneficio } = data;
  const maxDesconto = parseFloat(beneficio.desconto_maximo_percentual);
  const atualDesconto = parseFloat(beneficio.desconto_total_percentual);
  const progressPercent = Math.min((atualDesconto / maxDesconto) * 100, 100);

  let acumuladoTotal = 0;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        Dashboard do Morador
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card de Progresso */}
        <div className="lg:col-span-2 bg-white border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                Desconto Acumulado (IPTU)
                <span title="Para cada quantidade de pontos estipulada nas regras do programa, você ganha 1% de desconto no IPTU do próximo ano." className="text-gray-400 hover:text-emerald-600 transition-colors cursor-help">
                  <MdInfo className="w-4 h-4" />
                </span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Acompanhe o seu progresso no programa {beneficio.programa}.
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-[#1A5538]">
                {atualDesconto.toFixed(2).replace(".", ",")}%
              </span>
              <span className="text-sm font-medium text-gray-500 ml-1">
                / {maxDesconto.toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1A5538] transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-medium text-gray-400">
              <span>0%</span>
              <span>Progresso Atual: {progressPercent.toFixed(1)}% do Teto</span>
              <span>{maxDesconto.toFixed(0)}% (Teto)</span>
            </div>
          </div>
        </div>

        {/* Card Info Imovel */}
        <div className="bg-gray-50/50 border border-border rounded-xl p-6 flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
            Dados do Vínculo
          </h3>
          <div className="flex flex-col gap-3 text-sm">
            <div>
              <span className="block text-gray-500 text-xs mb-0.5">Titular</span>
              <span className="font-medium text-gray-900">{beneficio.titular}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs mb-0.5">Inscrição Imobiliária</span>
              <span className="font-medium text-gray-900">{beneficio.imovel}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs mb-0.5">Programa Ativo</span>
              <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                {beneficio.programa}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Histórico Tabela */}
      <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <h3 className="text-lg font-semibold text-gray-800">
            Histórico por Ciclo de Fechamento
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Veja a evolução do seu desconto a cada apuração feita pelos gestores.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-medium uppercase text-xs tracking-wider border-b border-border">
              <tr>
                <th className="px-6 py-4">Ciclo (ID)</th>
                <th className="px-6 py-4">Desconto Adquirido (Ciclo)</th>
                <th className="px-6 py-4">Desconto Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {beneficio.saldos_por_ciclo.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    Nenhum fechamento de ciclo ocorreu até o momento.
                  </td>
                </tr>
              ) : (
                beneficio.saldos_por_ciclo.map((saldo) => {
                  const desc = parseFloat(saldo.desconto_percentual);
                  acumuladoTotal += desc;
                  return (
                    <tr key={saldo.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        #{saldo.ciclo}
                      </td>
                      <td className="px-6 py-4 text-emerald-600 font-medium">
                        +{desc.toFixed(2).replace(".", ",")}%
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-semibold">
                        {acumuladoTotal.toFixed(2).replace(".", ",")}%
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            {beneficio.saldos_por_ciclo.length > 0 && (
              <tfoot className="bg-gray-50 border-t border-border font-semibold">
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-right text-gray-600">
                    Desconto Final Consolidado (Aplicando Teto):
                  </td>
                  <td className="px-6 py-4 text-[#1A5538] text-base">
                    {atualDesconto.toFixed(2).replace(".", ",")}%
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
