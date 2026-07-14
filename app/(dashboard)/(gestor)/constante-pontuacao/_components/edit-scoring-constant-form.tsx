"use client";

import { useState, useTransition } from "react";
import { atualizarConstanteAction } from "@/actions/gestor/atualizar-constante-action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export function EditScoringConstantForm({
  currentValue,
}: {
  currentValue: string;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [inputValue, setInputValue] = useState(currentValue);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = async () => {
    const formData = new FormData();
    formData.set("pontos_por_kg", inputValue);

    startTransition(async () => {
      const result = await atualizarConstanteAction(
        { errors: [], success: false },
        formData,
      );
      if (result.success) {
        toast.success("Sucesso!", {
          description: "Constante de pontuação atualizada com sucesso.",
        });
        setShowConfirm(false);
      } else if (result.errors?.length > 0) {
        toast.error("Erro", {
          description: result.errors[0],
        });
        setShowConfirm(false);
      }
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowConfirm(true);
        }}
        className="flex flex-col gap-4 max-w-sm mt-6 p-5 border border-border rounded-xl bg-gray-50/50"
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Alterar Valor da Constante
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="pontos_por_kg" className="text-sm font-medium text-gray-700">
            Pontos por Kg
          </label>
          <Input
            id="pontos_por_kg"
            name="pontos_por_kg"
            type="number"
            step="0.0001"
            min="0.0001"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
            className="h-10 text-base"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Valores até 4 casas decimais (Ex: 1.5000)
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#1A5538] hover:bg-[#114028] mt-2 h-11"
        >
          Salvar Alteração
        </Button>
      </form>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent
          title="Atenção: Alteração Crítica"
          description="Você está prestes a alterar a regra global de pontuação do sistema."
        >
          <div className="py-2">
            <p className="text-sm text-gray-700 bg-red-50 p-4 border border-red-100 rounded-lg">
              <strong>Aviso:</strong> Alterar este valor afeta o cálculo de pontos de 
              <strong> TODAS as coletas futuras</strong>. Esta ação não pode ser desfeita automaticamente.
            </p>
          </div>
          <div className="mt-4 flex sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirm(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700 text-white min-w-[120px]"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sim, alterar valor"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
