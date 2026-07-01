import { z } from "zod"

export const CreatePropertySchema = z.object({
  cep: z
    .string()
    .min(8, "O CEP deve ter pelo menos 8 caracteres")
    .max(9, "O CEP deve ter no máximo 9 caracteres")
    .regex(/^\d{5}-?\d{3}$/, "Formato de CEP inválido (use XXXXX-XXX ou apenas números)"),
  logradouro: z.string().min(3, "O logradouro deve ter pelo menos 3 caracteres"),
  numero: z.string().min(1, "O número é obrigatório"),
  complemento: z.string().optional().or(z.literal("")),
  bairro: z.string().min(2, "O bairro deve ter pelo menos 2 caracteres"),
  cidade: z.string().min(2, "A cidade deve ter pelo menos 2 caracteres"),
  estado: z.string().length(2, "O estado deve ter exatamente 2 caracteres (UF)"),
  num_moradores: z.coerce
    .number()
    .int("Deve ser um número inteiro")
    .min(1, "Deve haver pelo menos 1 morador"),
})

export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>
