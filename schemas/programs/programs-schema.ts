import z from "zod";

const regrasSchema = z.object({
  pontos_por_real: z.coerce.number(),
  minimo_para_beneficio: z.coerce.number().int().nonnegative(),
  permite_acumulo_ciclos: z.coerce.boolean(),
});

export const ProgramsSchema = z.object({
  id: z.number(),
  nome: z.string(),
  descricao: z.string().optional(),
  data_inicio: z.date(),
  data_fim: z.date(),
  ativo: z.boolean(),
  desconto_maximo: z.coerce.number(),
  regras: regrasSchema,
});

export type Program = z.infer<typeof ProgramsSchema>;
