import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressBar } from "@/components/ui/progress-bar"
import { StatusBadge } from "@/components/ui/status-badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MdTrendingUp, MdCardGiftcard, MdRecycling, MdChevronRight, MdHome, MdCalendarToday, MdArrowForward, MdStar } from "react-icons/md"

// Tipagens do Backend
interface PointsData {
  pontos_acumulados: number
}

interface RegrasPrograma {
  pontos_por_real: number
  minimo_para_beneficio: number
  permite_acumulo_ciclos: boolean
}

interface Programa {
  id: number
  nome: string
  descricao: string
  data_inicio: string
  data_fim: string
  ativo: boolean
  desconto_maximo: number
  regras?: RegrasPrograma
}

interface SaldoPontos {
  id: number
  imovel: number
  programa: number
  ciclo: string
  desconto_percentual: number
  atualizado: string
}

interface Imovel {
  id: number
  inscricao: string
  cep: string
  logradouro: string
  numero: string
  complemento?: string | null
  bairro: string
  cidade: string
  estado: string
  ativo: boolean
  data_adesao: string
}

interface ImoveisResponse {
  count: number
  results: Imovel[]
}

interface Coleta {
  id: number
  id_microservico: string
  imovel: number
  pontuacao: number
  data_hora_coleta: string
  peso_kg: string
}

interface ColetasResponse {
  count: number
  results: Coleta[]
}

// Helper to calculate the next Wednesday date
function getNextWednesday() {
  const today = new Date()
  const resultDate = new Date(today)
  resultDate.setDate(today.getDate() + (3 + 7 - today.getDay()) % 7 || 7)
  
  const day = String(resultDate.getDate()).padStart(2, '0')
  const month = String(resultDate.getMonth() + 1).padStart(2, '0')
  
  return {
    dateStr: `${day}/${month}`,
    dayName: "Quarta-feira"
  }
}

// Format numbers with thousands separator
function formatNumber(num: number): string {
  return new Intl.NumberFormat("pt-BR").format(num)
}

// -------------------------------------------------------------
// SUB-COMPONENTES ASSÍNCRONOS
// -------------------------------------------------------------

