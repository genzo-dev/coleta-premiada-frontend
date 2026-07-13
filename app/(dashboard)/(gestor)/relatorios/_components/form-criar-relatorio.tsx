"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { createReportAction } from "@/actions/gestor/reports-ia-actions";
import type { Programa } from "@/types/entities/programa";

const TIPO_LABELS: Record<string, string> = {
  participacao: "Participação",
  impacto: "Impacto",
  ranking: "Ranking",
  auditoria: "Auditoria",
};

type Props = {
  programs: Programa[];
  onCreated: () => void;
};

export function FormCriarRelatorio({ programs, onCreated }: Props) {
  const [tipo, setTipo] = useState("participacao");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [programaId, setProgramaId] = useState("");
  const [direcionamento, setDirecionamento] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!inicio || !fim) {
      setError("Informe o período de análise.");
      return;
    }

    setSubmitting(true);
    const result = await createReportAction({
      tipo,
      periodo: { inicio, fim },
      programa_id: programaId ? Number(programaId) : undefined,
      direcionamento: direcionamento || undefined,
    });

    setSubmitting(false);

    if (!result) {
      setError("Erro ao criar relatório. Tente novamente.");
      return;
    }

    // Reset form
    setDirecionamento("");
    onCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-border p-6 shadow-sm flex flex-col gap-5"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-emerald-600" />
        <h3 className="text-base font-semibold text-foreground">
          Gerar Novo Relatório com IA
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tipo */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Tipo de Relatório
          </span>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          >
            {Object.entries(TIPO_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        {/* Início */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Data Início
          </span>
          <input
            type="date"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </label>

        {/* Fim */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Data Fim
          </span>
          <input
            type="date"
            value={fim}
            onChange={(e) => setFim(e.target.value)}
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </label>

        {/* Programa */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Programa (opcional)
          </span>
          <select
            value={programaId}
            onChange={(e) => setProgramaId(e.target.value)}
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          >
            <option value="">Todos os programas</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Direcionamento */}
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Direcionamento da Análise (opcional)
        </span>
        <textarea
          rows={3}
          value={direcionamento}
          onChange={(e) => setDirecionamento(e.target.value)}
          placeholder="Ex: Foque nos bairros com menor engajamento e sugira ações práticas para aumentar a participação."
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-y"
        />
      </label>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Criando...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Gerar Relatório
            </>
          )}
        </button>
      </div>
    </form>
  );
}
