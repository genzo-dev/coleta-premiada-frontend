import isValidCPF from "@/utils/is-valid-cpf";
import z from "zod";

export const UpdateUserSchema = z.object({
  nome: z.string().max(150, "O nome deve ter até 150 caracteres"),
  cpf: z
    .string()
    .or(z.literal(""))
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .optional()
    .refine(
      (cpf) => {
        if (!cpf) return true;
        return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
      },
      {
        message: "CPF deve estar no formato 000.000.000-00",
      },
    )
    .refine(
      (cpf) => {
        if (!cpf) return true;
        return isValidCPF(cpf);
      },
      {
        message: "CPF inválido",
      },
    ),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
