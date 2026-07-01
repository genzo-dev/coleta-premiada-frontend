type SectionContainerProps = {
  children: React.ReactNode;
  id?: string;
};

export default function SectionContainer({
  children,
  id,
}: SectionContainerProps) {
  return (
    <section id={id} className="py-12">
      {children}
    </section>
  );
}
