import { Badge } from "@/components/ui/badge";

type Props = {
  variant:
    | "default"
    | "ativo"
    | "confirmado"
    | "aceita"
    | "inativo"
    | "negada"
    | "pendente"
    | "analise";
};

export function StatusBadge({ variant }: Props) {
  const styles = {
    ativo: "bg-green-100 text-green-700",
    confirmado: "bg-green-100 text-green-700",
    aceita: "bg-green-100 text-green-700",

    inativo: "bg-red-100 text-red-700",
    negada: "bg-red-100 text-red-700",

    pendente: "bg-orange-100 text-orange-700",
    analise: "bg-orange-100 text-orange-700",

    default: "",
  };

  return <Badge className={styles[variant]}>{variant}</Badge>;
}
