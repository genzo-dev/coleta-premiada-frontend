import z, { number } from "zod";

export const PublicUserSchema = z.object({
  id: z.number().default(0),
  nome: z.string().default(""),
  email: z.string().default(""),
});

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  cpf: z.string().nullable().optional(),
  nome: z.string(),
  perfil: z.string(),
  ativo: z.boolean(),
  roles: z.array(
    z.object({
      id: z.number(),
      nome: z.string(),
      descricao: z.string().nullable().optional(),
      ativo: z.boolean(),
    }),
  ),
});

export type PublicUser = z.infer<typeof PublicUserSchema>;
export type User = z.infer<typeof UserSchema>;
