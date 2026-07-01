import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors border",
  {
    variants: {
      variant: {
        default: "bg-morador-surface-container text-morador-on-surface-variant border-morador-outline-variant/30",
        ativo: "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]/40 dark:bg-[#1B5E20]/20 dark:text-[#81C784]",
        aceita: "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]/40 dark:bg-[#1B5E20]/20 dark:text-[#81C784]",
        confirmado: "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]/40 dark:bg-[#1B5E20]/20 dark:text-[#81C784]",
        inativo: "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]/40 dark:bg-[#C62828]/20 dark:text-[#E57373]",
        negada: "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]/40 dark:bg-[#C62828]/20 dark:text-[#E57373]",
        pendente: "bg-[#FFF3E0] text-[#ED6C02] border-[#FFE0B2]/40 dark:bg-[#E65100]/20 dark:text-[#FFB74D]",
        analise: "bg-[#FFF3E0] text-[#ED6C02] border-[#FFE0B2]/40 dark:bg-[#E65100]/20 dark:text-[#FFB74D]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

interface StatusBadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof statusBadgeVariants> {}

function StatusBadge({ className, variant, ...props }: StatusBadgeProps) {
  return (
    <span
      data-slot="status-badge"
      className={cn(statusBadgeVariants({ variant, className }))}
      {...props}
    />
  )
}

export { StatusBadge, statusBadgeVariants }
