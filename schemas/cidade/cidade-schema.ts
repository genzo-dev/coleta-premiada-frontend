import z from "zod";

export const CidadeSchema = z.object({
  id: z.number(),
  nome: z.string(),
  uf: z.string(),
  ativo: z.boolean(),
});

export type Cidade = z.infer<typeof CidadeSchema>;
