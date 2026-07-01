import * as React from "react"
import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request"
import { getCurrentUser } from "@/lib/auth/get-current-user"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import PropertyForm from "@/components/PropertyForm"
import { MdHome, MdPeople, MdInfo, MdCalendarToday, MdPin } from "react-icons/md"

interface Usuario {
  id: number
  email: string
  cpf: string | null
  nome: string
  perfil: string
  ativo: boolean
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
  num_moradores: number
  ativo: boolean
  data_adesao: string
  moradores: Usuario[]
}

interface ImoveisResponse {
  count: number
  results: Imovel[]
}

export default async function MeuImovelView() {
  const user = await getCurrentUser()
  if (!user) return null

  const response = await apiAuthenticatedRequest<ImoveisResponse>("/api/program/properties")
  const properties = response.success ? response.data.results : []
  const property = properties.length > 0 ? properties[0] : null

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
    } catch {
      return dateStr
    }
  }

  const formatCpf = (cpfStr: string | null) => {
    if (!cpfStr) return "Não informado"
    const cleaned = cpfStr.replace(/\D/g, "")
    if (cleaned.length !== 11) return cpfStr
    return `${cleaned.slice(0, 3)}.***.***-${cleaned.slice(9)}` // format and mask for privacy
  }

  // Se o morador NÃO possuir imóvel cadastrado
  if (!property) {
    return (
      <div className="max-w-7xl mx-auto space-y-7 font-manrope">
        <section className="space-y-1">
          <h1 className="text-3xl font-extrabold text-morador-primary tracking-tight">Meu Imóvel</h1>
          <p className="text-sm text-morador-on-surface-variant">Adesão ao programa de coleta seletiva e gestão de cadastro.</p>
        </section>

        <PropertyForm />
      </div>
    )
  }

  // Se possuir, exibe em modo leitura
  return (
    <div className="max-w-4xl mx-auto space-y-8 font-manrope">
      <section className="space-y-1">
        <h1 className="text-3xl font-extrabold text-morador-primary tracking-tight">Meu Imóvel</h1>
        <p className="text-sm text-morador-on-surface-variant">Dados de cadastro e moradores vinculados ao seu imóvel participante.</p>
      </section>

      {/* Grid com detalhes do Imóvel e Moradores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Detalhes do Imóvel (col-span-2) */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-white border border-morador-outline-variant/30">
            <CardHeader className="flex flex-row justify-between items-center border-b border-morador-outline-variant/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E8F5E9] rounded-lg flex items-center justify-center text-[#2E7D32]">
                  <MdHome size={24} />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-morador-primary">Dados Residenciais</CardTitle>
                  <CardDescription className="text-xs">Informações oficiais do imóvel participante</CardDescription>
                </div>
              </div>
              
              <StatusBadge variant={property.ativo ? "ativo" : "inativo"}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] inline-block animate-pulse" />
                {property.ativo ? "Ativo" : "Inativo"}
              </StatusBadge>
            </CardHeader>

            <CardContent className="pt-6 space-y-5">
              {/* Inscrição Imobiliária */}
              <div className="flex items-start gap-3">
                <MdPin className="text-morador-outline mt-0.5" size={20} />
                <div>
                  <p className="text-[10px] font-extrabold text-morador-on-surface-variant uppercase tracking-wider">Inscrição Imobiliária</p>
                  <p className="text-base font-bold text-morador-primary">{property.inscricao}</p>
                </div>
              </div>

              {/* Endereço Completo */}
              <div className="flex items-start gap-3">
                <MdHome className="text-morador-outline mt-0.5" size={20} />
                <div>
                  <p className="text-[10px] font-extrabold text-morador-on-surface-variant uppercase tracking-wider">Endereço</p>
                  <p className="text-base font-bold text-morador-primary">
                    {property.logradouro}, {property.numero}
                    {property.complemento && ` – ${property.complemento}`}
                  </p>
                  <p className="text-sm text-morador-on-surface-variant">{property.bairro} – {property.cidade} / {property.estado}</p>
                  <p className="text-xs text-morador-outline mt-0.5">CEP: {property.cep}</p>
                </div>
              </div>

              {/* Data Adesão e Num moradores */}
              <div className="grid grid-cols-2 gap-4 border-t border-morador-outline-variant/10 pt-4">
                <div className="flex items-start gap-3">
                  <MdCalendarToday className="text-morador-outline mt-0.5" size={18} />
                  <div>
                    <p className="text-[10px] font-extrabold text-morador-on-surface-variant uppercase tracking-wider">Data de Adesão</p>
                    <p className="text-sm font-bold text-morador-primary">{formatDate(property.data_adesao)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdPeople className="text-morador-outline mt-0.5" size={18} />
                  <div>
                    <p className="text-[10px] font-extrabold text-morador-on-surface-variant uppercase tracking-wider">Nº de Moradores</p>
                    <p className="text-sm font-bold text-morador-primary">{property.num_moradores}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aviso informativo de Edição */}
          <div className="flex items-start gap-4 p-4 bg-[#E8F5E9]/30 rounded-xl border border-[#C8E6C9]/40">
            <MdInfo className="text-[#2E7D32] shrink-0 mt-0.5" size={20} />
            <p className="text-xs text-[#2E7D32] leading-relaxed">
              <strong>Modo de Leitura:</strong> Apenas o Gestor do Programa de Coleta Seletiva possui permissões para editar ou alterar as informações do imóvel cadastrado. Caso note alguma incoerência de dados, abra um ticket ou contestação na seção de suporte.
            </p>
          </div>
        </div>

        {/* Moradores Vinculados (col-span-1) */}
        <div className="md:col-span-1">
          <Card className="bg-white border border-morador-outline-variant/30 h-full">
            <CardHeader className="border-b border-morador-outline-variant/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-morador-surface-container rounded-lg flex items-center justify-center text-morador-primary">
                  <MdPeople size={24} />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-morador-primary">Moradores</CardTitle>
                  <CardDescription className="text-[10px]">Pessoas vinculadas a esta residência</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* O Titular é sempre exibido primeiro */}
                <div className="pb-3 border-b border-morador-outline-variant/10">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-morador-primary">{property.moradores.length > 0 ? property.moradores[0].nome : "Não informado"}</p>
                    <span className="text-[9px] bg-morador-primary/10 text-morador-primary font-bold px-2 py-0.5 rounded-full uppercase">
                      Titular
                    </span>
                  </div>
                  <p className="text-xs text-morador-outline mt-0.5">
                    CPF: {formatCpf(property.moradores.length > 0 ? property.moradores[0].cpf : null)}
                  </p>
                </div>

                {/* Lista os demais moradores do imóvel */}
                {property.moradores.slice(1).map((morador) => (
                  <div key={morador.id} className="pb-3 border-b border-morador-outline-variant/10 last:border-b-0 last:pb-0">
                    <p className="text-sm font-bold text-morador-primary">{morador.nome}</p>
                    <p className="text-xs text-morador-outline mt-0.5">CPF: {formatCpf(morador.cpf)}</p>
                  </div>
                ))}

                {property.moradores.length <= 1 && (
                  <p className="text-xs text-morador-outline italic text-center py-4">Nenhum outro morador vinculado ao imóvel.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
