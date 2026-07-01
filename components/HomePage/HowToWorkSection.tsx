import { IoDocumentTextOutline } from "react-icons/io5";
import StepCard from "./StepCard";
import { FaRecycle } from "react-icons/fa";
import { PiRecycleFill } from "react-icons/pi";
import { MdBalance } from "react-icons/md";
import { CiGift } from "react-icons/ci";
import TitleSection from "../TitleSection";

export default function HowToWorkSection() {
  return (
    <section id="howToWork">
      <div className="flex flex-col items-center text-center">
        {/* <h2 className="">Como funciona?</h2> */}
        <TitleSection
          className="text-3xl font-bold mb-2"
          title="Como funciona?"
        />

        <p>
          Em 4 passos simples vocẽ começa a acumular pontos e garantir seu
          desconto
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StepCard
          titleStep="Faça sua Adesão"
          descriptionStep="Cadastre-se vinculando seu à inscrição imobiliária do seu imóvel"
          step="1"
          Icon={IoDocumentTextOutline}
        />
        <StepCard
          titleStep="Separe os Materiais"
          descriptionStep="Separe papel, plástico, vidro e metal. A equipe passa na sua porta"
          step="2"
          Icon={PiRecycleFill}
        />
        <StepCard
          titleStep="Pesagem na Coleta"
          descriptionStep="Cada material é pesado e registrado, gerando pontos automaticamente"
          step="3"
          Icon={MdBalance}
        />
        <StepCard
          titleStep="Ganhe Desconto"
          descriptionStep="No fim do ciclo, seus pontos viram desconto no IPTU do próximo ano"
          step="4"
          Icon={CiGift}
        />
      </div>
    </section>
  );
}
