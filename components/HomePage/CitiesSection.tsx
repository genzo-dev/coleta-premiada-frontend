import { getCidades } from "@/lib/cidades/get-cidades";
import { cities } from "@/mocks/cities";
import TitleSection from "../TitleSection";
import SectionContainer from "./SectionContainer";

export default async function CitiesSection() {
  const cidades = cities;

  return (
    <SectionContainer id="cities">
      <div>
        <TitleSection
          className="text-3xl font-bold mb-2"
          title="Cidades Atendidas"
        />
        <p>
          Confira as cidades onde o programa Coleta Premiada está disponível.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div className="flex-1 flex flex-col justify-center px-4 md:px-8 py-6 border border-gray-200 rounded-xl bg-white shadow-sm">
          <h3 className="font-semibold text-lg md:text-xl text-gray-800 mb-3">
            Onde o programa chega?
          </h3>
          <div className="bg-green-500 h-1 w-12 rounded-full mb-4" />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            O Coleta Premiada conecta cidades inteiras a um futuro mais
            sustentável. Cada município atendido conta com pontos de coleta
            estratégicos, agentes ambientais capacitados e um sistema de
            bonificação que transforma resíduos recicláveis em pontos trocáveis
            por benefícios reais.
          </p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-3">
            Expandimos nossa atuação de forma contínua para levar educação
            ambiental e economia circular a cada vez mais regiões.
          </p>
        </div>

        <div className="flex-1 max-h-[320px] overflow-y-auto pr-2">
          {cidades && cidades.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {cidades.map((cidade) => (
                <li
                  key={cidade.nome}
                  className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg bg-white shadow-sm"
                >
                  <span className="flex-shrink-0 w-3 h-3 rounded-full bg-green-500" />
                  <span className="font-medium text-gray-800">
                    {cidade.nome}
                  </span>
                  <span className="text-sm text-gray-400">{cidade.uf}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              Nenhuma cidade disponível no momento.
            </p>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