async function PropertySection({ promise }: { promise: Promise<any> }) {
  const res = await promise
  const property: Imovel | null = res.success && res.data?.results?.length > 0 
    ? res.data.results[0] 
    : null

  if (!property) {
    return (
      <div className="bg-white border border-morador-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-morador-surface-container rounded-xl flex items-center justify-center text-morador-primary">
            <MdHome size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-morador-on-surface-variant uppercase tracking-wider">Imóvel Vinculado</p>
            <h4 className="text-lg font-bold text-morador-primary">Nenhum imóvel cadastrado</h4>
            <p className="text-xs text-morador-outline">Cadastre seu imóvel para participar do programa e acumular pontos.</p>
          </div>
        </div>
        <Link href="/meu-imovel" className="px-6 py-2 bg-morador-primary text-white rounded-full font-bold text-sm transition hover:bg-morador-primary-container">
          Cadastrar Imóvel
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white border border-morador-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center text-[#2E7D32]">
          <MdHome size={28} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-morador-on-surface-variant uppercase tracking-wider">Imóvel Vinculado</p>
          <h4 className="text-lg font-bold text-morador-primary">
            {property.logradouro}, {property.numero} – {property.bairro}
          </h4>
          <p className="text-xs text-morador-outline">Inscrição: {property.inscricao}</p>
        </div>
      </div>
      <StatusBadge variant={property.ativo ? "ativo" : "inativo"}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] inline-block animate-pulse" />
        Ativo no Programa
      </StatusBadge>
    </div>
  )
}

async function BentoGridSection({
  pointsPromise,
  benefitsPromise,
  programPromise,
  collectionsPromise,
}: {
  pointsPromise: Promise<any>
  benefitsPromise: Promise<any>
  programPromise: Promise<any>
  collectionsPromise: Promise<any>
}) {
  const [pointsRes, benefitsRes, programRes, collectionsRes] = await Promise.all([
    pointsPromise,
    benefitsPromise,
    programPromise,
    collectionsPromise,
  ])

  const points = pointsRes.success ? (pointsRes.data as PointsData).pontos_acumulados : 0
  const program = programRes.success ? (programRes.data as Programa) : null
  const benefits = benefitsRes.success ? (benefitsRes.data as SaldoPontos[]) : []
  const collections = collectionsRes.success ? (collectionsRes.data as ColetasResponse).results : []

  // Calcula total reciclado
  const totalWeight = collections.reduce((acc, c) => acc + parseFloat(c.peso_kg), 0).toFixed(1)
  const totalColetas = collections.length

  // Calcula desconto
  const currentBenefit = program ? benefits.find(b => b.programa === program.id) : null
  const currentDiscount = currentBenefit ? Number(currentBenefit.desconto_percentual) : 0
  
  // Próxima Coleta
  const nextWed = getNextWednesday()

  // Determina o ano do ciclo
  const currentYear = new Date().getFullYear()
  const cycleLabel = program ? `Ciclo ${new Date(program.data_inicio).getFullYear()}` : `Ciclo ${currentYear}`
  const nextIptuYear = currentYear + 1

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Card 1: Pontos Acumulados */}
      <Card className="bg-white border border-morador-outline-variant/30 p-6 flex flex-col justify-between h-[155px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-extrabold text-morador-on-surface-variant uppercase tracking-wider">Pontos Acumulados</p>
            <h3 className="text-3xl font-extrabold text-morador-primary mt-2">{formatNumber(points)}</h3>
          </div>
          <div className="w-8 h-8 rounded-full bg-morador-surface-container flex items-center justify-center text-morador-primary">
            <MdStar size={18} />
          </div>
        </div>
        <p className="text-xs text-morador-outline mt-auto">{cycleLabel}</p>
      </Card>

      {/* Card 2: Desconto IPTU */}
      <Card className="bg-white border border-morador-outline-variant/30 p-6 flex flex-col justify-between h-[155px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-extrabold text-morador-on-surface-variant uppercase tracking-wider">Desconto Atual</p>
            <h3 className="text-3xl font-extrabold text-morador-primary mt-2">{currentDiscount}%</h3>
          </div>
          <div className="w-8 h-8 rounded-full bg-morador-surface-container flex items-center justify-center text-morador-primary">
            <MdCardGiftcard size={18} />
          </div>
        </div>
        <p className="text-xs text-morador-outline mt-auto">No IPTU {nextIptuYear}</p>
      </Card>

      {/* Card 3: Total Reciclado */}
      <Card className="bg-white border border-morador-outline-variant/30 p-6 flex flex-col justify-between h-[155px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-extrabold text-morador-on-surface-variant uppercase tracking-wider">Total Reciclado</p>
            <h3 className="text-3xl font-extrabold text-morador-primary mt-2">{totalWeight} kg</h3>
          </div>
          <div className="w-8 h-8 rounded-full bg-morador-surface-container flex items-center justify-center text-morador-primary">
            <MdRecycling size={18} />
          </div>
        </div>
        <p className="text-xs text-morador-outline mt-auto">Em {totalColetas} coletas</p>
      </Card>

      {/* Card 4: Proxima Coleta */}
      <Card className="bg-morador-primary text-white border-0 p-6 flex flex-col justify-between h-[155px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-extrabold text-white/70 uppercase tracking-wider">Próxima Coleta</p>
            <h3 className="text-3xl font-extrabold text-white mt-2">{nextWed.dateStr}</h3>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
            <MdCalendarToday size={18} />
          </div>
        </div>
        <p className="text-xs text-white/70 mt-auto">{nextWed.dayName}</p>
      </Card>
    </div>
  )
}

