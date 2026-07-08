import z from "zod";

export const CreateRoleSchema = z.object({
  nome: z
    .string()
    .max(80, "O nome do papel não pode ter mais de 80 caracteres"),
  descricao: z.string().optional(),
  ativo: z.preprocess((val) => val === "on", z.boolean()),
});

export type CreateRoleDto = z.infer<typeof CreateRoleSchema>;
