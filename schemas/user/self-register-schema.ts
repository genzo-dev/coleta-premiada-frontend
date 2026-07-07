import z from "zod";

export const SelfRegisterSchema = z
  .object({
    nome: z.string().trim().nonempty("Informe um nome do usuário"),
    email: z.string().email("Informe um e-mail válido").trim(),
    password: z
      .string()
      .trim()
      .nonempty("Informe sua senha")
      .min(9, "A senha deve ter mais de 8 caracteres"),
    password2: z.string().trim(),
  })
  .refine((data) => data.password === data.password2, {
    path: ["password2"],
    message: "As senhas não coincidem",
  })
  .transform(({ nome, email, password }) => ({ nome, email, password }));

export type SelfRegisterDto = z.infer<typeof SelfRegisterSchema>;
