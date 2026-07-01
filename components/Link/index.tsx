import clsx from "clsx";
import Link from "next/link";

type DefaultLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export default function DefaultLink({
  href,
  children,
  className,
}: DefaultLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "text-sm text-muted-foreground hover:text-foreground transition-colors mt-2",
        className,
      )}
    >
      {children}
    </Link>
  );
}
