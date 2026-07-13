import z from "zod";

export const AnalyzeDisputeSchema = z.object({
  status: z.enum(["em_analise", "aceita", "negada"], {
    message: "Status inválido",
  }),
  resposta: z.string().trim().optional(),
});

export type AnalyzeDisputeDto = z.infer<typeof AnalyzeDisputeSchema>;
