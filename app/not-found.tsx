import DefaultLink from "@/components/Link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex mb-4">
        <h1 className="text-7xl lg:text-8xl font-black text-green-800">4</h1>
        <h1 className="text-7xl lg:text-8xl font-black">0</h1>
        <h1 className="text-7xl lg:text-8xl font-black text-green-800">4</h1>
      </div>
      <p className="text-xl">Página não encontrada</p>
      <DefaultLink href="/">Voltar para página inicial</DefaultLink>
    </div>
  );
}
