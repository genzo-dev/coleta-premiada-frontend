import isValidCPF from "@/utils/is-valid-cpf";
import z from "zod";

const cidadeExigida = (perfil: string) =>
  perfil === "gestor" || perfil === "supervisor";

const CreateUserBase = z.object({
  nome: z.string().trim().nonempty("Informe um nome do usuário"),
  email: z.string().email("Informe um e-mail válido").trim(),
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
  password: z
    .string()
    .trim()
    .nonempty("Informe uma senha")
    .min(9, "A senha deve ter mais de 8 caracteres"),
  password2: z.string().trim(),
});

export const CreateUserSchema = CreateUserBase.refine(
  (data) => data.password === data.password2,
  { path: ["password2"], message: "As senhas não coincidem" },
)
  .superRefine((data, ctx) => {
    if (cidadeExigida(data.perfil) && !data.cidade) {
      ctx.addIssue({
        code: "custom",
        path: ["cidade"],
        message: "Cidade é obrigatória para esse perfil",
      });
    }
  })
  .transform(({ nome, email, cpf, perfil, cidade, password }) => ({
    nome,
    email,
    cpf,
    perfil,
    cidade: cidadeExigida(perfil) ? cidade : null,
    password,
  }));

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
