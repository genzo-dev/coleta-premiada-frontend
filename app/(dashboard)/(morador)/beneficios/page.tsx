import * as React from "react"
import Link from "next/link"
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressBar } from "@/components/ui/progress-bar"
import { StatusBadge } from "@/components/ui/status-badge"
import { MdCardGiftcard, MdHome, MdInfo, MdTrendingUp, MdCheckCircle } from "react-icons/md"

interface Imovel {
  id: number
  inscricao: string
  ativo: boolean
}

interface ImoveisResponse {
  count: number
  results: Imovel[]
}

interface RegrasPrograma {
  pontos_por_real: string | number
  minimo_para_beneficio: number
}

interface Programa {
  id: number
  nome: string
  desconto_maximo: number
  regras?: RegrasPrograma
}

interface SaldoCiclo {
  id: number
  ciclo: string
  desconto_percentual: string | number
  atualizado: string
}

interface BenefitDetails {
  imovel: string
  titular: string
  programa: string
  desconto_total_percentual: string
  saldos_por_ciclo: SaldoCiclo[]
}

export default async function BeneficiosPage() {
  // 1. Busca imóvel do morador
  const propertyRes = await apiAuthenticatedRequest<ImoveisResponse>("/api/program/properties")
  const property = propertyRes.success && propertyRes.data.results.length > 0
    ? propertyRes.data.results[0]
    : null

  // Se o morador NÃO tiver imóvel cadastrado: exibir CTA Card
  if (!property) {
    return (
      <div className="max-w-xl mx-auto py-12 font-manrope">
        <Card className="bg-white border border-morador-outline-variant/30 text-center p-8 shadow-sm">
          <CardHeader className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-morador-surface-container rounded-2xl flex items-center justify-center text-morador-primary">
              <MdHome size={36} />
            </div>
            <CardTitle className="text-xl font-bold text-morador-primary">Vincule seu Imóvel</CardTitle>
            <CardDescription className="text-sm">
              Você ainda não possui um imóvel cadastrado no portal. Cadastre seu endereço residencial para começar a gerar descontos no seu IPTU.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Link
              href="/meu-imovel"
              className="inline-flex justify-center items-center px-6 py-3 bg-[#003629] hover:bg-emerald-950 text-white font-bold rounded-xl text-sm transition"
            >
              Ir para Cadastro de Imóvel
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 2. Busca o programa ativo
  const programRes = await apiAuthenticatedRequest<Programa>("/api/accounts/me/program")
  const program = programRes.success ? programRes.data : null

  if (!program) {
    return (
      <div className="max-w-4xl mx-auto space-y-7 font-manrope">
        <section className="space-y-1">
          <h1 className="text-3xl font-extrabold text-morador-primary tracking-tight">Benefícios e IPTU</h1>
          <p className="text-sm text-morador-on-surface-variant">Acompanhe seu saldo de desconto acumulado para o próximo IPTU.</p>
        </section>
        <Card className="bg-white border border-morador-outline-variant/30 p-6 text-center text-morador-on-surface-variant">
          Nenhum programa de incentivo de coleta seletiva ativo no momento.
        </Card>
      </div>
    )
  }

  // 3. Busca os benefícios consolidados do imóvel no programa ativo
  const benefitsRes = await apiAuthenticatedRequest<BenefitDetails>(
    `/api/program/benefits/${property.id}/${program.id}`
  )

  const benefitDetails = benefitsRes.success ? benefitsRes.data : null
  const totalDiscount = benefitDetails ? Number(benefitDetails.desconto_total_percentual) : 0
  const maxDiscount = program.desconto_maximo ?? 40
  const saldos = benefitDetails ? benefitDetails.saldos_por_ciclo : []

  // Fórmula de pontos
  const pontosPorReal = program.regras?.pontos_por_real ? Number(program.regras.pontos_por_real) : 200

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-7 font-manrope">
      {/* Header */}
      <section className="space-y-1">
        <h1 className="text-3xl font-extrabold text-morador-primary tracking-tight">Benefícios e IPTU</h1>
        <p className="text-sm text-morador-on-surface-variant">
          Consulte o progresso de desconto acumulado para o imposto do imóvel {benefitDetails?.imovel}.
        </p>
      </section>

      {/* Grid com Destaque e Progresso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Consolidado Destacado (col-span-1) */}
        <Card className="bg-[#003629] text-white border-0 p-6 flex flex-col justify-between h-[180px] shadow-md">
          <div>
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Desconto Total Acumulado</p>
            <h2 className="text-5xl font-extrabold text-white mt-3">{totalDiscount}%</h2>
          </div>
          <p className="text-xs text-white/70">Capped no limite de {maxDiscount}% do IPTU</p>
        </Card>

        {/* Barra de Progresso Geral (col-span-2) */}
        <Card className="md:col-span-2 bg-white border border-morador-outline-variant/30 p-6 flex flex-col justify-between h-[180px] shadow-sm">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-bold text-morador-primary">Acompanhamento do Teto</h4>
                <p className="text-xs text-morador-on-surface-variant">Progresso em relação ao limite anual</p>
              </div>
              
              {/* Tooltip CSS puro integrado */}
              <div className="relative group">
                <span className="material-symbols-outlined text-base text-morador-outline cursor-help p-1 hover:bg-morador-surface-container rounded-full transition-colors">
                  help_outline
                </span>
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-64 bg-morador-primary text-white text-[11px] p-2.5 rounded-xl shadow-lg z-50 leading-normal border border-white/10">
                  <p className="font-bold mb-1">Regra de Conversão:</p>
                  Para cada <strong className="text-[#91F78E]">{pontosPorReal} pontos</strong> acumulados no programa, você adquire <strong>1% de desconto</strong> no valor do seu IPTU.
                  <div className="absolute top-full right-3 -mt-1 border-4 border-transparent border-t-morador-primary"></div>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-xs font-bold text-morador-primary mt-4 mb-2">
              <span>{totalDiscount}% acumulado</span>
              <span>{maxDiscount}% Limite</span>
            </div>
            <ProgressBar value={totalDiscount} max={maxDiscount} />
          </div>

          <div className="flex justify-between text-[10px] text-morador-outline font-bold">
            <span>Início (0%)</span>
            <span>Teto ({maxDiscount}%)</span>
          </div>
        </Card>
      </div>

      {/* Tabela de Saldos por Ciclo */}
      <Card className="bg-white border border-morador-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-morador-outline-variant/10">
          <h4 className="text-base font-bold text-morador-primary">Detalhamento dos Lançamentos</h4>
          <p className="text-xs text-morador-on-surface-variant">Acompanhe as consolidações mensais efetuadas</p>
        </div>

        {saldos.length === 0 ? (
          <div className="text-center py-10 text-morador-on-surface-variant text-sm">
            Nenhuma consolidação realizada para o imóvel neste programa ainda.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-morador-surface-container-low border-b border-morador-outline-variant/20">
                  <th className="px-6 py-3.5 text-xs font-bold text-morador-on-surface-variant">Ciclo (Mês/Ano)</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-morador-on-surface-variant">Desconto Adquirido</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-morador-on-surface-variant">Data de Lançamento</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-morador-on-surface-variant">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-morador-outline-variant/10">
                {saldos.map((saldo) => (
                  <tr key={saldo.id} className="hover:bg-morador-surface-container-low transition-colors duration-150">
                    <td className="px-6 py-4 font-bold text-morador-primary text-sm">{saldo.ciclo}</td>
                    <td className="px-6 py-4 text-morador-secondary font-bold text-sm">+{Number(saldo.desconto_percentual)}%</td>
                    <td className="px-6 py-4 text-morador-on-surface-variant text-xs">{formatDate(saldo.atualizado)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-bold inline-flex items-center gap-1">
                        <MdCheckCircle size={14} />
                        Consolidado
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
