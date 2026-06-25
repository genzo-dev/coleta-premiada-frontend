# Registro de Alterações — Coleta Premiada Frontend

## 1. Correções em arquivos existentes

### `package.json` — porta do servidor de desenvolvimento

**O que mudou:** A porta do `next dev` foi alterada de `3000` para `3001`.

**Por que:** O `docker-compose.yml` expõe a porta `3001:3001` do container para o host. O servidor de desenvolvimento rodava na porta `3000`, que não estava mapeada. Como o Next.js 16 usa Turbopack em modo dev, os módulos JavaScript são entregues via WebSocket (`ws://host:porta/_next/webpack-hmr`). A conexão WebSocket só funciona corretamente através do mapeamento de portas do Docker — acessar o container via IP direto da rede bridge (`172.19.x.x`) permite HTTP mas não o upgrade para WebSocket. O resultado era que nenhum componente client-side hidratava e nenhum evento de clique funcionava.

---

### `lib/auth/manage-login.ts` — flag `secure` nos cookies

**O que mudou:** `secure: true` foi substituído por `secure: process.env.NODE_ENV === "production"`.

**Por que:** Browsers recusam salvar cookies com `Secure` em conexões HTTP. Em desenvolvimento (Docker sem HTTPS), os cookies `accessToken` e `refreshToken` eram criados mas descartados imediatamente pelo browser, fazendo o login redirecionar de volta para `/login` indefinidamente.

---

### `app/page.tsx` — página raiz

**O que mudou:** O conteúdo padrão do Next.js foi substituído por lógica de redirecionamento por tipo de usuário.

**Por que:** A rota `/` não tinha destino definido. Ao acessar a aplicação após o login, o usuário ficava na página em branco do boilerplate. Agora a página lê o usuário autenticado e redireciona para a rota correspondente ao seu `perfil`.

```
/  →  gestor    →  /gestor
/  →  morador   →  /morador
/  →  supervisor →  /supervisor
/  →  sem sessão →  /login
```

---

### `app/(dashboard)/layout.tsx` — layout do dashboard

**O que mudou:** O layout deixou de renderizar `SidebarProvider`, `Sidebar` e `Header` diretamente e passou a usar o componente `DashboardShell`.

**Por que:** O layout é um Server Component (precisa de `async/await` para chamar `getCurrentUser()`). Antes, ele renderizava `SidebarProvider` (Client Component) e passava `Sidebar` e `Header` como filhos via RSC payload. No modelo RSC do Next.js, um Client Component não consegue receber outros Client Components como filhos via payload e manter o contexto React propagando corretamente — os event handlers e o `useContext` dos componentes filhos não se conectavam à instância do Provider. Mover tudo para um único Client Component resolveu isso.

---

### `components/Header/index.tsx` — diretiva `"use client"`

**O que mudou:** Adicionado `"use client"` no topo do arquivo.

**Por que:** O `Header` renderiza o `HamburgerButton`, que usa `useContext` do `SidebarContext`. Com `Header` sendo um Server Component, o `HamburgerButton` era incluído via RSC payload sem garantia de conexão ao Provider. Como Client Component, ele faz parte do bundle client-side e o contexto propaga normalmente.

---



### `components/Sidebar/SidebarFrame.tsx` — posição do backdrop

**O que mudou:** O backdrop (overlay escuro ao abrir o menu) foi alterado de `inset-0` para `top-16 inset-x-0 bottom-0`.

**Por que:** Com `inset-0` o backdrop cobria também o `Header` (altura `h-16`), dificultando clicar no botão de fechar. Com `top-16` o backdrop começa abaixo do header, mantendo o botão hambúrguer acessível.

---

## 2. O que foi implementado

### Páginas de dashboard por perfil

Criados três arquivos de página, um por tipo de usuário, dentro do grupo de rotas `(dashboard)`:

```
app/
└── (dashboard)/
    ├── (gestor)/gestor/page.tsx
    ├── (morador)/morador/page.tsx
    └── (supervisor)/supervisor/page.tsx
```

Cada página está dentro de um sub-grupo de rotas próprio (ex: `(gestor)`) para permitir futuramente layouts ou middlewares exclusivos por perfil sem afetar os demais.

---

### `components/DashboardShell.tsx` — shell client-side do dashboard

Componente Client Component criado para encapsular toda a estrutura interativa do dashboard em um único bundle client-side.

**Estrutura:**
```
DashboardShell ("use client")
└── SidebarProvider          ← cria o SidebarContext
    └── div (flex layout)
        ├── Sidebar          ← lê context (SidebarFrame)
        └── div (coluna principal)
            ├── Header       ← lê context (HamburgerButton)
            └── main
                └── {children}  ← conteúdo da página (Server Component)
```

---

## 3. Como funciona

### Autenticação e roteamento inicial

1. Usuário acessa qualquer rota protegida.
2. `DashboardLayout` chama `getCurrentUser()` no servidor.
3. Se não houver sessão válida → `redirect("/login")`.
4. Se houver sessão → renderiza `DashboardShell` com o usuário.
5. A rota raiz `/` lê o `perfil` do usuário e redireciona: `gestor → /gestor`, `morador → /morador`, `supervisor → /supervisor`.

### Sidebar mobile (toggle)

1. `DashboardShell` envolve tudo com `<SidebarProvider>`, que cria um estado `isOpen` via `useState(false)`.
2. O `Header` renderiza `HamburgerButton`, que chama `useSidebar()` para ler `isOpen` e chamar `toggle()`.
3. O `Sidebar` renderiza `SidebarFrame`, que também chama `useSidebar()` para ler `isOpen`.
4. `SidebarFrame` aplica `translate-x-0` (visível) ou `-translate-x-full` (fora da tela) no `<aside>` conforme `isOpen`.
5. O backdrop (div semitransparente) aparece com `opacity-100` quando aberto e `pointer-events-none opacity-0` quando fechado.
6. Clicar no backdrop ou no botão ✕ chama `close()` ou `toggle()`, fechando o menu.

Como `SidebarProvider`, `Sidebar` e `Header` são todos importados diretamente por `DashboardShell` (um único Client Component), o `SidebarContext` é compartilhado corretamente entre todos eles.

### Por que o WebSocket importava

O Next.js 16 usa Turbopack por padrão em desenvolvimento. O Turbopack entrega os módulos JavaScript do lado cliente via WebSocket, não apenas via tags `<script>`. Se a conexão WebSocket falha, os chunks de Client Components nunca chegam ao browser — a página renderiza o HTML do SSR mas nenhum evento, estado ou `useEffect` funciona. Alinhar a porta do `next dev` com o mapeamento do `docker-compose` resolve o problema.
