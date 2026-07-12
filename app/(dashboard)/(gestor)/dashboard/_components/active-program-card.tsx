import { MdEventNote, MdCalendarToday, MdOutlineDiscount } from "react-icons/md";
import { Programa } from "@/types/entities/programa";

export default function ActiveProgramCard({ program }: { program: Programa | undefined }) {
  if (!program) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 shadow-sm flex-1 flex flex-col items-center justify-center text-muted-foreground w-full">
        <MdEventNote className="h-12 w-12 mb-3 opacity-20" />
        <p className="text-sm font-medium">Nenhum programa selecionado.</p>
      </div>
    );
  }

  const formatData = (iso: string) => {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "2-digit"
    });
  };

  return (
    <div className="rounded-2xl border border-[#116F51]/30 bg-gradient-to-br from-emerald-50/80 to-[#116F51]/10 p-5 shadow-sm flex-1 flex flex-col w-full relative overflow-hidden group">
      
      {/* Decorative background element */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#116F51]/5 rounded-full blur-2xl group-hover:bg-[#116F51]/10 transition-colors duration-500"></div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <div className="bg-[#116F51] p-1.5 rounded-lg text-white shadow-sm">
          <MdEventNote className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-[#116F51] uppercase tracking-wider text-xs">Programa Ativo</h3>
      </div>
      
      <div className="flex-1 flex flex-col relative z-10">
        <div>
          <h2 className="text-xl font-black text-foreground mb-1 leading-tight tracking-tight">
            {program.nome}
          </h2>
          <p className="text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed">
            {program.descricao || "Sem descrição definida para este programa."}
          </p>
        </div>

        <div className="mt-auto pt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-2.5 rounded-xl border border-white shadow-xs">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-100/50 p-1.5 rounded-lg">
                <MdCalendarToday className="w-3.5 h-3.5 text-[#116F51]" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Vigência</span>
            </div>
            <span className="text-xs font-semibold text-foreground">
              {formatData(program.data_inicio)} - {formatData(program.data_fim)}
            </span>
          </div>

          <div className="flex items-center justify-between bg-[#116F51] text-white p-2.5 rounded-xl shadow-md border border-[#116F51]/50 relative overflow-hidden">
             <div className="absolute -right-2 -bottom-4 opacity-10">
               <MdOutlineDiscount className="w-16 h-16" />
             </div>
            <div className="flex items-center gap-2 relative z-10">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <MdOutlineDiscount className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">Máximo IPTU</span>
            </div>
            <span className="text-lg font-black tracking-tight relative z-10">
              {program.desconto_maximo}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
