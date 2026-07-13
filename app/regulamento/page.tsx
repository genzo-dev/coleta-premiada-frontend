import Navbar from "@/components/HomePage/Navbar";

export default function RegulamentoPage() {
  return (
    <>
      <Navbar />
      <div className="flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Regulamento <span className="text-green-600">—</span> Coleta
            Premiada
          </h1>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              1. O que é o Coleta Premiada
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              O Coleta Premiada é um programa de incentivo à coleta seletiva e
              reciclagem que transforma o ato de reciclar em benefícios reais
              para o cidadão. Ao separar e destinar corretamente os materiais
              recicláveis, os moradores acumulam pontos que podem ser convertidos
              em desconto no IPTU.
            </p>
            <p className="text-gray-600 leading-relaxed">
              O programa é operado em parceria com a prefeitura de cada cidade
              participante, com gestão e supervisão dedicadas para garantir
              transparência e eficiência.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              2. Quem Pode Participar
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Podem aderir ao Coleta Premiada:
            </p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1 mb-3">
              <li>
                Moradores (pessoas físicas) proprietários ou locatários de
                imóveis residenciais localizados em cidades participantes do
                programa.
              </li>
              <li>
                Cada imóvel pode ter um titular (responsável principal) e
                moradores adicionais vinculados à mesma unidade.
              </li>
              <li>
                É necessário ter CPF e e-mail válidos para realizar o cadastro.
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              <strong>Não podem participar:</strong> imóveis comerciais, imóveis
              com IPTU em situação de inadimplência com o município (a critério
              de cada programa), e pessoas jurídicas.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              3. Como Funciona
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              O programa segue um ciclo simples e transparente:
            </p>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              3.1. Adesão
            </h3>
            <ol className="list-decimal pl-6 text-gray-600 leading-relaxed space-y-1 mb-4">
              <li>
                O morador realiza o cadastro na plataforma informando nome,
                e-mail e CPF.
              </li>
              <li>
                Após confirmar o e-mail, o morador vincula seu imóvel ao
                programa, informando os dados do imóvel (inscrição imobiliária,
                endereço, CEP, etc.).
              </li>
              <li>
                O imóvel é georreferenciado automaticamente e passa a integrar a
                rota de coleta seletiva do município.
              </li>
            </ol>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              3.2. Coleta
            </h3>
            <ol className="list-decimal pl-6 text-gray-600 leading-relaxed space-y-1 mb-4">
              <li>
                Os materiais recicláveis (papel, plástico, vidro, metal) são
                separados pelo morador e disponibilizados para coleta.
              </li>
              <li>
                Um agente de coleta credenciado passa no imóvel, registra a
                pesagem dos materiais e fotografa como evidência.
              </li>
              <li>
                O peso é registrado no sistema e convertido em pontos com base
                na Constante de Pontuação vigente (pontos por kg).
              </li>
            </ol>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              3.3. Pontuação
            </h3>
            <p className="text-gray-600 leading-relaxed mb-2">
              A cada coleta, o morador recebe pontos calculados da seguinte
              forma:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-3 font-mono text-sm text-gray-700">
              Pontos = Peso (kg) × Constante de Pontuação (pontos/kg)
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              A Constante de Pontuação é definida pela administração do programa
              e pode ser ajustada periodicamente. Consulte o valor vigente no
              momento da sua adesão.
            </p>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              3.4. Conversão em Benefício
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Os pontos acumulados ao longo de um ciclo (mensal, semestral ou
              anual, conforme definido por cada programa) são convertidos em
              desconto percentual no IPTU:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-3 font-mono text-sm text-gray-700">
              Desconto (%) = Pontos acumulados / Pontos por real
            </div>
            <p className="text-gray-600 leading-relaxed mb-2">
              <strong>Regras importantes:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1 mb-4">
              <li>
                É necessário atingir a pontuação mínima definida pelo programa
                para ter direito ao desconto.
              </li>
              <li>
                O desconto máximo é de 40% do valor do IPTU, podendo haver
                limite inferior definido por programa.
              </li>
              <li>
                Caso o programa permita acúmulo entre ciclos, os pontos não
                utilizados podem ser transferidos para o ciclo seguinte.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              4. Ciclos e Consolidação
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Os programas do Coleta Premiada operam em ciclos que podem ser:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-4 py-2 font-semibold">Tipo</th>
                    <th className="text-left px-4 py-2 font-semibold">
                      Descrição
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { tipo: "Mensal", desc: "A cada mês" },
                    { tipo: "Semestral", desc: "A cada 6 meses" },
                    { tipo: "Anual", desc: "A cada 12 meses" },
                    {
                      tipo: "Personalizado",
                      desc: "Conforme definido pelo programa municipal",
                    },
                  ].map((row) => (
                    <tr
                      key={row.tipo}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 font-medium">{row.tipo}</td>
                      <td className="px-4 py-2">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed mb-2">
              Ao final de cada ciclo, o sistema realiza a consolidação:
            </p>
            <ol className="list-decimal pl-6 text-gray-600 leading-relaxed space-y-1 mb-4">
              <li>
                Todos os pontos acumulados pelos moradores no período são
                contabilizados.
              </li>
              <li>
                Imóveis que não atingiram a pontuação mínima exigida não geram
                desconto naquele ciclo.
              </li>
              <li>
                O desconto é calculado e aplicado ao IPTU do imóvel.
              </li>
              <li>
                O resultado fica disponível para consulta no portal do morador.
              </li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              5. Dos Benefícios
            </h2>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              5.1. Desconto no IPTU
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              O benefício principal do programa é o desconto progressivo no
              IPTU. Quanto mais você recicla, maior o desconto.
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-4 py-2 font-semibold">
                      Material Reciclável
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {["Papel", "Plástico", "Vidro", "Metal"].map((mat) => (
                    <tr
                      key={mat}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{mat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              5.2. Acúmulo entre Ciclos
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Cada programa define se os pontos não utilizados em um ciclo podem
              ser acumulados para o ciclo seguinte. Consulte as regras do seu
              programa específico para saber se o acúmulo é permitido.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              6. Das Obrigações do Morador
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Ao aderir ao Coleta Premiada, o morador se compromete a:
            </p>
            <ol className="list-decimal pl-6 text-gray-600 leading-relaxed space-y-1 mb-4">
              <li>
                Separar corretamente os materiais recicláveis (papel, plástico,
                vidro e metal) dos resíduos orgânicos e rejeitos.
              </li>
              <li>
                Disponibilizar os materiais para coleta no dia e horário
                agendados pelo programa.
              </li>
              <li>
                Manter seus dados cadastrais atualizados (endereço, número de
                moradores, contato).
              </li>
              <li>
                Não fraudar o sistema — qualquer tentativa de burlar a pesagem
                ou registrar materiais não recicláveis resultará em advertência
                ou desligamento do programa.
              </li>
              <li>
                Comunicar alterações no imóvel (mudança de titular, alteração no
                número de moradores, etc.).
              </li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              7. Das Contestações
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Caso o morador discorde do peso registrado em uma coleta, ele pode
              abrir uma contestação:
            </p>
            <ol className="list-decimal pl-6 text-gray-600 leading-relaxed space-y-1 mb-3">
              <li>
                Acesse o portal do morador e localize a coleta desejada no
                histórico.
              </li>
              <li>
                Clique em &ldquo;Contestar&rdquo; e informe o motivo da
                divergência (mínimo de 10 caracteres).
              </li>
              <li>
                A solicitação será analisada pela equipe de gestão do programa.
              </li>
              <li>
                O morador receberá uma resposta com o parecer: aceita (correção
                do peso) ou negada (manutenção do registro original).
              </li>
            </ol>
            <p className="text-gray-600 leading-relaxed">
              <strong>Prazo:</strong> O morador pode contestar uma coleta em até
              30 dias corridos após a data do registro.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              8. Dos Deveres da Administração
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              A administração do Coleta Premiada se compromete a:
            </p>
            <ol className="list-decimal pl-6 text-gray-600 leading-relaxed space-y-1 mb-4">
              <li>
                Garantir a transparência dos cálculos de pontuação e conversão
                em benefícios.
              </li>
              <li>
                Manter a constante de pontuação atualizada e disponível para
                consulta.
              </li>
              <li>
                Processar as consolidações ao final de cada ciclo, convertendo
                pontos em descontos conforme as regras vigentes.
              </li>
              <li>
                Analisar as contestações abertas por moradores em prazo
                razoável.
              </li>
              <li>
                Proteger os dados pessoais dos participantes, em conformidade
                com a Lei Geral de Proteção de Dados (LGPD).
              </li>
              <li>
                Manter trilha de auditoria de todas as operações sensíveis
                realizadas no sistema.
              </li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              9. Das Penalidades
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              O morador que descumprir as regras do programa está sujeito a:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-4 py-2 font-semibold">
                      Infração
                    </th>
                    <th className="text-left px-4 py-2 font-semibold">
                      Penalidade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      infracao:
                        "Descumprimento reiterado das regras de separação de resíduos",
                      penalidade: "Advertência",
                    },
                    {
                      infracao: "Tentativa de fraude na pesagem",
                      penalidade: "Suspensão",
                    },
                    {
                      infracao: "Reincidência em fraude",
                      penalidade: "Desligamento",
                    },
                    {
                      infracao: "Fornecimento de dados cadastrais falsos",
                      penalidade: "Desligamento",
                    },
                  ].map((row) => (
                    <tr
                      key={row.infracao}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{row.infracao}</td>
                      <td className="px-4 py-2 font-medium">{row.penalidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              10. Disposições Gerais
            </h2>
            <ol className="list-decimal pl-6 text-gray-600 leading-relaxed space-y-1 mb-4">
              <li>
                O programa é operado em cidades participantes, cada uma com seu
                próprio programa e regras específicas.
              </li>
              <li>
                A Constante de Pontuação (pontos por kg) é definida pela
                administração e pode ser alterada mediante comunicação prévia
                aos participantes.
              </li>
              <li>
                O desconto máximo de 40% no IPTU é um limite global do sistema,
                podendo cada programa definir um limite inferior.
              </li>
              <li>
                Os dados dos participantes são tratados em conformidade com a Lei
                Geral de Proteção de Dados (LGPD) — Lei nº 13.709/2018.
              </li>
              <li>
                Caso o imóvel seja vendido ou o morador mude de endereço, é
                responsabilidade do participante comunicar a alteração para que
                os pontos sejam corretamente vinculados ao novo imóvel.
              </li>
              <li>
                A administração do programa reserva-se o direito de modificar as
                regras mediante comunicação prévia aos participantes.
              </li>
              <li>
                Dúvidas, sugestões ou reclamações podem ser encaminhadas através
                do Fale Conosco disponível no portal ou diretamente com a
                administração do programa na sua cidade.
              </li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              11. Disposições Finais
            </h2>
            <ol className="list-decimal pl-6 text-gray-600 leading-relaxed space-y-1">
              <li>
                O presente regulamento entra em vigor na data da adesão do
                morador ao programa.
              </li>
              <li>
                Casos omissos serão resolvidos pela administração municipal
                responsável pelo programa.
              </li>
              <li>
                A adesão ao programa implica a aceitação integral deste
                regulamento.
              </li>
              <li>
                Este regulamento pode ser alterado a qualquer momento, mediante
                comunicação prévia aos participantes pelos canais oficiais do
                programa.
              </li>
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}
