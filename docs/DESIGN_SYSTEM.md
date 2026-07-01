# Design System — Módulo Morador (Coleta Premiada)

Este documento resume a paleta de cores, espaçamentos, tipografia, e os componentes visuais disponíveis para o desenvolvimento das telas do módulo Morador.

## 🎨 Paleta de Cores e Tokens

O tema visual é centrado em cores que refletem sustentabilidade e separação consciente de resíduos, com base no projeto exportado do Stitch.

### Cores Principais
- **Primary:** `--color-morador-primary` (`#003629`) - Um tom verde-escuro profundo usado para cabeçalhos primários, navegação principal e botões de destaque.
- **Primary Container:** `--color-morador-primary-container` (`#1b4d3e`) - Verde floresta médio para contêineres e barras de progresso.
- **Secondary:** `--color-morador-secondary` (`#006e1c`) - Verde vibrante usado para status badges positivos, ícones de reciclagem e destaques de ação.
- **Secondary Container:** `--color-morador-secondary-container` (`#91f78e`) - Verde claro de fundo para badges e contêineres de destaque secundários.
- **Tertiary:** `--color-morador-tertiary` (`#083716`) e Tertiary Container (`#224e2a`) - Tons de suporte ecológico.
- **Surface / Background:** `--color-morador-surface` (`#f7faf9`) - Cor de fundo principal clara e limpa.
- **Surface Container Lowest:** `--color-morador-surface-container-lowest` (`#ffffff`) - Fundo de cards brancos.
- **Outline:** `--color-morador-outline` (`#707974`) e Outline Variant (`#c0c9c3`) - Cores para bordas sutis e divisores de conteúdo.

### Paleta de Status (Badges)
Para consistência em todas as telas, os badges de status seguem a seguinte padronização de cor e semântica:
- 🟢 **Verde (Variante: `ativo`, `aceita`, `confirmado`):**
  - Fundo: `#E8F5E9`, Texto: `#2E7D32`
  - Uso: Coleta confirmada, imóvel ativo ou contestação aceita.
- 🔴 **Vermelho (Variante: `inativo`, `negada`):**
  - Fundo: `#FFEBEE`, Texto: `#C62828`
  - Uso: Imóvel inativo ou contestação negada.
- 🟡 **Amarelo (Variante: `pendente`, `analise`):**
  - Fundo: `#FFF3E0`, Texto: `#ED6C02`
  - Uso: Coleta pendente de validação ou contestação em análise.

---

## 📐 Espaçamentos e Radius
- **Gutter:** `16px` (`spacing-gutter`)
- **Container Padding:** `24px` (`spacing-container-padding`)
- **Base Unit:** `8px` (`spacing-base-unit`)
- **Card Gap:** `20px` (`spacing-card-gap`)
- **Section Margin:** `40px` (`spacing-section-margin`)
- **Roundness:** `ROUND_EIGHT` / `0.5rem` (`radius-morador-lg`) e `0.75rem` (`radius-morador-xl`) para cantos arredondados de cards/modais.

---

## 🧱 Componentes Compartilhados (`components/ui/`)

### 1. `Card` ([card.tsx](file:///C:/Users/fdant/workspace/coleta-premiada-frontend/components/ui/card.tsx))
- **Quando usar:** Organizar blocos de conteúdo e informações no dashboard e painéis.
- **Sub-componentes:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

### 2. `ProgressBar` ([progress-bar.tsx](file:///C:/Users/fdant/workspace/coleta-premiada-frontend/components/ui/progress-bar.tsx))
- **Quando usar:** Exibir progresso de descontos ou metas de pontos em relação ao teto.
- **Props chave:** `value` (número atual), `max` (teto da barra, padrão 100), `indicatorClassName` (para estilização opcional).

### 3. `StatusBadge` ([status-badge.tsx](file:///C:/Users/fdant/workspace/coleta-premiada-frontend/components/ui/status-badge.tsx))
- **Quando usar:** Exibir status de coletas, imóveis ou contestações.
- **Variantes disponíveis:** `default`, `ativo`, `confirmado`, `aceita`, `inativo`, `negada`, `pendente`, `analise`.

### 4. `Skeleton` ([skeleton.tsx](file:///C:/Users/fdant/workspace/coleta-premiada-frontend/components/ui/skeleton.tsx))
- **Quando usar:** Exibir animações de carregamento (loading placeholders) ao carregar dados de forma assíncrona com `<Suspense>`.

### 5. `Sheet` ([sheet.tsx](file:///C:/Users/fdant/workspace/coleta-premiada-frontend/components/ui/sheet.tsx))
- **Quando usar:** Painel lateral deslizante (gaveta) para exibição de detalhes adicionais e evidências de coletas ou contestações.
- **Sub-componentes:** `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose`.

### 6. `Dialog` ([dialog.tsx](file:///C:/Users/fdant/workspace/coleta-premiada-frontend/components/ui/dialog.tsx))
- **Quando usar:** Modais centralizados sobrepostos na tela para interações focadas (ex: formulário de nova contestação).
- **Sub-componentes:** `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`.
