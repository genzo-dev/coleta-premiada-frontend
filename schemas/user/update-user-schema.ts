import z from "zod";

export const UpdateUserSchema = z.object({
  nome: z.string().max(150, "O nome deve ter até 150 caracteres"),
  cpf: z.string().length(14, "O CPF deve ter 14 caracteres"),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
