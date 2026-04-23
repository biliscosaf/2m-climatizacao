# ARQUITETURA — Soluções 2M Climatização

**Versão:** 1.0  
**Data:** 2026-04-23  
**Responsável:** solution-architect  
**Status:** Aprovado — scaffolding criado

---

## 1. Decisões Estratégicas de Stack

### 1.1 Por Que Next.js 14 (App Router)?

O projeto é uma landing page de captura de leads com quiz interativo que deve atingir Lighthouse >= 90 em todos os quadrantes. Next.js 14 com App Router é a escolha natural porque:

- **Server Components por padrão:** Seções estáticas (Hero, Serviços, Depoimentos, FAQ) são renderizadas no servidor, chegando ao browser como HTML puro — sem JS desnecessário no bundle inicial, LCP abaixo de 2.5s mesmo em 4G.
- **Deploy Vercel nativo:** Zero configuração adicional para staging/produção, CI/CD automático em push para `main`, SSL provisionado automaticamente.
- **App Router + `generateMetadata()`:** Meta tags dinâmicas para SEO sem bibliotecas extras. Sitemap e robots.txt gerados como Route Handlers.
- **Image Optimization embutida:** `next/image` entrega WebP/AVIF com lazy load e tamanho adequado por breakpoint — crítico para performance em dispositivos Android de entrada.
- **Font Optimization:** `next/font` faz subset automático e `font-display: swap` sem round-trip adicional.
- **TypeScript first-class:** Tipos gerados automaticamente para rotas, params e searchParams.

WordPress foi descartado porque: (a) o cliente não precisa editar conteúdo frequentemente — os textos são relativamente estáticos; (b) o quiz requer lógica de state machine e integração server-side com banco, Facebook Conversions API e Resend; (c) a meta de Lighthouse >= 90 é difícil de atingir com WordPress padrão.

### 1.2 TypeScript Strict Mode

`strict: true` ativado com todas as flags adicionais (`noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch`). Nenhum `any` explícito permitido (ESLint `@typescript-eslint/no-explicit-any: error`). Isso garante que erros de tipo sejam capturados em tempo de compilação, não em produção.

### 1.3 Tailwind CSS + shadcn/ui

- **Tailwind:** CSS utility-first com PurgeCSS automático pelo Next.js. Bundle CSS final pequeno (< 10KB gzip após purge). Mobile-first com breakpoints customizados (xs: 360px, md: 768px, 2xl: 1440px) conforme briefing.
- **shadcn/ui:** Componentes Radix UI com estilização Tailwind. Acessíveis por padrão (WCAG AA), sem overhead de library — código é copiado para o projeto. Accordion (FAQ), Dialog (quiz modal se necessário), Progress (barra do quiz).
- **Framer Motion:** Animações do quiz (transições entre etapas, fade in do resultado). Import seletivo para não inflar o bundle.

### 1.4 Prisma ORM

- **Type-safety total:** Schema define os modelos; Prisma gera tipos TypeScript automaticamente. Nenhuma query sem tipo.
- **Migrations automáticas:** `prisma migrate dev` em desenvolvimento; `prisma migrate deploy` no CI/CD do Vercel.
- **Índices planejados:** `createdAt`, `convertido`, `bairro`, `problema` — campos mais consultados para relatórios e analytics.
- **Singleton pattern:** `lib/db.ts` evita múltiplas conexões durante hot reload em desenvolvimento.

### 1.5 SQLite em Dev, Postgres em Prod

| Aspecto | Desenvolvimento | Produção |
|---------|----------------|---------|
| Provider | `sqlite` | `postgresql` |
| URL | `file:./dev.db` | `DATABASE_URL` do Vercel Postgres |
| Configuração | Zero — arquivo local | devops-engineer configura no Vercel Dashboard |
| Migrations | `npx prisma db push` (rápido, sem migration files) | `npx prisma migrate deploy` (migration files commitados) |

Para migrar para Postgres em produção: trocar `provider` no `schema.prisma` de `"sqlite"` para `"postgresql"` e configurar `DATABASE_URL` no Vercel.

**Nota sobre o campo `respostas` em `QuizProgress`:** SQLite não suporta o tipo `Json` nativo do Prisma — por isso o campo é `String` e armazena JSON serializado. Em Postgres, o devops-engineer ou backend-developer pode migrar para `Json` (Prisma suporta nativamente em Postgres).

---

## 2. Estrutura de Pastas

