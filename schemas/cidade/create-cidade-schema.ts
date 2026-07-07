import z from "zod";

export const CreateCidadeSchema = z.object({
  nome: z.string().trim().nonempty("Informe o nome da cidade"),
  uf: z
    .string()
    .trim()
    .nonempty("Informe a UF")
    .length(2, "A UF deve ter 2 letras")
    .toUpperCase(),
  ativo: z.coerce.boolean().default(true),
});

export type CreateCidadeDto = z.infer<typeof CreateCidadeSchema>;
