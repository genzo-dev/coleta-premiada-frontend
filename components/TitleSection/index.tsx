type TitleSectionProps = {
  title: string;
  className?: string;
};

export default function TitleSection({ title, className }: TitleSectionProps) {
  return <h2 className={`font-bold ${className || ""}`}>{title}</h2>;
}
