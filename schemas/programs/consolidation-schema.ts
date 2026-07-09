import z from "zod";

export const ConsolidationHistorySchema = z.object({
  id: z.number().optional(),
  executada_em: z.string(),
  programa: z.number(),
  programa_nome: z.string().optional(),
  ciclo: z.number().nullable().optional(),
  ciclo_nome: z.string().optional(),
  status: z.enum(["pendente", "processando", "concluida", "falhou"]),
  total_imoveis: z.number(),
  total_pontos: z.number(),
  executada_por: z.number().or(z.string()).optional(),
  executada_por_nome: z.string().optional(),
  observacao: z.string().optional(),
});

export type ConsolidationHistory = z.infer<typeof ConsolidationHistorySchema>;
