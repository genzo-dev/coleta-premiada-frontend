import z from "zod";

export const CreateUserSchema = z.object({
  nome: z.string().trim().nonempty("Informe um nome do usuário"),
  email: z.string().email("Informe um e-mail válido").trim(),
  perfil: z.enum(["supervisor", "gestor", "gerente_geral"], {
    message: "Perfil inválido",
  }),
  cidade: z.coerce.number().optional(),
  cpf: z.string().trim().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