```
C:\Users\Maria\                          # Raiz do projeto
├── app/                                  # Next.js App Router
│   ├── globals.css                      # Estilos globais + variáveis CSS
│   ├── layout.tsx                       # Root layout: HTML, meta tags base, fontes
│   ├── page.tsx                         # Home — Server Component com seções scaffold
│   ├── politica-de-privacidade/
│   │   └── page.tsx                     # Rota /politica-de-privacidade (LGPD)
│   ├── termos-de-uso/
│   │   └── page.tsx                     # Rota /termos-de-uso
│   └── api/
│       ├── lead/
│       │   └── route.ts                 # POST /api/lead — salva lead (scaffold)
│       ├── quiz/
│       │   └── progress/
│       │       └── route.ts             # POST /api/quiz/progress — rastreia abandono (scaffold)
│       └── business-hours/
│           └── route.ts                 # GET /api/business-hours — horário comercial (implementado)
│
├── components/                          # Componentes React (a implementar pelo frontend-developer)
│   ├── layout/                          # Header, Footer, MainLayout
│   ├── quiz/                            # Quiz, QuizQuestion, QuizResult, ProgressBar
│   ├── sections/                        # Hero, Services, BeforeAfter, Testimonials, About, CoverageMap, FAQ, Cta
│   └── shared/                          # WhatsAppFloat, BusinessHoursBadge, CookieBanner
│
├── lib/                                 # Lógica de negócio e utilitários
│   ├── db.ts                            # Prisma Client singleton
│   ├── validation.ts                    # Schemas Zod + tipos TypeScript
│   ├── whatsapp.ts                      # Geração de URL wa.me + mensagem pré-preenchida
│   ├── business-hours.ts                # Lógica de horário comercial (fuso America/Bahia)
│   ├── facebook.ts                      # Facebook Conversions API (server-side)
│   ├── email.ts                         # Notificação de lead via Resend
│   └── hooks/
│       ├── useQuizState.ts              # State machine do quiz (Client Component)
│       └── useBusinessHours.ts          # Polling do badge de horário (Client Component)
│
├── prisma/
│   ├── schema.prisma                    # Modelos Lead e QuizProgress
│   ├── seed.ts                          # Dados fictícios para desenvolvimento
│   └── migrations/                      # Migration files (gerados pelo Prisma)
│
├── public/
│   ├── logo.svg                         # Logo 2M (placeholder — designer/cliente substitui)
│   ├── og-image.jpg                     # Imagem Open Graph 1200x630px (content-seo cria)
│   ├── favicon.ico
│   └── images/
│       ├── before-after/                # Fotos antes/depois (placeholders SVG)
│       ├── testimonials/                # Fotos depoimentos (avatares gerados)
│       └── about/                       # Foto do técnico (placeholder)
│
├── content/                             # Dados de conteúdo (não são componentes)
│   ├── quiz.ts                          # Perguntas, opções e microcopy do quiz
│   ├── services.ts                      # Cards dos 6 serviços
│   ├── testimonials.ts                  # 3 depoimentos [PLACEHOLDER fictícios]
│   ├── faq.ts                           # 8 perguntas e respostas
│   └── site.ts                          # Dados gerais da empresa (nome, CNPJ, stats)
│
├── config/                              # Configurações técnicas (não conteúdo)
│   ├── site.ts                          # Horário, WhatsApp, email — lidos de env vars
│   ├── pricing.ts                       # Tabela de preços estimados por serviço/BTU
│   └── areas.ts                         # Bairros atendidos com coordenadas para o mapa
│
├── docs/                                # Documentação do projeto
│   ├── briefing.md                      # Criado pelo requirements-analyst
│   ├── arquitetura.md                   # Este arquivo
│   ├── design-system.md                 # A criar: ui-ux-designer
│   ├── security-audit.md                # A criar: security-lgpd
│   ├── deploy.md                        # A criar: devops-engineer
│   ├── qa-report.md                     # A criar: qa-engineer
│   └── manual-cliente.md                # A criar: documentation-writer
│
├── .github/
│   └── workflows/
│       └── ci.yml                       # GitHub Actions: lint, typecheck, build em PRs
│
├── .env.example                         # Variáveis de ambiente documentadas
├── .eslintrc.json                       # ESLint com TypeScript + a11y
├── .gitignore                           # Node.js + Next.js + Prisma
├── next.config.ts                       # Config Next.js + headers de segurança
├── package.json                         # Dependências
├── prettier.config.js                   # Prettier com prettier-plugin-tailwindcss
├── tailwind.config.ts                   # Tokens base (ui-ux-designer completa)
└── tsconfig.json                        # TypeScript strict mode
```

