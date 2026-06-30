"use client";

import { useEffect, useState } from "react";
import { MdCheckCircle, MdCancel, MdHome, MdAdd } from "react-icons/md";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImovelForm from "@/components/ImovelForm";
import { buscarImovelAction } from "@/actions/imovel/buscar-imovel-action";
import type { Imovel } from "@/types/entities/imovel";

function formatCep(cep: string) {
  const digits = cep.replace(/\D/g, "");
  return digits.length === 8
    ? `${digits.slice(0, 5)}-${digits.slice(5)}`
    : cep;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function StatusBadge({ ativo }: { ativo: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
        ativo ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
      }`}
    >
      {ativo ? (
        <MdCheckCircle className="w-3.5 h-3.5" />
      ) : (
        <MdCancel className="w-3.5 h-3.5" />
      )}
      {ativo ? "Ativo" : "Inativo"}
    </span>
  );
}

function ImovelCard({ imovel }: { imovel: Imovel }) {
  const enderecoCompleto = [
    imovel.logradouro,
    imovel.numero,
    imovel.complemento,
    imovel.bairro,
    `${imovel.cidade} — ${imovel.estado}`,
    formatCep(imovel.cep),
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
            Inscrição imobiliária
          </p>
          <p className="text-base font-semibold text-foreground">
            {imovel.inscricao}
          </p>
        </div>
        <StatusBadge ativo={imovel.ativo} />
      </div>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs text-muted-foreground">Endereço</dt>
          <dd className="text-sm text-foreground">{enderecoCompleto}</dd>
        </div>

        <div className="flex flex-col gap-0.5">
          <dt className="text-xs text-muted-foreground">Data de adesão</dt>
          <dd className="text-sm text-foreground">
            {formatDate(imovel.data_adesao)}
          </dd>
        </div>

        <div className="flex flex-col gap-0.5">
          <dt className="text-xs text-muted-foreground">
            Moradores cadastrados
          </dt>
          <dd className="text-sm text-foreground">{imovel.num_moradores}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function MeuImovelPage() {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    setFetchError(null);
    const result = await buscarImovelAction();
    if (result.success) {
      setImoveis(result.imoveis);
    } else {
      setFetchError(result.error);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleFormSuccess() {
    setShowForm(false);
    await load();
  }

  const hasImoveis = imoveis.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdHome className="w-6 h-6" />
          Meu Imóvel
        </h1>

        {!loading && !fetchError && hasImoveis && !showForm && (
          <Button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 bg-[#116F51] hover:bg-emerald-800 text-white"
          >
            <MdAdd className="w-4 h-4" />
            Adicionar imóvel
          </Button>
        )}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Carregando...
        </div>
      )}

      {!loading && fetchError && (
        <p className="text-sm text-destructive">{fetchError}</p>
      )}

      {!loading && !fetchError && (
        <>
          {hasImoveis && (
            <div className="flex flex-col gap-4 max-w-2xl">
              {imoveis.map((imovel) => (
                <ImovelCard key={imovel.id} imovel={imovel} />
              ))}
              <p className="text-xs text-muted-foreground">
                Os dados do imóvel são gerenciados pelo gestor do programa. Em
                caso de divergências, entre em contato com a administração.
              </p>
            </div>
          )}

          {(showForm || !hasImoveis) && (
            <div className="flex flex-col gap-4">
              {!hasImoveis && (
                <p className="text-sm text-muted-foreground">
                  Você ainda não possui um imóvel cadastrado no programa.
                  Preencha o formulário abaixo para realizar a adesão.
                </p>
              )}
              <ImovelForm
                onSuccess={handleFormSuccess}
                onCancel={hasImoveis ? () => setShowForm(false) : undefined}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
