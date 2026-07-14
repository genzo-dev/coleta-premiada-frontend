import Footer from "@/components/Footer";
import Navbar from "@/components/HomePage/Navbar";
import Link from "next/link";

export default function TermosDeUsoPage() {
  return (
    <>
      <Navbar />
      <div className="flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Termos de Uso <span className="text-green-600">—</span> Coleta
            Premiada
          </h1>

          <p className="text-gray-500 text-sm mb-10">
            Última atualização: Julho de 2026
          </p>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              1. Aceitação dos Termos
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Bem-vindo ao Coleta Premiada. Estes Termos de Uso estabelecem as
              regras para utilização da nossa plataforma, site e serviços.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              Ao criar uma conta, acessar ou usar qualquer funcionalidade do
              Coleta Premiada, você concorda com estes termos. Se você não
              concordar com algum deles, não utilize a plataforma.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Estes Termos de Uso complementam o{" "}
              <Link
                href="/regulamento"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Regulamento
              </Link>{" "}
              e a{" "}
              <Link
                href="/politica-de-privacidade"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de Privacidade
              </Link>{" "}
              do programa. Recomendamos a leitura dos três documentos para
              entender completamente seus direitos e deveres.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              2. Do serviço
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              O Coleta Premiada é uma plataforma digital que conecta moradores,
              coletores e prefeituras para incentivar a coleta seletiva de
              resíduos recicláveis. Através da plataforma, os moradores podem:
            </p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1 mb-3">
              <li>Cadastrar seus imóveis para participar do programa</li>
              <li>Acompanhar o histórico de coletas e a pontuação acumulada</li>
              <li>Visualizar o desconto gerado no IPTU</li>
              <li>Abrir contestações sobre coletas registradas</li>
              <li>Gerenciar seus dados cadastrais</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              As regras detalhadas de funcionamento do programa (como pontuação,
              ciclos, conversão em benefícios e contestações) estão descritas no
              <Link
                href="/regulamento"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Regulamento
              </Link>{" "}
              do Coleta Premiada.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              3. Do cadastro e da conta
            </h2>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              3.1. Quem pode se cadastrar
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Podem criar uma conta no Coleta Premiada pessoas físicas, maiores
              de 18 anos, com CPF e e-mail válidos, que sejam proprietárias ou
              locatárias de imóveis residenciais em cidades participantes do
              programa.
            </p>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              3.2. Responsabilidade pela conta
            </h3>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1 mb-4">
              <li>
                Você é o único responsável por manter sua senha em sigilo e
                seguro.
              </li>
              <li>
                Não compartilhe sua senha com terceiros. A plataforma nunca
                solicitará sua senha por e-mail, telefone ou mensagem.
              </li>
              <li>
                Todas as atividades realizadas na sua conta são de sua
                responsabilidade.
              </li>
              <li>
                Caso suspeite que sua conta foi acessada por terceiros, altere
                sua senha imediatamente e nos avise.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              3.3. Veracidade das informações
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Você se compromete a fornecer informações verdadeiras, precisas e
              atualizadas durante o cadastro e uso da plataforma. O fornecimento
              de dados falsos pode resultar na suspensão ou exclusão da sua
              conta, além das penalidades previstas em lei.
            </p>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              3.4. Conta única
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Cada pessoa deve possuir apenas uma conta no Coleta Premiada.
              Contas duplicadas podem ser unificadas ou canceladas pela
              administração.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              4. Da conduta do usuário
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Ao utilizar a plataforma, você concorda em:
            </p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1 mb-3">
              <li>
                Utilizar o sistema apenas para os fins legítimos do programa
              </li>
              <li>
                Não tentar burlar, fraudar ou manipular o registro de coletas, a
                pesagem de materiais ou a pontuação
              </li>
              <li>
                Não criar mecanismos automatizados (robôs, scripts, crawlers)
                para acessar ou extrair dados da plataforma
              </li>
              <li>
                Não tentar acessar áreas restritas do sistema sem autorização
              </li>
              <li>
                Não interferir no funcionamento da plataforma ou sobrecarregar
                intencionalmente sua infraestrutura
              </li>
              <li>
                Não utilizar a plataforma para enviar conteúdo ilegal, ofensivo,
                discriminatório ou que viole direitos de terceiros
              </li>
              <li>
                Não utilizar a plataforma para qualquer atividade que viole a
                legislação brasileira
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              O descumprimento destas regras poderá resultar em advertência,
              suspensão temporária ou cancelamento definitivo da sua conta, sem
              prejuízo das sanções legais cabíveis.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              5. Da propriedade intelectual
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Todo o conteúdo da plataforma Coleta Premiada — incluindo
              logotipos, marcas, textos, imagens, ilustrações, design, layout,
              código-fonte, banco de dados e funcionalidades — é de propriedade
              exclusiva do programa e de seus licenciadores, protegido pelas
              leis brasileiras de propriedade intelectual.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              Ao utilizar a plataforma, você não adquire nenhum direito sobre
              esses conteúdos. É proibido:
            </p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1 mb-3">
              <li>
                Reproduzir, copiar, distribuir ou modificar qualquer conteúdo
                sem autorização prévia por escrito
              </li>
              <li>
                Utilizar marcas ou logotipos do Coleta Premiada para qualquer
                finalidade sem autorização
              </li>
              <li>
                Fazer engenharia reversa, descompilar ou extrair o código-fonte
                da plataforma
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              <strong>Exceção:</strong> Os relatórios e dados gerados
              especificamente para o seu uso (como seu histórico de coletas e
              pontuação) pertencem a você e podem ser utilizados livremente.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              6. Da limitação de responsabilidade
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              A plataforma Coleta Premiada é fornecida “no estado em que se
              encontra” (“as is”), dentro do que é tecnicamente razoável para um
              serviço digital.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              A administração do programa não se responsabiliza por:
            </p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1 mb-3">
              <li>
                Danos causados por caso fortuito, força maior ou eventos fora do
                seu controle (como desastres naturais, greves, falhas de
                internet ou energia)
              </li>
              <li>
                Danos decorrentes de condutas de terceiros, incluindo outros
                usuários, agentes de coleta ou prestadores de serviço
              </li>
              <li>
                Danos resultantes do uso indevido da plataforma por você ou por
                terceiros que acessem sua conta
              </li>
              <li>
                Perdas indiretas, como lucro cessante ou oportunidades de
                negócio
              </li>
              <li>
                Conteúdo de sites externos que possam ser acessados através de
                links na plataforma
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-3">
              A responsabilidade da administração, em qualquer caso, está
              limitada ao valor efetivamente comprovado do dano direto causado,
              não ultrapassando o valor do benefício gerado ao usuário no ciclo
              vigente.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Esta limitação não se aplica nos casos em que a lei vedar
              expressamente sua aplicação.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              7. Da suspensão e cancelamento
            </h2>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              7.1. Cancelamento por você
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Você pode cancelar sua conta a qualquer momento através das
              configurações do portal ou solicitando pelo e-mail de contato. O
              cancelamento desativa seu acesso à plataforma, mas os dados das
              coletas já realizadas são preservados conforme nossa{" "}
              <Link
                href="/politica-de-privacidade"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de Privacidade
              </Link>
              .
            </p>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              7.2. Suspensão ou cancelamento pela administração
            </h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Sua conta poderá ser suspensa temporária ou permanentemente nos
              seguintes casos:
            </p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1 mb-4">
              <li>
                Violação destes Termos de Uso ou do{" "}
                <Link
                  href="/regulamento"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Regulamento
                </Link>{" "}
                do programa
              </li>
              <li>Tentativa de fraude ou manipulação do sistema</li>
              <li>Fornecimento de dados cadastrais falsos</li>
              <li>
                Conduta que prejudique o funcionamento da plataforma ou a
                experiência de outros usuários
              </li>
              <li>Descumprimento reiterado das regras do programa</li>
              <li>Determinação judicial ou legal</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              7.3. Consequências do cancelamento
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Em caso de cancelamento da conta, você perderá o acesso aos
              recursos da plataforma. Os pontos não consolidados em ciclos já
              encerrados serão preservados conforme as regras do programa.
              Pontos acumulados em ciclo em andamento poderão ser perdidos, a
              critério da administração.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              8. Das comunicações eletrônicas
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Ao criar sua conta no Coleta Premiada, você autoriza o recebimento
              de comunicações eletrônicas relacionadas ao programa, incluindo:
            </p>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed space-y-1 mb-3">
              <li>
                E-mails de confirmação de cadastro e de alterações na conta
              </li>
              <li>Notificações sobre coletas registradas e pontuação</li>
              <li>Avisos sobre ciclos, consolidações e benefícios gerados</li>
              <li>
                Comunicados sobre alterações no{" "}
                <Link
                  href="/regulamento"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Regulamento
                </Link>
                , na{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de Privacidade
                </Link>{" "}
                ou nestes Termos de Uso
              </li>
              <li>
                Mensagens administrativas importantes sobre o funcionamento do
                programa
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Você pode, a qualquer momento, solicitar a exclusão do seu e-mail
              da lista de comunicações não essenciais, bastando entrar em
              contato conosco. E-mails essenciais para o funcionamento da conta
              (como confirmação de cadastro e avisos de segurança) continuarão
              sendo enviados.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              9. Das disposições gerais
            </h2>
            <ol className="list-decimal pl-6 text-gray-600 leading-relaxed space-y-2 mb-4">
              <li>
                Estes Termos de Uso complementam o{" "}
                <Link
                  href="/regulamento"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Regulamento
                </Link>{" "}
                e a{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de Privacidade
                </Link>{" "}
                do Coleta Premiada. Em caso de conflito, o Regulamento prevalece
                para questões operacionais do programa, e estes Termos para
                questões contratuais e de uso da plataforma.
              </li>
              <li>
                <strong>Lei aplicável:</strong> Estes Termos são regidos pela
                legislação brasileira, em especial o Código Civil (Lei nº
                10.406/2002), o Marco Civil da Internet (Lei nº 12.965/2014) e a
                Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
              </li>
              <li>
                <strong>Foro:</strong> Para questões judiciais não resolvidas
                administrativamente, fica eleito o foro da comarca do município
                onde o programa está implantado.
              </li>
              <li>
                <strong>Alterações destes Termos:</strong> Podemos alterar estes
                Termos de Uso a qualquer momento. Em caso de mudanças
                significativas, você será notificado por e-mail ou através de
                aviso na plataforma. O uso continuado da plataforma após a
                alteração significa que você concorda com os novos termos.
              </li>
              <li>
                <strong>Nulidade parcial:</strong> Se qualquer cláusula destes
                Termos for considerada inválida ou inexigível por autoridade
                competente, as demais cláusulas permanecem em pleno vigor.
              </li>
              <li>
                <strong>Renúncia:</strong> O fato de não exigirmos o cumprimento
                estrito de alguma cláusula não constitui renúncia ao direito de
                exigi-la posteriormente.
              </li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              10. Disposições finais
            </h2>
            <ol className="list-decimal pl-6 text-gray-600 leading-relaxed space-y-2 mb-4">
              <li>
                Estes Termos de Uso entram em vigor na data da sua adesão ao
                programa.
              </li>
              <li>
                A utilização da plataforma implica a aceitação integral destes
                Termos.
              </li>
              <li>
                Dúvidas, sugestões ou reclamações podem ser encaminhadas através
                do{" "}
                <Link
                  href="mailto:contato@coletapremiada.gov.br"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  coletapremiada@gmail.com.br
                </Link>{" "}
                ou diretamente com a administração do programa na sua cidade.
              </li>
            </ol>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
