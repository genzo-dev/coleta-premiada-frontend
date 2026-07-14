# Correções na Navbar — 14/07/2026

## Problema

A sidebar exibia abas que não funcionavam para determinados perfis: ou redirecionavam o
usuário para `/` (home) por falta de permissão, ou apontavam para URLs inexistentes (404).

## Arquivos modificados

### 1. `components/Sidebar/index.tsx`

Abas removidas por perfil na função `getNavItems`:

| Perfil | Aba removida | Motivo |
|---|---|---|
| Morador | Benefícios (`/beneficios`) | Página no grupo `(supervisor)` — redirecionava para `/` |
| Morador | Contestações (`/contestacoes`) | Página no grupo `(gestor)` — redirecionava para `/` |
| Supervisor | Contestações (`/analise-contestacoes`) | URL inexistente (404) |
| Supervisor | Constante de Pontuação (`/constante-pontuacao`) | Página no grupo `(gestor)` — redirecionava para `/` |
| Supervisor | Benefícios (`/saldos-pontos`) | URL inexistente (404) |
| Gestor | Benefícios (`/saldos-pontos`) | URL inexistente (404) |
| Gerente Geral | Benefícios (`/saldos-pontos`) | URL inexistente (404) |

URLs corrigidas:

| Perfil | Aba | Antes | Depois |
|---|---|---|---|
| Gestor | Contestações | `/analise-contestacoes` | `/contestacoes` |
| Gerente Geral | Contestações | `/analise-contestacoes` | `/contestacoes` |

Import removido: `MdCardGiftcard` (não utilizado por nenhum perfil após as alterações).

### 2. `actions/dispute/analyze-dispute-action.ts`

Redirecionamento após análise de contestação corrigido:
- `/analise-contestacoes` → `/contestacoes`

### 3. `app/(dashboard)/imoveis/page.tsx`

Verificação de permissão da página de imóveis não incluía `gerente_geral`, fazendo com que
o gerente geral fosse redirecionado para `/` apesar de ter a aba na sidebar. Adicionado
`gerente_geral` à condição de acesso.

## Navbar final por perfil

| Perfil | Abas |
|---|---|
| **Morador** | Dashboard, Meu Imóvel, Coletas, Perfil |
| **Supervisor** | Imóveis, Coletas, Perfil |
| **Gestor** | Dashboard, Usuários, Imóveis, Programas, Coletas, Constante de Pontuação, Contestações, Consolidação, Relatórios, Auditoria, Perfil |
| **Gerente Geral** | Dashboard, Usuários, Cidades, Imóveis, Programas, Coletas, Contestações, Relatórios, Auditoria, Perfil |
