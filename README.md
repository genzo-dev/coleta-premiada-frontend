# Coleta Premiada - Frontend (Next.js)

## 📌 Propósito e Papel na Arquitetura
O repositório **Frontend** é a interface web responsável por entregar a experiência visual da plataforma "Coleta Premiada". 
Ele consome as APIs do Core (Django) e atende simultaneamente aos cidadãos (moradores que acompanham seus pontos, metas e contestações), e também aos gestores/supervisores que dependem de Dashboards e páginas robustos de análise gráfica e de rankings para acompanhar o engajamento da população. Na arquitetura, atua como o cliente consumindo via HTTP as regras do Core.

## 🛠️ Stack Tecnológica
- **Framework Principal:** Next.js 16 (App Router)
- **Biblioteca UI:** React 18/19
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Visualização de Dados (Gráficos):** Recharts
- **Gerenciador de Pacotes:** npm / pnpm
- **Infraestrutura:** Docker

## 📋 Pré-requisitos
- [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados
- [Git](https://git-scm.com/)

## 🚀 Instalação e Execução Local com Docker

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/genzo-dev/coleta-premiada-frontend.git
   cd coleta-premiada-frontend
   ```

2. **Configure as Variáveis de Ambiente:**
   Copie o arquivo de template `.env.example` para criar suas configurações locais:
   ```bash
   cp .env.example .env.local
   ```

3. **Suba o container do Frontend:**
   Se estiver usando uma orquestração geral na máquina, certifique-se de que a rede do Docker alcançará o backend.
   ```bash
   docker compose up -d
   ```

4. **Acesso:**
   A aplicação subirá localmente. Abra [http://localhost:3001] no seu navegador para ver o resultado. As atualizações nos arquivos (Fast Refresh) funcionam automaticamente.

## ⚙️ Variáveis de Ambiente
O Frontend necessita de variáveis cruciais (como a URL base da API do Core para o Server-Side Rendering e o cache de rotas). Consulte `.env.example` para ver quais variáveis injetar no container ou em seu arquivo `.env.local` na raiz.

## 🧪 Como rodar os testes
#TODO
Se o projeto tiver suítes de teste (Jest / React Testing Library), você pode rodá-los acessando o container:
```bash
docker compose exec frontend npm run test
```

## 📚 Documentação Adicional
Consulte nossa Wiki para ver detalhes do fluxo de UI/UX, decisões arquiteturais do Next.js e guias para componentização:
👉 [Wiki do Projeto Coleta Premiada](https://github.com/rangelro/Coleta-Premiada/wiki)
