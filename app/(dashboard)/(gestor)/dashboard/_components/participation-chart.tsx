"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MdTrendingUp } from "react-icons/md";

type ChartData = {
  label: string;
  coletas: number;
};

type ParticipationChartProps = {
  data: ChartData[];
  title?: string;
};

export default function ParticipationChart({ data, title = "Coletas por Ciclo" }: ParticipationChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground p-8 bg-card rounded-xl border border-border">
        <MdTrendingUp className="mb-2 h-10 w-10 text-muted-foreground/30" />
        <p className="text-sm">Nenhum dado de participação disponível.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col h-[640px]">
      <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
        <MdTrendingUp className="w-5 h-5 text-[#116F51]" />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="flex-1 w-full min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Bar dataKey="coletas" fill="#116F51" radius={[4, 4, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
