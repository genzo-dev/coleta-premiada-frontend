import { z } from "zod";

export const updateProgramRulesSchema = z.object({
  pontos_por_real: z.coerce.number().max(9999.99).optional(),
  minimo_para_beneficio: z.coerce.number().int().optional(),
  permite_acumulo_ciclos: z.preprocess((val) => val === "on", z.boolean()),
});

export type UpdateProgramRules = z.infer<typeof updateProgramRulesSchema>;
