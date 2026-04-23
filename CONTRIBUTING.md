# Contributing Guidelines — Soluções 2M Climatização

Obrigado por contribuir! Este documento define os padrões de código, convenções de branch, commits e processo de PR.

---

## 🎯 Filosia do Projeto

- **Qualidade em primeiro lugar:** Lighthouse ≥90, WCAG AA, zero vulnerabilidades
- **TypeScript strict mode:** Sem `any`, sem escapes
- **Português do Brasil:** Copy, comentários, mensagens de erro
- **Inglês para commits:** Convenção Git global
- **User-centric:** Toda mudança deve melhorar UX ou performance

---

## 🌿 Branch Naming

Nomes claros e descritivos, seguindo padrão:

### Feature (Nova funcionalidade)
```bash
git checkout -b feat/quiz-validation
git checkout -b feat/add-admin-dashboard
git checkout -b feat/whatsapp-deep-link
```

### Bug Fix (Correção)
```bash
git checkout -b fix/whatsapp-format-ios
git checkout -b fix/quiz-abandonment-tracking
git checkout -b fix/lighthouse-performance
```

### Documentation
```bash
git checkout -b docs/update-readme
git checkout -b docs/add-deployment-guide
git checkout -b docs/security-audit
```

### Refactoring
```bash
git checkout -b refactor/api-routes
git checkout -b refactor/extract-hooks
git checkout -b refactor/simplify-components
```

### Performance (Otimização)
```bash
git checkout -b perf/image-optimization
git checkout -b perf/database-indexing
```

### Dependency Update
```bash
git checkout -b chore/update-dependencies
git checkout -b chore/upgrade-next-14.2
```

**❌ Evite:**
- `feature/xyz` (sem hífen antes do nome)
- `my-feature` (genérico)
- `WIP` (não é descrição)
- `fix-everything` (muito vago)

---

## 💬 Commit Messages

Mensagens em **inglês**, concisas e descritivas.

### Formato
```
<type>(<scope>): <subject>

<body>
```

### Types
- `feat:` — Nova feature
- `fix:` — Bug fix
- `docs:` — Documentação
- `style:` — Formatação (Prettier, espaçamento)
- `refactor:` — Refatoração sem mudança de comportamento
- `perf:` — Performance improvement
- `test:` — Testes (se houver)
- `chore:` — Build, deps, config

### Scope (Opcional)
Parte do código afetada:
- `api` — API routes
- `quiz` — Quiz component
- `db` — Database/Prisma
- `ui` — UI components
- `docs` — Documentação
- `ci` — GitHub Actions

### Examples

```bash
# Feature simples
git commit -m "feat: add quiz completion analytics"

# Fix com contexto
git commit -m "fix(quiz): correct WhatsApp link format for iOS"

# Refactoring
git commit -m "refactor(api): extract validation to lib"

# Docs
git commit -m "docs: add deployment guide"

# Performance
git commit -m "perf(images): lazy load before-after gallery"

# Múltiplas linhas (commits maiores)
git commit -m "feat(admin): add lead dashboard

- Paginated table of leads
- Filters by date, area, problem
- Export CSV functionality
- Real-time updates via WebSocket"
```

**❌ Evite:**
- `update code` (vago)
- `FIXTHIS!!!` (não é profissional)
- `português` em commit message
- Plurais desnecessários: `feat: add features` → `feat: add feature`

---

## 📝 Code Standards

### TypeScript

**Strict Mode — SEMPRE**

```typescript
// ✅ Bom
interface Lead {
  id: string;
  nome: string;
  whatsapp: string;
  createdAt: Date;
}

const lead: Lead = { /* ... */ };

// ❌ Ruim
const lead: any = { /* ... */ };
const data = fetchLead(); // sem tipo
```

**No Escape Hatches**
```typescript
// ❌ Evite
let something: any;
// @ts-ignore
const x = doSomething();

// ✅ Use
let something: unknown;
const x: ExpectedType = doSomething();
```

**Exports**
```typescript
// ✅ Named exports (preferido)
export function formatWhatsApp(number: string): string { }
export const BUSINESS_HOURS = "seg-sab 08:00-18:00";

// ❌ Default export (use apenas para componentes)
export default function QuizContainer() { }
```

**Interfaces vs Types**
```typescript
// ✅ Interfaces para objetos
interface Lead {
  id: string;
  nome: string;
}

// ✅ Types para unions, primitives
type Problem = "instalacao" | "limpeza" | "manutencao";
type ServicePrice = { min: number; max: number };
```

