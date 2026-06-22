import z from "zod";

const CreateUserBase = z.object({
  nome: z.string().trim().nonempty("Informe um nome do usuário"),
  email: z.string().email("Informe um e-mail válido").trim(),
  perfil: z.enum(["supervisor", "morador", "gestor"], {
    message: "Perfil inválido",
  }),
  password: z
    .string()
    .trim()
    .nonempty("Informe sua senha")
    .min(9, "A senha deve ter mais de 8 caracteres"),
  password2: z.string().trim(),
});

export const CreateUserSchema = CreateUserBase.refine(
  (data) => {
    return data.password === data.password2;
  },
  {
    path: ["password2"],
    message: "As senhas não coincidem",
  },
).transform(({ nome, email, perfil, password }) => {
  return { nome, email, perfil, password };
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
