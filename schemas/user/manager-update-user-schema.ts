import isValidCPF from "@/utils/is-valid-cpf";
import z from "zod";

const cidadeExigida = (perfil: string) =>
  perfil === "gestor" || perfil === "supervisor";

export const ManagerUpdateUserSchema = z
  .object({
    nome: z.string().trim().nonempty("Informe um nome do usuário"),
    cpf: z
      .string()
      .or(z.literal(""))
      .transform((val) => (val === "" ? null : val))
      .nullable()
      .optional()
      .refine((cpf) => !cpf || /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf), {
        message: "CPF deve estar no formato 000.000.000-00",
      })
      .refine((cpf) => !cpf || isValidCPF(cpf), { message: "CPF inválido" }),
    perfil: z.enum(["morador", "supervisor", "gestor", "gerente_geral"], {
      message: "Perfil inválido",
    }),
    cidade: z.coerce.number().optional(),
    ativo: z.coerce.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (cidadeExigida(data.perfil) && !data.cidade) {
      ctx.addIssue({
        code: "custom",
        path: ["cidade"],
        message: "Cidade é obrigatória para esse perfil",
      });
    }
  })
  .transform(({ nome, cpf, perfil, cidade, ativo }) => ({
    nome,
    cpf,
    perfil,
    cidade: cidadeExigida(perfil) ? cidade : null,
    ativo,
  }));

export type ManagerUpdateUserDto = z.infer<typeof ManagerUpdateUserSchema>;
