import Link from "next/link";

type DefaultLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function DefaultLink({ href, children }: DefaultLinkProps) {
  return (
    <Link href={href} className="hover:underline decoration-white">
      {children}
    </Link>
  );
}
