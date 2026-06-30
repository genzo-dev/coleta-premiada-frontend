import { IconType } from "react-icons";
import { IoDocumentTextOutline } from "react-icons/io5";

type StepCardProps = {
  titleStep: string;
  descriptionStep: string;
  step: string;
  Icon: IconType;
};

export default function StepCard({
  titleStep,
  descriptionStep,
  step,
  Icon,
}: StepCardProps) {
  return (
    <div className="flex flex-col gap-2 border border-gray-200 rounded-lg shadow-lg p-4 hover:scale-105 transition">
      <div className="bg-gray-200 rounded-lg p-2 inline-flex self-start">
        <Icon size={24} color="#0d542b" />
      </div>
      <label className="text-sm text-gray-500">Passo {step}</label>

      <h3 className="text-lg font-semibold">{titleStep}</h3>
      <p>{descriptionStep}</p>
    </div>
  );
}
// Cadastre-se vinculando seu à inscrição imobiliária do seu imóvel
