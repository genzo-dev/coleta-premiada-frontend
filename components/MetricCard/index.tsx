type MetricCardProps = {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  description?: string;
};

export default function MetricCard({
  title,
  value,
  icon: Icon,
  description,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 flex items-center justify-between shadow-xs">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#116F51]">
        <Icon size={24} />
      </div>
    </div>
  );
}