### React Components

**Server Components por Padrão**
```typescript
// app/page.tsx
export default function Home() {
  return (
    <div>
      <Hero />  {/* Server Component */}
    </div>
  );
}
```

**Client Components quando Necessário**
```typescript
// components/quiz/QuizContainer.tsx
'use client';

import { useState } from 'react';

export function QuizContainer() {
  const [step, setStep] = useState(0);
  return <div>...</div>;
}
```

**Component Naming**
```typescript
// ✅ PascalCase em files e exports
// components/quiz/QuizStep.tsx
export function QuizStep() { }

// ✅ Folder = kebab-case
// components/sections/hero-section/

// ✅ Hooks = camelCase
// lib/hooks/useQuizState.ts
```

**Props Typing**
```typescript
// ✅ Bom
interface QuizStepProps {
  stepNumber: number;
  onNext: (answers: QuizAnswers) => void;
  loading?: boolean;
}

function QuizStep({ stepNumber, onNext, loading = false }: QuizStepProps) {
  return <div>...</div>;
}

// ❌ Ruim
function QuizStep(props: any) { }
```

### Styling

**Tailwind CSS Only**
```typescript
// ✅ Bom
<button className="bg-orange-heat hover:bg-orange-600 px-4 py-2 rounded">
  Próximo
</button>

// ❌ Ruim
<button style={{ backgroundColor: '#F97316' }}>
  Próximo
</button>
```

**Mobile-First Responsive**
```typescript
// ✅ Bom: mobile primeiro, depois desktop
<div className="px-4 md:px-8 lg:px-16">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">Título</h1>
</div>

// ❌ Ruim: comça grande no desktop
<div className="px-16 sm:px-8">
```

**Dark Mode**
```typescript
// ✅ Bom
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Conteúdo
</div>

// ❌ Ruim
<div className="bg-white text-gray-900">
  (sem suporte a dark mode)
</div>
```

### Validation

**Zod Schemas em lib/validation.ts**

```typescript
// ✅ Bom
import { z } from 'zod';

export const leadSchema = z.object({
  nome: z.string().min(3, "Nome mínimo 3 caracteres"),
  whatsapp: z.string().regex(/^55\d{10,11}$/, "WhatsApp inválido"),
  bairro: z.string().min(3),
});

export type Lead = z.infer<typeof leadSchema>;

// Em API route:
const data = leadSchema.parse(body); // throw erro se inválido
```

**Validar Sempre no Backend**
```typescript
// ❌ Nunca confie em validação client
// frontend: type="number" maxLength="10"
// backend: parseInt(value) sem checar

// ✅ Backend SEMPRE valida
const validated = leadSchema.parse(req.body);
if (!validated.success) return Response.json({ error: ... }, { status: 400 });
```

### Naming Conventions

```typescript
// ✅ Variables: camelCase
const leadId = "lead_abc123";
const isOpen = true;
const maxRetries = 3;

// ✅ Constants: UPPER_CASE
const MAX_RETRIES = 3;
const DEFAULT_TIMEZONE = "America/Bahia";
const API_BASE_URL = "https://api.example.com";

// ✅ Functions: camelCase
function formatWhatsApp(number: string): string { }
const getBusinessHours = () => { };

// ✅ Components: PascalCase
function QuizContainer() { }
function LeadForm() { }

// ✅ Files: kebab-case
// components/quiz-container/
// lib/business-hours.ts

// ✅ Database fields: snake_case (Prisma)
model Lead {
  id String
  nome String
  created_at DateTime
}

// ❌ Evite
const leadID = ".."; // ID em maiúscula
const fetch_data = () => {}; // snake_case em função
const quizContainer = class { }; // minúscula em class
const MY_VAR = 123; // const tudo maiúscula
```

### No Magic Numbers

```typescript
// ❌ Ruim
const price = amount * 0.85; // qual é o 0.85?
const timeout = 5000; // por que 5 segundos?

// ✅ Bom
const DISCOUNT_RATE = 0.15; // 15% discount
const PRICE_WITH_DISCOUNT = amount * (1 - DISCOUNT_RATE);
const API_TIMEOUT_MS = 5000;
```

### Comments