async function ProgressSection({
  pointsPromise,
  programPromise,
  benefitsPromise,
}: {
  pointsPromise: Promise<any>
  programPromise: Promise<any>
  benefitsPromise: Promise<any>
}) {
  const [pointsRes, programRes, benefitsRes] = await Promise.all([
    pointsPromise,
    programPromise,
    benefitsPromise,
  ])

  const points = pointsRes.success ? (pointsRes.data as PointsData).pontos_acumulados : 0
  const program = programRes.success ? (programRes.data as Programa) : null
  const benefits = benefitsRes.success ? (benefitsRes.data as SaldoPontos[]) : []

  // Valores padrão para conversão de pontos
  const pontosPorPercent = program?.regras?.pontos_por_real ? Number(program.regras.pontos_por_real) : 200
  const maxDiscount = program?.desconto_maximo ?? 40

  const currentBenefit = program ? benefits.find(b => b.programa === program.id) : null
  const currentDiscount = currentBenefit ? Number(currentBenefit.desconto_percentual) : 0

  // Se já atingiu o desconto máximo
  if (currentDiscount >= maxDiscount) {
    return (
      <Card className="bg-white border border-morador-outline-variant/30 p-6 shadow-sm rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h4 className="text-lg font-bold text-morador-primary">Progresso do Desconto</h4>
            <p className="text-sm text-morador-on-surface-variant">Você atingiu o teto máximo de desconto!</p>
          </div>
          <div className="px-4 py-1.5 bg-[#E8F5E9] text-[#2E7D32] font-bold rounded-lg text-sm flex items-center">
            {maxDiscount}% Máximo
          </div>
        </div>
        <ProgressBar value={maxDiscount} max={maxDiscount} />
        <div className="flex justify-between text-xs text-morador-outline mt-2 font-bold">
          <span>{formatNumber(points)} pts</span>
          <span>Parabéns!</span>
        </div>
      </Card>
    )
  }

  // Define os limites das faixas
  // O estilo mostra por exemplo 5% -> 8% (ou seja, faixas de desconto).
  // Faixas comuns podem ser calculadas dinamicamente:
  const nextDiscount = Math.min(currentDiscount + 3, maxDiscount) // Avança 3% por vez ou até o limite
  
  const currentLimitPoints = currentDiscount * pontosPorPercent
  const nextLimitPoints = nextDiscount * pontosPorPercent
  
  const remainingPoints = Math.max(nextLimitPoints - points, 0)
  const progressPercent = Math.min(
    Math.max(((points - currentLimitPoints) / (nextLimitPoints - currentLimitPoints)) * 100, 0),
    100
  )

  return (
    <Card className="bg-white border border-morador-outline-variant/30 p-6 shadow-sm rounded-xl">
      {/* Header do progresso */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <div>
          <h4 className="text-lg font-bold text-morador-primary">Progresso para Próxima Faixa</h4>
          <p className="text-sm text-morador-on-surface-variant">
            Faltam <span className="font-bold text-morador-primary">{formatNumber(remainingPoints)} pontos</span> para atingir {nextDiscount}% de desconto
          </p>
        </div>
        
        {/* Pills de transição de faixas */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-morador-surface-container text-morador-primary font-bold rounded-lg text-xs">
            {currentDiscount}%
          </div>
          <MdArrowForward className="text-morador-outline" size={16} />
          <div className="px-3 py-1 bg-[#91F78E] text-[#00731E] font-bold rounded-lg text-xs">
            {nextDiscount}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 w-full bg-morador-surface-container rounded-full overflow-hidden mb-2">
        <div 
          className="absolute left-0 top-0 h-full bg-morador-primary rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Rótulos inferiores da barra */}
      <div className="flex justify-between text-xs text-morador-outline font-bold">
        <span>{formatNumber(currentLimitPoints)} pts</span>
        <span>{formatNumber(nextLimitPoints)} pts</span>
      </div>
    </Card>
  )
}

async function RecentCollections({ promise }: { promise: Promise<any> }) {
  const res = await promise
  const collections = res.success ? (res.data as ColetasResponse).results.slice(0, 3) : []

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) + " às " + date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    } catch {
      return dateStr
    }
  }

  if (collections.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl border border-morador-outline-variant/30">
        <p className="text-sm text-morador-on-surface-variant">Nenhuma coleta registrada para o seu imóvel ainda.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-morador-outline-variant/30 overflow-hidden shadow-sm">
      <div className="divide-y divide-morador-outline-variant/10">
        {collections.map((coleta) => (
          <Link
            key={coleta.id}
            href="/coletas"
            className="group flex justify-between items-center px-6 py-4 hover:bg-morador-surface-container-low transition-colors duration-150"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-morador-surface-container rounded-lg flex items-center justify-center text-morador-primary">
                <MdRecycling size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-morador-primary">{coleta.peso_kg} kg de resíduos</p>
                <p className="text-xs text-morador-outline">{formatDate(coleta.data_hora_coleta)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-morador-secondary">+{coleta.pontuacao} pts</span>
              <MdChevronRight className="text-morador-outline group-hover:translate-x-0.5 transition-transform" size={20} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// COMPONENTE PRINCIPAL (SERVER COMPONENT)
// -------------------------------------------------------------

export default async function MoradorDashboardView() {
  const user = await getCurrentUser()
  
  if (!user) return null

  // Dispara as requisições em paralelo no servidor
  const pointsPromise = apiAuthenticatedRequest<PointsData>("/api/accounts/me/points")
  const benefitsPromise = apiAuthenticatedRequest<SaldoPontos[]>("/api/accounts/me/benefits")
  const programPromise = apiAuthenticatedRequest<Programa>("/api/accounts/me/program")
  const collectionsPromise = apiAuthenticatedRequest<ColetasResponse>("/api/collection/collections")
  const propertiesPromise = apiAuthenticatedRequest<ImoveisResponse>("/api/program/properties")

  return (
    <div className="max-w-7xl mx-auto space-y-7 font-manrope">
      {/* Welcome Header */}
      <section className="space-y-1">
        <h1 className="text-3xl font-extrabold text-morador-primary tracking-tight">
          Olá, {user.nome.split(" ")[0]}! 👋
        </h1>
        <p className="text-sm text-morador-on-surface-variant">
          Acompanhe sua participação no Coleta Premiada e veja seu desconto acumulado.
        </p>
      </section>

      {/* Property Section */}
      <Suspense fallback={<Skeleton className="h-[98px]" />}>
        <PropertySection promise={propertiesPromise} />
      </Suspense>

      {/* Bento Grid */}
      <Suspense fallback={<Skeleton className="h-[155px]" />}>
        <BentoGridSection 
          pointsPromise={pointsPromise}
          benefitsPromise={benefitsPromise}
          programPromise={programPromise}
          collectionsPromise={collectionsPromise}
        />
      </Suspense>

      {/* Progress Bar Card */}
      <Suspense fallback={<Skeleton className="h-[148px]" />}>
        <ProgressSection 
          pointsPromise={pointsPromise}
          programPromise={programPromise}
          benefitsPromise={benefitsPromise}
        />
      </Suspense>

      {/* Ultimas Coletas Preview */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-morador-primary">Coletas Recentes</h2>
            <p className="text-xs text-morador-on-surface-variant">Confira o histórico das últimas 3 pesagens</p>
          </div>
          <Link
            href="/coletas"
            className="text-xs font-bold text-morador-secondary hover:underline flex items-center gap-1"
          >
            Ver tudo
            <MdChevronRight size={16} />
          </Link>
        </div>

        <Suspense fallback={
          <div className="space-y-3">
            <Skeleton className="h-[72px]" />
            <Skeleton className="h-[72px]" />
            <Skeleton className="h-[72px]" />
          </div>
        }>
          <RecentCollections promise={collectionsPromise} />
        </Suspense>
      </section>
    </div>
  )
}
