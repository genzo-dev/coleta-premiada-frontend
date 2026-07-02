import z from "zod";

const CreateProgramSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .nonempty("Informe um nome para o programa")
      .max(120, "O nome do programa deve ter no máximo 120 caracteres"),
    descricao: z.string().trim().optional(),
    data_inicio: z.date("Informe a data de início do programa"),
    data_fim: z.date("Informe a data de fim do programa"),
    ativo: z.boolean().optional(),
    desconto_maximo: z
      .number()
      .nonoptional("Informe o desconto máximo do programa"),
  })
  .refine((data) => {
    (data.data_fim > data.data_inicio,
      {
        message: "A data de fim deve ser posterior à data de início",
        path: ["data_fim"],
      });
  });

export type CreateProgramDto = z.infer<typeof CreateProgramSchema>;
