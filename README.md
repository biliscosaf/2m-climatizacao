# Soluções 2M Climatização — Landing Page

Landing page de alta conversão para captura de leads de serviços de climatização em Salvador-BA.

## 🎯 Resumo Executivo

**O que é:** Landing page responsiva focada em conversão de visitantes → leads qualificados via quiz interativo → WhatsApp.

**Stack Tecnológico:**
- Frontend: Next.js 14 (App Router), React 18, TypeScript (strict mode)
- Estilos: Tailwind CSS + shadcn/ui + Framer Motion
- Backend: Node.js com Next.js API Routes
- Database: PostgreSQL (Vercel Postgres) com Prisma ORM
- Validação: Zod (schema validation no backend)
- Email: Resend (notificações de novo lead)
- Analytics: Vercel Analytics + Facebook Conversions API
- Deploy: Vercel (auto-deploy de main)

**Métricas de Qualidade:**
- Lighthouse: ≥90 em todos 4 quadrantes (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- Acessibilidade: WCAG 2.1 AA compliant
- LGPD: 100% compliant (política + banner + rate limiting)

**Seções Implementadas:**
1. Hero + CTA quiz
2. Serviços (6 cards com preços estimados)
3. Mapa de cobertura (Leaflet + OpenStreetMap)
4. Galeria antes/depois (slider comparativo)
5. Depoimentos de clientes
6. FAQ (accordion)
7. Badge de horário comercial
8. WhatsApp flutuante
9. Footer com links legais

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js ≥18.17.0
- npm 9+
- Git

### Clone e Setup

```bash
# Clone repositório
git clone https://github.com/seuorganismo/2m-climatizacao.git
cd 2m-climatizacao

# Instale dependências
npm install

# Configure variáveis de ambiente (veja .env.example)
cp .env.example .env.local
# Edite .env.local com suas chaves reais

# Sincronize banco de dados
npm run db:push

# (Opcional) Popule dados de exemplo
npm run db:seed
```

### Desenvolver Localmente

```bash
# Inicie servidor de desenvolvimento (hot reload habilitado)
npm run dev

# Abra http://localhost:3000 no navegador
# Edições salvas automaticamente
```

### Build & Teste em Produção

```bash
# Lint + Prettier check
npm run lint

# TypeScript strict type checking
npm run typecheck

# Build para produção
npm run build

# Rode build em produção (simulate prod)
npm start
```

### Comandos de Banco de Dados

```bash
# Sincronize schema Prisma com database
npm run db:push

# Crie migration nova (após editar prisma/schema.prisma)
npm run db:migrate

# Abra Prisma Studio (UI para explorar dados)
npm run db:studio

# Popule dados de exemplo
npm run db:seed
```

---

## 📁 Estrutura de Pastas

```
solucoes-2m-climatizacao/
├── app/                          # Next.js App Router (pages, layouts, API)
│   ├── api/                      # API routes
│   │   ├── lead/                 # POST: capture lead from quiz
│   │   ├── quiz/                 # POST: track quiz progress
│   │   ├── business-hours/       # GET: check operating status
│   │   └── leads/                # GET: aggregated leads (LGPD-safe)
│   ├── politica-de-privacidade/  # LGPD privacy policy page
│   ├── termos-de-uso/            # Terms of use page
│   ├── layout.tsx                # Root layout (global styles, providers)
│   ├── page.tsx                  # Home page (all sections)
│   └── globals.css               # Global Tailwind + custom CSS
│
├── components/                   # React components (organized by domain)
│   ├── layout/                   # Layout components (header, footer, nav)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx    # Floating WhatsApp button
│   ├── quiz/                     # Quiz flow components
│   │   ├── QuizContainer.tsx     # Main quiz wrapper
│   │   ├── QuizStep.tsx          # Individual question step
│   │   ├── QuizResult.tsx        # Result + lead capture
│   │   └── ProgressBar.tsx       # Step progress indicator
│   ├── sections/                 # Home page sections
│   │   ├── HeroSection.tsx       # Hero + CTA
│   │   ├── ServicesSection.tsx   # 6 service cards
│   │   ├── MapSection.tsx        # Coverage map (Leaflet)
│   │   ├── GallerySection.tsx    # Before/after slider
│   │   ├── TestimonialsSection.tsx  # Customer reviews
│   │   ├── FAQSection.tsx        # FAQ accordion
│   │   └── AboutSection.tsx      # About company
│   ├── shared/                   # Reusable components
│   │   ├── CookieBanner.tsx      # LGPD cookie consent
│   │   ├── BusinessHoursBadge.tsx # Operating status
│   │   ├── BeforeAfterSlider.tsx # Image comparison slider
│   │   └── PriceCard.tsx         # Service price card
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── accordion.tsx
│       ├── dialog.tsx
│       ├── progress.tsx
│       └── label.tsx
│
├── lib/                          # Utilities & helpers
│   ├── db.ts                     # Prisma client singleton
│   ├── validation.ts             # Zod schemas (lead, quiz, etc)
│   ├── whatsapp.ts               # Format WhatsApp message + deep link
│   ├── email.ts                  # Send email via Resend
│   ├── business-hours.ts         # Check if operating
│   ├── facebook.ts               # Facebook Conversions API
│   ├── utils.ts                  # Misc utilities (classnames, etc)
│   └── hooks/                    # React hooks
│       ├── useIsMobile.ts        # Mobile breakpoint detection
│       └── useQuizState.ts       # Quiz state management
│
├── content/                      # Copy (all in PT-BR)
│   ├── site.ts                   # Global site config (name, phone, hours)
│   ├── heroText.ts               # Hero section copy
│   ├── services.ts               # Service cards data
│   ├── quiz.ts                   # Quiz questions + options
│   ├── quizTexts.ts              # Quiz labels + messages
│   ├── faq.ts                    # FAQ data
│   ├── testimonials.ts           # Customer testimonials
│   ├── sectionTexts.ts           # Other section copy
│   ├── about.ts                  # About section
│   └── footerText.ts             # Footer copy
│
├── prisma/                       # Database
│   ├── schema.prisma             # Data models (Lead, QuizProgress, AuditLog)
│   ├── migrations/               # Auto migrations (don't edit)
│   └── seed.ts                   # Sample data (dev only)
│
├── public/                       # Static assets
│   ├── logo.svg                  # Company logo
│   ├── images/
│   │   ├── hero.jpg              # Hero background
│   │   ├── before-after/
│   │   │   ├── before-1.jpg      # Before/after pairs
│   │   │   ├── after-1.jpg
│   │   │   └── ... (up to 6 pairs)
│   │   ├── testimonials/         # Optional testimonial photos
│   │   └── services/             # Optional service icons
│   ├── robots.txt                # SEO: search engine crawler rules
│   └── sitemap.xml               # SEO: site structure
│
├── docs/                         # Technical documentation
│   ├── arquitetura.md            # System architecture
│   ├── briefing.md               # Client requirements
│   ├── design-system.md          # Design tokens + components
│   ├── security-audit.md         # OWASP Top 10 audit
│   ├── seo-implementation.md     # SEO checklist + schema.org
│   ├── qa-report-interim.md      # QA findings
│   └── content-seo-report.md     # Copy + SEO review
│
├── .github/                      # GitHub Actions CI/CD
│   └── workflows/
│       └── ci.yml                # Lint, typecheck, build on PR
│
├── .env.example                  # Example environment variables
├── .env.local                    # Local env (git-ignored)
├── .eslintrc.json                # ESLint config
├── .gitignore                    # Git ignore rules
├── .prettierrc.json              # Prettier formatting rules
├── next.config.ts                # Next.js config
├── tsconfig.json                 # TypeScript config (strict mode)
├── tailwind.config.ts            # Tailwind CSS config + custom tokens
├── package.json                  # Dependencies + scripts
├── package-lock.json             # Lock file
├── README.md                      # This file
├── CHANGELOG.md                  # Version history
├── CONTRIBUTING.md               # Dev guidelines
└── PROJECT_STATE.md              # Project status + roadmap
```

---

## 🎨 Design System

### Tailwind CSS com Tokens Semânticos

**Cores Principais:**
```typescript
// tailwind.config.ts
colors: {
  // Clima/Frio
  'sky-ice': '#0EA5E9',      // Azul céu (cooling)
  'frost': '#E0F2FE',        // Azul claro (background)
  
  // Energia/Quente
  'orange-heat': '#F97316',  // Laranja quente (CTA)
  'amber-light': '#FEF3C7',  // Âmbar claro (background)
  
  // Neutro
  'gray-neutral': {
    50: '#F9FAFB',
    100: '#F3F4F6',
    500: '#6B7280',
    900: '#111827',
  }
}
```

### Componentes shadcn/ui Utilizados
- `Button` → CTAs e ações
- `Input` → Campos de texto (nome, WhatsApp)
- `Card` → Service cards, testimonials
- `Accordion` → FAQ
- `Dialog` → Modal (se necessário)
- `Progress` → Quiz step progress bar
- `Label` → Form labels

### Animações (Framer Motion)
- Fade-in no scroll
- Scale on hover (buttons, cards)
- Slide transitions entre quiz steps
- Parallax effects (hero section)

---

## 🗄️ Database Schema (Prisma)

### Model: Lead
```prisma
model Lead {
  id              String    @id @default(cuid())
  
  // Quiz info
  quizAnswers     Json      // Respostas às 5 perguntas
  estimatedPrice  Decimal   // Preço estimado (range min-max)
  
  // Contato
  nome            String
  whatsapp        String
  bairro          String
  
  // Meta
  utm_source      String?   // e.g., "facebook"
  utm_campaign    String?   // e.g., "ar-condicionado"
  userAgent       String?   // Device info
  ipAddress       String?   // For rate limiting (anonymized)
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([createdAt])
}

model QuizProgress {
  id              String    @id @default(cuid())
  
  sessionId       String    // Track abandonment
  currentStep     Int       // 0-4 (5 perguntas)
  answers         Json      // Partial answers
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([sessionId])
}

model AuditLog {
  id              String    @id @default(cuid())
  
  action          String    // "lead_created", "quiz_started", "data_accessed"
  leadId          String?   // Optional reference to lead
  ipAddress       String    // For LGPD compliance
  userAgent       String?
  metadata        Json?     // Extra data
  
  createdAt       DateTime  @default(now())
  
  @@index([action])
  @@index([createdAt])
}
```

**Migrações:**
```bash
# Criadas automaticamente via Prisma Migrate
npx prisma migrate dev --name init
```

---

## 🔌 API Routes

### POST /api/lead
**Capture novo lead do quiz**

Request:
```json
{
  "nome": "João Silva",
  "whatsapp": "5571999999999",
  "bairro": "Pituba",
  "quizAnswers": {
    "problema": "instalacao",
    "local": "residencial",
    "tipo": "split",
    "urgencia": "semana",
    "bairro": "Pituba"
  },
  "utm_source": "facebook",
  "utm_campaign": "summer_promo"
}
```

Response (201 Created):
```json
{
  "id": "lead_abc123",
  "estimatedPrice": {
    "min": 1500,
    "max": 3000
  },
  "whatsappLink": "https://wa.me/5571999999999?text=Oi%20João...",
  "createdAt": "2026-04-23T10:30:00Z"
}
```

Validação: Zod schema em `lib/validation.ts`
Rate limit: 10 requisições por IP por hora
Error responses: 400 (invalid), 429 (rate limited), 500 (server error)

### POST /api/quiz/progress
**Track quiz abandonment**

Request:
```json
{
  "sessionId": "sess_abc123",
  "currentStep": 3,
  "answers": {
    "problema": "limpeza",
    "local": "comercial"
  }
}
```

Response (200 OK):
```json
{ "success": true }
```

Rate limit: 50 requisições por IP por hora

### GET /api/business-hours
**Check if company is currently operating**

Response (200 OK):
```json
{
  "isOpen": true,
  "message": "Aberto agora! (horário comercial seg-sab 08:00-18:00)",
  "nextOpen": "2026-04-24T08:00:00Z"
}
```

Cache: 5 minutos
Timezone: America/Bahia (Salvador)

### GET /api/leads
**Aggregated leads statistics (LGPD-safe)**

Request:
```
GET /api/leads?startDate=2026-04-01&endDate=2026-04-30
```

Response (200 OK):
```json
{
  "totalLeads": 42,
  "leadsByDay": [
    { "date": "2026-04-23", "count": 5 }
  ],
  "conversionByProblem": {
    "instalacao": 15,
    "limpeza": 12,
    "manutencao": 10,
    "reparo": 5
  },
  "averagePrice": 2100,
  "period": { "start": "2026-04-01", "end": "2026-04-30" }
}
```

Auth: Rate limited (5 req/IP/hour)
LGPD: Zero PII (personal names removed)

---

## 🛡️ Segurança & LGPD

### TypeScript & Validação
- TypeScript strict mode SEMPRE (`strict: true` em tsconfig.json)
- Nenhum tipo `any` permitido
- Zod validation em TODOS inputs (backend + cliente)
- Nunca confiar em validação client-side

### Headers de Segurança
```typescript
// next.config.ts
headers: {
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff"
}
```

### LGPD Compliance
**Política de Privacidade (13 seções):**
1. Dados coletados e propósito
2. Base legal (consentimento, interesse legítimo)
3. Destinatários de dados
4. Tempo de retenção
5. Direitos do titular (acesso, correção, exclusão)
6. Como exercer direitos
7. Cookies e rastreamento
8. Segurança de dados
9. Transferências internacionais (se houver)
10. Mudanças na política
11. Responsável pelo tratamento
12. Contato DPO (Data Protection Officer)
13. Lei aplicável

**Cookie Banner:**
- Consentimento granular: essential, functional, analytics
- Salvo em localStorage por 12 meses
- Reavalia a cada 6 meses
- "Rejeitar tudo" em destaque igual a "Aceitar"

**Rate Limiting:**
- /api/lead: 10 req/IP/hora (previne spam)
- /api/quiz/progress: 50 req/IP/hora
- /api/leads: 5 req/IP/hora

**Logs & Auditoria:**
- AuditLog model: action, timestamp, anonymized IP
- Nunca logar: nomes, WhatsApp, valores de preço
- Retenção: 90 dias (depois deletar)

**Dados PII:**
- Armazenados encriptados em repouso (Vercel auto)
- Transmitidos via HTTPS only
- Acesso restrito à equipe autenticada
- Backup automático Vercel

### SQL Injection Prevention
- Prisma ORM: sem queries raw (exceto com cuidado)
- Zod validation: whitelist campos esperados
- Parametrized queries everywhere

---

## 🚀 Deploy

### Ambiente: Vercel

**Preview (Staging):**
```
https://<branch>.2m-climatizacao.vercel.app
```
- Auto-deploy em cada PR
- Database: Vercel Postgres (preview)
- Válido por 7 dias após PR fechado

**Produção:**
```
https://2m-climatizacao.vercel.app (enquanto domínio não configurado)
https://seudominio.com.br (após client configurar)
```
- Auto-deploy em cada push para main
- Database: Vercel Postgres (production)
- SSL automático (Vercel)
- CDN global

### Deployment Flow

1. **Desenvolvimento Local:**
   ```bash
   git checkout -b feat/xyz
   npm run dev
   # Testa tudo
   npm run typecheck && npm run lint && npm run build
   ```

2. **Push & PR:**
   ```bash
   git commit -m "feat: xyz"
   git push origin feat/xyz
   # GitHub Actions roda CI (lint, typecheck, build)
   # Vercel cria preview URL
   ```

3. **Merge & Deploy:**
   ```bash
   # Merge via GitHub UI ou CLI
   git checkout main && git pull
   git merge feat/xyz
   git push origin main
   # Vercel auto-deploys (~2-3 min)
   # Check https://vercel.com/dashboard
   ```

4. **Monitor:**
   - Vercel Analytics dashboard
   - Sentry error tracking (setup v2)
   - Database health em Vercel Storage

### Variáveis de Ambiente

**Local (.env.local):**
```bash
# Database
DATABASE_URL=file:./dev.db

# Negócio
WHATSAPP_NUMBER=5571999999999
BUSINESS_HOURS="seg-sab 08:00-18:00"

# Email
RESEND_API_KEY=re_xxxxx

# Facebook
NEXT_PUBLIC_FB_PIXEL_ID=pixel_id_aqui
FB_CONVERSIONS_API_TOKEN=token_aqui

# Optional: Sentry (v2)
NEXT_PUBLIC_SENTRY_DSN=https://...
```

**Vercel Dashboard:**
Set same variables em: Project Settings → Environment Variables

### Rollback de Emergência

```bash
# Find last good commit
git log --oneline | head -10

# Revert
git revert <hash-do-commit-bom>
git push origin main

# Vercel redeploys automatically (~2 min)
```

---

## 📊 Performance

### Lighthouse Targets (Monthly Check)

**Métricas (via PageSpeed Insights):**
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥95
- SEO: ≥90

**Core Web Vitals:**
- LCP (Largest Contentful Paint): <2.5s ✅
- FID (First Input Delay): <100ms ✅
- CLS (Cumulative Layout Shift): <0.1 ✅

**Otimizações Implementadas:**
- Image optimization: `next/image` com lazy loading
- Code splitting automático (Next.js)
- Minification de CSS/JS (produção)
- Caching headers em assets estáticos
- Database queries otimizadas (Prisma)
- API responses estruturadas (não fetch tudo)

### Monitoramento

**Vercel Analytics:**
- Dashboard automático (LGPD-friendly)
- Real User Monitoring (RUM)
- Page performance metrics

**Facebook Conversions API:**
- Server-side event tracking
- Pixel tracking dual (client + server)
- Conversion data para otimização de ads

---

## ♿ Acessibilidade (WCAG 2.1 AA)

### Keyboard Navigation
- Tab order lógico em todos elementos
- Focus states visíveis (outline)
- Enter para submit, Space para buttons
- Escape para fechar modals

### Screen Readers
- ARIA labels em buttons, inputs
- Semantic HTML: `<button>`, `<input>`, não `<div>` como button
- Alt text em todas images
- Role attributes onde necessário

### Contrast Ratio
- Normal text: 4.5:1 (noir/white)
- Large text (≥18px): 3:1
- Color não é único meio de informação (use também icon/label)

### Color Blindness
- Design não depende apenas de cor (use pattern, icon)
- Simulator: https://www.color-blindness.com/coblis-color-blindness-simulator/

### Mobile Accessibility
- Touch targets: mín 44x44px
- Zoom: ≥2x funciona
- Responsive text: não quebra layout

### Testes
```bash
# Lighthouse accessibility audit
npm run build && npx lighthouse http://localhost:3000

# axe DevTools (Chrome extension)
# WAVE (Chrome extension)
```

---

## 🤝 Contribuindo

### Branch Naming
```bash
# Feature
git checkout -b feat/quiz-validation

# Bug fix
git checkout -b fix/whatsapp-link-ios

# Documentation
git checkout -b docs/update-readme

# Refactoring
git checkout -b refactor/api-routes
```

### Commit Messages (English)
```bash
git commit -m "feat: add quiz completion analytics"
git commit -m "fix: correct WhatsApp link format for iOS"
git commit -m "docs: update deployment guide"
git commit -m "refactor: extract quiz state to custom hook"
```

### Code Standards

**TypeScript:**
- Strict mode ALWAYS
- No `any` type (use generics, unknown, or explicit)
- Exports typed (prefer named exports)
- Interfaces para objetos, types para unions

**React Components:**
- Server Components por padrão
- `'use client'` only for interactivity (state, events, hooks)
- Naming: PascalCase files + exports
- Props typed com interfaces

**Styling:**
- Tailwind CSS (no inline styles)
- Dark mode via `dark:` classes
- Responsive: mobile-first (sm:, md:, lg:)

**Validation:**
- Zod schemas in `lib/validation.ts`
- Validate on backend ALWAYS
- Error messages in PT-BR

**Testing:**
```bash
# Code quality
npm run lint      # ESLint + Prettier
npm run typecheck # TypeScript
npm run build     # Full build (catches issues)
```

### PR Process
1. Create branch locally
2. Commit changes
3. Push to GitHub
4. Create PR (GitHub UI)
5. Vercel preview auto-deploys
6. Request review
7. Merge after approval
8. Vercel auto-deploys to production

---

## 📞 Suporte & Contato

### Issues & Bugs
- GitHub Issues: https://github.com/seuorganismo/2m-climatizacao/issues
- Título descritivo: `[BUG] Quiz validation failing on iOS`
- Reprodução: steps, browser, screenshot

### Documentação Técnica
- Arquitetura: `/docs/arquitetura.md`
- Design System: `/docs/design-system.md`
- Security: `/docs/security-audit.md`
- SEO: `/docs/seo-implementation.md`

### Client Support
- Manual de uso: `/docs/manual-cliente.md`
- FAQ técnica: `docs/qa-report-interim.md`
- Contato: tech@suaempresa.com

---

## 📜 Licença

© 2026 Soluções 2M Climatização. Todos os direitos reservados.

Propriedade intelectual do cliente. Desenvolvido por Agência Digital [Your Agency].

---

## Changelog

Veja [CHANGELOG.md](./CHANGELOG.md) para histórico de versões e roadmap.

---

## Tech Stack Completo

| Categoria | Ferramenta | Versão |
|-----------|-----------|--------|
| **Frontend** | Next.js | 14.1.0 |
| | React | 18.3.0 |
| | TypeScript | 5.9.3 |
| | Tailwind CSS | 3.4.0 |
| | shadcn/ui | latest |
| | Framer Motion | 11.2.0 |
| **Mapa** | Leaflet | 1.9.4 |
| | React Leaflet | 4.2.1 |
| **Form** | React Hook Form | 7.51.0 |
| | Zod | 3.23.0 |
| **Backend** | Node.js | ≥18.17.0 |
| **Database** | PostgreSQL (Prod) | 15+ |
| | SQLite (Dev) | 3 |
| | Prisma ORM | 5.14.0 |
| **Email** | Resend | 3.2.0 |
| **Deploy** | Vercel | - |
| **CI/CD** | GitHub Actions | - |
| **Monitoramento** | Vercel Analytics | 1.3.0 |
| | Sentry (v2) | - |
| **Linting** | ESLint | 8.57.0 |
| | Prettier | 3.3.0 |

---

**Desenvolvido por Squad de 12 Agentes — Anthropic Claude Code**

Perguntas? Abra issue no GitHub ou consulte documentação em `/docs`.

