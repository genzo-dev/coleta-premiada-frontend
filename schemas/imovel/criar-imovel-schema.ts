import z from "zod";

export const CriarImovelSchema = z.object({
  inscricao: z.string().trim().min(1, "Informe a inscrição imobiliária"),
  cep: z
    .string()
    .trim()
    .regex(/^\d{5}-?\d{3}$/, "CEP inválido (formato: XXXXX-XXX)"),
  logradouro: z.string().trim().min(1, "Informe o logradouro"),
  numero: z.string().trim().min(1, "Informe o número"),
  complemento: z.string().trim().optional(),
  bairro: z.string().trim().min(1, "Informe o bairro"),
  cidade: z.string().trim().min(1, "Informe a cidade"),
  estado: z
    .string()
    .trim()
    .length(2, "Informe a sigla do estado (ex: CE)"),
  num_moradores: z.coerce
    .number()
    .int()
    .min(1, "Deve haver pelo menos 1 morador"),
});

export type CriarImovelDto = z.infer<typeof CriarImovelSchema>;
