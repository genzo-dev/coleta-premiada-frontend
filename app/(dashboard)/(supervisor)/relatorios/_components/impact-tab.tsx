import { apiAuthenticatedRequest } from "@/lib/api-authenticated-request";
import type { ImpactData } from "@/types/entities/relatorios";
import { MdRecycling, MdStars, MdHome, MdCardGiftcard } from "react-icons/md";

function MetricCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  description?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-gray-50/50 p-6 flex flex-col gap-3 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-emerald-100 text-[#116F51] shadow-sm">
          <Icon size={20} />
        </div>
      </div>
      <div>
        <span className="text-3xl font-bold text-foreground">{value}</span>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}

export async function ImpactTab({ programaId }: { programaId?: string }) {
  const url = `/api/program/reports/impact${programaId ? `?programa_id=${programaId}` : ""}`;
  const response = await apiAuthenticatedRequest<ImpactData>(url);

  let impact: ImpactData = {
    total_coletas: 0,
    total_pontos: 0,
    total_imoveis_participantes: 0,
    soma_desconto_percentual: 0,
  };

  if (response.success && response.data) {
    impact = response.data;
  }

  const numberFormatter = new Intl.NumberFormat("pt-BR");
  const percentFormatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Impacto Consolidado</h2>
        <p className="text-sm text-gray-500">Métricas agregadas que demonstram a evolução do programa de reciclagem e os benefícios reais convertidos aos moradores.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Imóveis Engajados" 
          value={numberFormatter.format(impact.total_imoveis_participantes)} 
          icon={MdHome} 
          description="Total de residências que já participaram ativamente." 
        />
        <MetricCard 
          title="Coletas Realizadas" 
          value={numberFormatter.format(impact.total_coletas)} 
          icon={MdRecycling} 
          description="Soma de todos os registros de pesagem e entrega." 
        />
        <MetricCard 
          title="Pontos Distribuídos" 
          value={`${numberFormatter.format(Math.round(parseFloat(String(impact.total_pontos || 0))))}`} 
          icon={MdStars} 
          description="Moeda virtual injetada na carteira dos moradores." 
        />
        <MetricCard 
          title="Descontos de IPTU" 
          value={`${percentFormatter.format(parseFloat(String(impact.soma_desconto_percentual || 0)))}%`} 
          icon={MdCardGiftcard} 
          description="Soma agregada de todas as taxas percentuais geradas." 
        />
      </div>
    </div>
  );
}
