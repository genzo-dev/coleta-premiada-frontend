import isValidCPF from "@/utils/is-valid-cpf";
import z from "zod";

export const GoogleCadastroComplementarSchema = z.object({
  nome: z.string().trim().nonempty("Informe seu nome"),
  sobrenome: z.string().trim().nonempty("Informe seu sobrenome"),
  cpf: z
    .string()
    .trim()
    .nonempty("Informe seu CPF")
    .refine((cpf) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf), {
      message: "CPF deve estar no formato 000.000.000-00",
    })
    .refine((cpf) => isValidCPF(cpf), {
      message: "CPF inválido. Verifique os dígitos.",
    }),
});

export type GoogleCadastroComplementarDto = z.infer<
  typeof GoogleCadastroComplementarSchema
>;