**Português em Comentários**
```typescript
// ✅ Bom
// Formata número para WhatsApp internacional
function formatWhatsApp(number: string): string {
  // Remove caracteres especiais
  const cleaned = number.replace(/\D/g, '');
  // Garante formato: 55 + DDD + 9 dígitos
  return `55${cleaned.slice(-11)}`;
}

// ❌ Ruim
// format whatsapp
function formatWhatsApp(number: string) {
  return number.replace(/\D/g, '');
}
```

**Avoid Obvious Comments**
```typescript
// ❌ Ruim (óbvio)
// Incrementa counter
counter++;

// ✅ Bom (explica por quê)
// Incrementa contador de tentativas de conexão para retry
connectionAttempts++;
```

---

## 🧪 Testing & Validation

### Before Committing

```bash
# 1. Lint + format check
npm run lint

# 2. TypeScript check
npm run typecheck

# 3. Build para produção
npm run build

# Tudo passou? Commit!
git commit -m "feat: xyz"
```

**CI/CD automatiza também**, mas local é mais rápido.

---

## 🔄 Pull Request Process

### 1. Crie Branch
```bash
git checkout -b feat/quiz-validation
```

### 2. Faça Mudanças
```bash
# Edit files, commit regularly
git commit -m "feat: add quiz validation"
git commit -m "fix: handle edge case"
```

### 3. Validate Localmente
```bash
npm run lint && npm run typecheck && npm run build
```

### 4. Push & Create PR
```bash
git push origin feat/quiz-validation
# GitHub UI: create PR
```

### 5. Vercel Cria Preview URL
- Automático em https://vercel.com/dashboard
- Teste em mobile + desktop
- Verifique Lighthouse (deve ser ≥90)

### 6. Request Review
- Tag responsible developer
- Link para preview URL
- Descreva mudança

### 7. Address Feedback
```bash
# Se feedback pedir mudança:
git commit -m "refactor: simplify validation logic"
git push origin feat/quiz-validation
# PR atualiza automaticamente
```

### 8. Merge
```bash
# Via GitHub UI
# "Squash and merge" para histórico limpo
```

### 9. Vercel Deploys Automaticamente
```bash
# main branch = produção
# Leva 2-3 min
# Verifique https://vercel.com/dashboard
```

---

## 🚫 Code Review Checklist

Quando revisar PR, verifique:

- [ ] **Types:** TypeScript strict mode, sem `any`
- [ ] **Validação:** Zod em todos inputs (backend)
- [ ] **Tests:** Funciona localmente? Vercel preview OK?
- [ ] **Performance:** Lighthouse ainda ≥90?
- [ ] **Accessibility:** WCAG AA compliance mantido?
- [ ] **Naming:** Variáveis/funções em camelCase, componentes PascalCase
- [ ] **Comments:** Português, explicam por quê (não óbvio)
- [ ] **LGPD:** Nenhum PII em logs?
- [ ] **Security:** Nenhuma entrada não-validada?
- [ ] **Copy:** Português correto, sem typos?
- [ ] **Git:** Commits claros, mensagens em inglês?

---

## 📊 Formatting

### Prettier (Auto-Format)
```bash
# Format arquivo
npx prettier --write app/page.tsx

# Check all
npm run lint
```

**Config:** `.prettierrc.json`
- Print width: 80
- Tabs: false (2 spaces)
- Semicolons: true
- Single quotes: false

### ESLint
```bash
# Check
npm run lint

# Fix auto (quando possível)
npx eslint . --fix
```

**Config:** `.eslintrc.json`
- TypeScript + React rules
- Accessibility (a11y)
- Zero console.log em produção

---

## 🔒 Security Review

### Before Merging Check
- [ ] Nenhuma senha/API key em código
- [ ] Nenhuma `.env` file commitado
- [ ] SQL injection prevention (Prisma ORM)
- [ ] XSS prevention (React auto-escapes)
- [ ] Rate limiting em endpoints públicos
- [ ] LGPD: audit logs para data access

---

## 📚 Resources

- **Next.js Docs:** https://nextjs.org/docs
- **TypeScript:** https://www.typescriptlang.org
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Prisma:** https://www.prisma.io/docs
- **Zod:** https://zod.dev
- **React Patterns:** https://react.dev

---

## ❓ Perguntas?

- Abra **GitHub Issue** com `[QUESTION]` prefix
- ou email: tech@suaempresa.com

---

## 🎉 Obrigado!

Sua contribuição faz o projeto melhor. Bem-vindo ao squad!

**Desenvolvido por Squad de 12 Agentes — Anthropic Claude Code**