---

## 3. Modelos Prisma (Schema Inicial)

### Lead — Dados capturados pelo quiz

```
Lead {
  id          String    (cuid — ID único)
  nome        String    (nome do cliente)
  whatsapp    String    (apenas dígitos: 5571999999999)
  problema    String    (Q1: cheiro-ruim | nao-resfria | instalacao | manutencao)
  local       String    (Q2: quarto | sala | cozinha | escritorio | outro)
  equipamento String    (Q3: nao-sei | 9000 | 12000 | 18000 | 24000+)
  urgencia    String    (Q4: hoje | esta-semana | duas-semanas | pesquisando)
  bairro      String    (Q5: nome do bairro)
  convertido  Boolean   (default: false — true quando clicou no link WhatsApp)
  utmSource   String?   (rastreamento Facebook Ads)
  utmMedium   String?
  utmCampaign String?
  utmContent  String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

**Índices:** `createdAt` (relatórios cronológicos), `convertido` (taxa de conversão), `bairro` (análise geográfica), `problema` (análise por tipo de serviço).

### QuizProgress — Rastreamento de abandono

```
QuizProgress {
  id        String    (cuid)
  session   String    @unique (UUID do visitante — gerado no client anonimamente)
  pergunta  Int       (1-5 = etapa atual; 6 = concluiu o quiz)
  respostas String    (JSON serializado das respostas parciais)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

**Nota:** Campo `respostas` é `String` (não `Json`) porque SQLite não suporta JSON nativo no Prisma. Em produção com Postgres, o backend-developer pode alterar para `Json` se necessário.

---

## 4. Dependências (package.json)

### Produção

| Pacote | Versão | Justificativa |
|--------|--------|--------------|
| `next` | ^14.2.0 | Framework principal |
| `react` + `react-dom` | ^18.3.0 | UI library |
| `@prisma/client` | ^5.14.0 | ORM type-safe |
| `zod` | ^3.23.0 | Validação de dados (obrigatório em todos os endpoints) |
| `tailwindcss` | ^3.4.0 | Estilos utility-first |
| `@tailwindcss/typography` | ^0.5.13 | Prosa nas páginas legais (privacidade, termos) |
| `framer-motion` | ^11.2.0 | Animações do quiz |
| `clsx` + `tailwind-merge` | latest | Composição de classes Tailwind sem conflitos |
| `sonner` | ^1.5.0 | Toast notifications (erros no quiz) |
| `react-hook-form` + `@hookform/resolvers` | latest | Formulário de captura de dados do lead |
| `@radix-ui/react-*` | latest | Primitivos acessíveis (accordion, dialog, progress) |
| `lucide-react` | ^0.379.0 | Ícones SVG (tree-shakeable) |
| `leaflet` + `react-leaflet` | latest | Mapa de atendimento (sem chave de API) |
| `resend` | ^3.2.0 | Notificação de lead por email |
| `@vercel/analytics` | ^1.3.0 | Analytics LGPD-friendly sem cookies |

### Desenvolvimento

| Pacote | Justificativa |
|--------|--------------|
| `prisma` | CLI para migrations e geração de tipos |
| `tsx` | Executa seed.ts sem compilação prévia |
| `@typescript-eslint/*` | Regras TypeScript no ESLint |
| `eslint-plugin-jsx-a11y` | Acessibilidade no ESLint (WCAG AA) |
| `prettier` + `prettier-plugin-tailwindcss` | Formatação + ordenação automática de classes Tailwind |
| `@types/*` | Tipos TypeScript das dependências |

---

## 5. Configuração TypeScript

`tsconfig.json` em strict mode completo. Destaques:

- `strict: true` — ativa todas as flags de tipo estrito
- `noUnusedLocals: true` — sem variáveis declaradas mas não usadas
- `noUnusedParameters: true` — sem parâmetros de função não usados
- `noImplicitReturns: true` — toda função deve retornar explicitamente
- `baseUrl: "."` + `paths: { "@/*": ["./*"] }` — imports com `@/` em vez de caminhos relativos

---

## 6. Padrões de Código

### 6.1 Naming Conventions

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Variáveis e funções | camelCase | `const quizProgress`, `function buildWhatsAppUrl()` |
| Componentes React | PascalCase | `function QuizResult()`, `function BusinessHoursBadge()` |
| Pastas e arquivos | kebab-case | `components/quiz-result.tsx`, `lib/business-hours.ts` |
| Constantes | UPPER_SNAKE_CASE | `const MAX_QUIZ_QUESTIONS = 5`, `const SALVADOR_CENTER` |
| Types e Interfaces | PascalCase | `interface LeadInput`, `type QuizStep` |
| Enums (Prisma) | snake_case | `problema: "cheiro-ruim"`, `urgencia: "esta-semana"` |

### 6.2 Server vs Client Components

```
Server Components (padrão — sem 'use client'):
  app/layout.tsx          → Root layout
  app/page.tsx            → Home page (importa seções)
  components/sections/*   → Hero, Services, BeforeAfter, Testimonials, About, FAQ, Cta
  app/api/*               → Route Handlers (sempre server-side)

Client Components (apenas onde necessário — com 'use client'):
  components/quiz/Quiz.tsx          → State machine requer useState/useEffect
  components/shared/WhatsAppFloat.tsx → onClick para tracking
  components/shared/BusinessHoursBadge.tsx → useBusinessHours (polling)
  components/shared/CookieBanner.tsx → useState para consentimento
  lib/hooks/useQuizState.ts         → Hook de estado do quiz
  lib/hooks/useBusinessHours.ts     → Hook com useEffect/fetch
```

**Regra:** Um componente só é Client se precisar de: estado local, efeitos colaterais, event handlers do browser, ou APIs client-only (window, localStorage).

### 6.3 APIs — Route Handlers

Toda API em `app/api/[route]/route.ts`. Estrutura obrigatória:

```typescript
// 1. Parse do body/params
// 2. Validação com Zod (obrigatória — nunca confiar no cliente)
// 3. Lógica de negócio
// 4. Resposta padronizada (ApiSuccess | ApiError de lib/validation.ts)
```

Sem exceções ao Zod. Respostas sempre tipadas com `ApiResponse<T>`.

### 6.4 Sem Magic Numbers

Constantes nomeadas em maiúsculas. Exemplos:

```typescript
const MAX_QUIZ_QUESTIONS = 5        // Não: if (step === 5)
const NOME_MIN_LENGTH = 2           // Não: z.string().min(2)
const REFRESH_INTERVAL_MS = 60_000  // Não: setInterval(fn, 60000)
```

### 6.5 Comentários em PT-BR

Código em inglês (convenção JavaScript). Comentários sempre em português do Brasil. Commits em inglês (convenção git).

### 6.6 Sem Hard-code de Textos

Todos os textos de UI em `content/` ou `config/`. Componentes importam de lá. Facilita manutenção e futura internacionalização.

---

## 7. Variáveis de Ambiente

| Variável | Obrigatória | Dev default | Quem configura |
|----------|-------------|-------------|----------------|
| `DATABASE_URL` | Sim | `file:./dev.db` | devops-engineer (Vercel Postgres em prod) |
| `WHATSAPP_NUMBER` | Sim | `5571999999999` | Cliente (número real) |
| `NOTIFICATION_EMAIL` | Sim | `contato@solucoes2m.com.br` | Cliente (email para leads) |
| `NEXT_PUBLIC_FB_PIXEL_ID` | SHOULD | `PIXEL_ID_AQUI` | Cliente (Facebook Ads Manager) |
| `FB_CONVERSIONS_API_TOKEN` | SHOULD | `TOKEN_AQUI` | Cliente (Facebook Events Manager) |
| `RESEND_API_KEY` | SHOULD | `re_XXXXX` | Agência (Resend dashboard) |
| `NEXT_PUBLIC_SITE_URL` | Sim | `http://localhost:3000` | Agência (URL real em prod) |
| `CNPJ` | Sim | `00.000.000/0001-00` | Cliente |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | COULD | `xxxxx` | Vercel (automático) |
| `NEXT_PUBLIC_SENTRY_DSN` | COULD | — | devops-engineer (v2) |

**Prefixo `NEXT_PUBLIC_`:** Variáveis expostas ao browser. Nunca usar para segredos.

---

## 8. Fluxo de Dados

### 8.1 Fluxo Principal (Quiz → Lead → WhatsApp)

```
[Browser]
    │ Usuário responde quiz (5 etapas)
    │ useQuizState gerencia estado no cliente
    │
    ▼
POST /api/lead
    │ 1. Zod valida LeadSchema
    │ 2. prisma.lead.create() salva no banco
    │ 3. buildWhatsAppUrl() gera link wa.me
    │ 4. [async] sendLeadNotificationEmail() → Resend
    │ 5. [async] sendFacebookLeadEvent() → FB Conversions API
    │ 6. Retorna { whatsappUrl }
    │
    ▼
[Browser]
    │ Recebe whatsappUrl
    │ window.open(whatsappUrl) — abre WhatsApp
    │ Lead.convertido = true (update via API ou flag no response)
```

### 8.2 Rastreamento de Abandono (QuizProgress)

```
[Browser]
    │ A cada troca de etapa no quiz:
    │ useQuizState chama POST /api/quiz/progress
    │
    ▼
POST /api/quiz/progress
    │ 1. Zod valida QuizProgressSchema
    │ 2. prisma.quizProgress.upsert() por session UUID
    │ 3. Retorna 200 OK
```

### 8.3 Badge de Horário Comercial

```
[Browser]
    │ useBusinessHours faz GET /api/business-hours a cada 60s
    │
    ▼
GET /api/business-hours
    │ getBusinessHoursStatus() verifica fuso America/Bahia
    │ Retorna { isOpen, message, ... }
    │ Cache-Control: max-age=60
```

### 8.4 Facebook Pixel (Client-side)

```
[Browser — após consent do cookie banner]
    │ fbq('init', PIXEL_ID)
    │ fbq('track', 'Lead', { eventID: uuid })
    │
    ▼
[Servidor — simultaneamente ao salvar o lead]
    │ sendFacebookLeadEvent(lead, pixelId, eventID)
    │ → graph.facebook.com (Conversions API)
    │ Mesmo eventID para deduplicação automática pelo Facebook
```

---

## 9. Headers de Segurança

Configurados em `next.config.ts` para todas as rotas:

| Header | Valor | Proteção |
|--------|-------|---------|
| `X-Frame-Options` | `DENY` | Clickjacking |
| `X-Content-Type-Options` | `nosniff` | MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Vazamento de URL |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | APIs sensíveis |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | HTTPS forçado |
| `Content-Security-Policy` | Ver `next.config.ts` | XSS, injeção |

**Nota:** O security-lgpd deve revisar e restringir o CSP antes do go-live, especialmente as diretivas `script-src` e `connect-src`.

---

## 10. Performance — Estratégia

| Técnica | Implementação | Meta |
|---------|--------------|------|
| SSR por padrão | Server Components para seções estáticas | LCP < 2.5s |
| Lazy load de imagens | `next/image` com `loading="lazy"` | CLS < 0.1 |
| Import dinâmico do mapa | `dynamic(() => import('react-leaflet'), { ssr: false })` | Não bloqueia render |
| Fontes otimizadas | `next/font` com subset + `display: swap` | FID < 100ms |
| Bundle JS mínimo | Server Components reduzem JS no client | < 150KB gzip |
| Cache de business-hours | `Cache-Control: max-age=60` | Reduz requests |
| Animações leves | Framer Motion apenas nos componentes do quiz | Performance score |

---

## 11. Error Handling

### APIs (Route Handlers)

```typescript
// Padrão de resposta em todos os endpoints
type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string; details?: ZodError[] }

// Status codes:
// 200 OK — sucesso em GET
// 201 Created — lead criado com sucesso
// 400 Bad Request — validação Zod falhou
// 429 Too Many Requests — rate limiting (backend-developer implementa)
// 500 Internal Server Error — erro não tratado
// 501 Not Implemented — scaffold ainda não implementado
```

### Integrações Externas (Resend, Facebook)

Falhas em integrações externas são logadas mas **não propagam** para o usuário. O lead é salvo e o WhatsApp abre normalmente, independente de falha no email ou no Pixel. Ver `lib/email.ts` e `lib/facebook.ts`.

### Logs

Nunca logar: nome, WhatsApp, email, IP completo ou qualquer dado pessoal em texto puro. Logar apenas IDs, status codes e mensagens de erro sem PII.

---

## 12. Sequência de Implementação Recomendada

### Backend-developer (pode começar agora)

1. Configurar SQLite local: `DATABASE_URL=file:./dev.db npx prisma db push`
2. Implementar `POST /api/lead` completo (remover scaffold, implementar comentários TODO)
3. Implementar `POST /api/quiz/progress` com upsert
4. Adicionar rate limiting (middleware ou biblioteca `upstash/ratelimit`)
5. Integrar Resend (`lib/email.ts` — remover scaffold)
6. Implementar hash SHA-256 em `lib/facebook.ts` e integrar com Conversions API
7. Criar seed data em `prisma/seed.ts`

### Frontend-developer (aguarda ui-ux-designer para design tokens)

1. Instalar dependências: `npm install`
2. Setup shadcn/ui: `npx shadcn-ui@latest init`
3. Implementar componentes `layout/` (Header, Footer)
4. Implementar `Quiz.tsx` com `useQuizState` (já criado)
5. Implementar seções por ordem de impacto: Hero → Quiz → Serviços → BeforeAfter → Depoimentos → Sobre → Mapa → FAQ → CTA Final
6. Implementar `WhatsAppFloat.tsx` e `CookieBanner.tsx` e `BusinessHoursBadge.tsx`

### Paralelo (pode começar agora)

- **ui-ux-designer:** Criar `docs/design-system.md` + completar `tailwind.config.ts` com tokens reais
- **content-seo:** Usar `content/` como ponto de partida para refinar copy em PT-BR

---

## 13. Critérios de "Done" para Arquitetura

- [x] `docs/arquitetura.md` criado com todas as seções acima
- [x] Estrutura de pastas criada: `app/`, `components/`, `lib/`, `prisma/`, `public/`, `content/`, `config/`, `docs/`, `.github/`
- [x] `package.json` com todas as dependências
- [x] `tsconfig.json` em strict mode
- [x] `tailwind.config.ts` base (ui-ux-designer completa)
- [x] `.eslintrc.json` com TypeScript + a11y
- [x] `prettier.config.js` com prettier-plugin-tailwindcss
- [x] `.env.example` documentado
- [x] `.gitignore` completo
- [x] `next.config.ts` com headers de segurança base
- [x] `prisma/schema.prisma` com `Lead` e `QuizProgress`
- [x] `prisma/seed.ts` scaffold
- [x] `lib/db.ts` Prisma singleton
- [x] `lib/validation.ts` com Zod schemas completos
- [x] `lib/whatsapp.ts` com geração de URL e mensagem
- [x] `lib/business-hours.ts` com lógica real de horário
- [x] `lib/facebook.ts` scaffold para Conversions API
- [x] `lib/email.ts` scaffold para Resend
- [x] `lib/hooks/useQuizState.ts` state machine completa
- [x] `lib/hooks/useBusinessHours.ts` hook de polling
- [x] `app/layout.tsx` root layout com meta tags base
- [x] `app/page.tsx` home com seções scaffold
- [x] `app/api/lead/route.ts` scaffold
- [x] `app/api/quiz/progress/route.ts` scaffold
- [x] `app/api/business-hours/route.ts` implementado
- [x] `app/politica-de-privacidade/page.tsx` scaffold
- [x] `app/termos-de-uso/page.tsx` scaffold
- [x] `content/quiz.ts` perguntas e opções
- [x] `content/services.ts` 6 serviços
- [x] `content/testimonials.ts` 3 [PLACEHOLDER fictícios]
- [x] `content/faq.ts` 8 perguntas
- [x] `content/site.ts` dados da empresa
- [x] `config/areas.ts` bairros com coordenadas
- [x] `config/pricing.ts` tabela de preços
- [x] `config/site.ts` configurações técnicas
- [x] `.github/workflows/ci.yml` GitHub Actions

---

## 14. Próxima Etapa

Após esta arquitetura validada, os seguintes agentes podem começar **em paralelo**:

- **ui-ux-designer** — `docs/design-system.md` + completar `tailwind.config.ts` com paleta de cores real, tipografia e tokens
- **frontend-developer** — Começar implementação dos componentes usando o scaffold criado
- **backend-developer** — Implementar as APIs (`/api/lead`, `/api/quiz/progress`) substituindo os scaffolds, configurar Prisma localmente e integrar Resend

**Stack definida:** Next.js 14 (App Router) + TypeScript strict + Tailwind CSS + shadcn/ui + Prisma (SQLite dev / Postgres prod)

---

**Arquitetura aprovada por:** solution-architect  
**Data:** 2026-04-23  
**Próxima revisão:** Após frontend-developer e backend-developer iniciarem implementação
