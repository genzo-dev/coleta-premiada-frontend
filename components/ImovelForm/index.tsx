"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { criarImovelAction } from "@/actions/imovel/criar-imovel-action";
import { buscarCidadesAction } from "@/actions/cidade/buscar-cidades-action";
import {
  CriarImovelSchema,
  type CriarImovelDto,
} from "@/schemas/imovel/criar-imovel-schema";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import type { Cidade } from "@/types/entities/cidade";

type ViaCepResponse = {
  erro?: boolean;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

type Props = {
  onSuccess: () => void;
  onCancel?: () => void;
};

export default function ImovelForm({ onSuccess, onCancel }: Props) {
  const [cepLoading, setCepLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CriarImovelDto>();

  useEffect(() => {
    buscarCidadesAction().then((result) => {
      if (result.success) {
        setCidades(result.cidades);
      }
    });
  }, []);

  async function handleCepBlur(e: React.FocusEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length !== 8) return;

    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
      const data: ViaCepResponse = await res.json();

      if (data.erro) {
        setError("cep", { message: "CEP não encontrado" });
        return;
      }

      setValue("logradouro", data.logradouro, { shouldValidate: true });
      setValue("bairro", data.bairro, { shouldValidate: true });
      setValue("cidade", data.localidade, { shouldValidate: true });
      setValue("estado", data.uf, { shouldValidate: true });
    } catch {
      setError("cep", { message: "Erro ao buscar CEP" });
    } finally {
      setCepLoading(false);
    }
  }

  const onSubmit = handleSubmit(async (raw) => {
    setServerErrors([]);

    const parsed = CriarImovelSchema.safeParse(raw);
    if (!parsed.success) {
      setServerErrors(getZodErrorMessages(parsed.error.format()));
      return;
    }

    const result = await criarImovelAction(parsed.data);

    if (!result.success) {
      setServerErrors(result.errors);
      return;
    }

    onSuccess();
  });

  const disabled = isSubmitting || cepLoading;

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Cadastrar Imóvel
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Preencha o CEP para preenchimento automático do endereço.
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-5"
        noValidate
      >
        {/* Inscrição imobiliária */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="inscricao">
            Inscrição imobiliária <span className="text-destructive">*</span>
          </Label>
          <Input
            id="inscricao"
            placeholder="Ex: 1234567890"
            disabled={disabled}
            {...register("inscricao")}
          />
          {errors.inscricao && (
            <p className="text-sm text-destructive">
              {errors.inscricao.message}
            </p>
          )}
        </div>

        {/* CEP */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="cep">
            CEP <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="cep"
              placeholder="00000-000"
              maxLength={9}
              disabled={disabled}
              {...register("cep")}
              onBlur={handleCepBlur}
            />
            {cepLoading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
            )}
          </div>
          {errors.cep && (
            <p className="text-sm text-destructive">{errors.cep.message}</p>
          )}
        </div>

        {/* Logradouro + Número */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="logradouro">
              Logradouro <span className="text-destructive">*</span>
            </Label>
            <Input
              id="logradouro"
              placeholder="Rua, Avenida..."
              disabled={disabled}
              {...register("logradouro")}
            />
            {errors.logradouro && (
              <p className="text-sm text-destructive">
                {errors.logradouro.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="numero">
              Número <span className="text-destructive">*</span>
            </Label>
            <Input
              id="numero"
              placeholder="S/N"
              disabled={disabled}
              {...register("numero")}
            />
            {errors.numero && (
              <p className="text-sm text-destructive">
                {errors.numero.message}
              </p>
            )}
          </div>
        </div>

        {/* Complemento */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            id="complemento"
            placeholder="Apto, Bloco, Casa..."
            disabled={disabled}
            {...register("complemento")}
          />
        </div>

        {/* Bairro + Cidade + UF */}
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="bairro">
              Bairro <span className="text-destructive">*</span>
            </Label>
            <Input
              id="bairro"
              placeholder="Bairro"
              disabled={disabled}
              {...register("bairro")}
            />
            {errors.bairro && (
              <p className="text-sm text-destructive">
                {errors.bairro.message}
              </p>
            )}
          </div>

          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="cidade">
              Cidade <span className="text-destructive">*</span>
            </Label>
            <select
              id="cidade"
              disabled={disabled}
              className="flex h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              {...register("cidade")}
            >
              <option value="">Selecione...</option>
              {cidades.map((cidade) => (
                <option key={cidade.id} value={cidade.nome}>
                  {cidade.nome}/{cidade.uf}
                </option>
              ))}
            </select>
            {errors.cidade && (
              <p className="text-sm text-destructive">
                {errors.cidade.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="estado">
              UF <span className="text-destructive">*</span>
            </Label>
            <Input
              id="estado"
              placeholder="CE"
              maxLength={2}
              className="uppercase"
              disabled={disabled}
              {...register("estado")}
            />
            {errors.estado && (
              <p className="text-sm text-destructive">
                {errors.estado.message}
              </p>
            )}
          </div>
        </div>

        {/* Número de moradores */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="num_moradores">
            Número de moradores <span className="text-destructive">*</span>
          </Label>
          <Input
            id="num_moradores"
            type="number"
            min={1}
            placeholder="1"
            disabled={disabled}
            className="max-w-32"
            {...register("num_moradores")}
          />
          {errors.num_moradores && (
            <p className="text-sm text-destructive">
              {errors.num_moradores.message}
            </p>
          )}
        </div>

        {serverErrors.length > 0 && (
          <ul className="flex flex-col gap-1">
            {serverErrors.map((err, i) => (
              <li key={i} className="text-sm text-destructive">
                {err}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={onSubmit}
            disabled={disabled}
            className="h-11 bg-[#116F51] hover:bg-emerald-800 text-white"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "Cadastrar imóvel"
            )}
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={disabled}
              className="h-11"
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
