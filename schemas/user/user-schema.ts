import z from "zod";

const Cidade = z.object({
  id: z.number(),
  nome: z.string(),
  uf: z.string(),
  ativo: z.boolean(),
});

export const PublicUserSchema = z.object({
  id: z.number().default(0),
  nome: z.string().default(""),
  email: z.string().default(""),
  email_confirmado: z.boolean().default(false),
});

const CidadeRefSchema = z.object({
  id: z.number(),
  nome: z.string(),
  uf: z.string(),
  ativo: z.boolean(),
});

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  cpf: z.string().nullable().optional(),
  nome: z.string(),
  sobrenome: z.string().default(""),
  perfil: z.string(),
  cidade: Cidade.nullable().optional(),
  ativo: z.boolean(),
  cadastro_completo: z.boolean().default(true),
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
