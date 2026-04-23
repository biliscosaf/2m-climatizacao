# 🔧 Recomendações de Segurança — Soluções 2M Climatização

**Data:** 23 de abril de 2026  
**Para:** QA-Engineer + DevOps-Engineer  
**Prioridade:** 🔴 CRÍTICA (Go-live bloqueado até correções v1)

---

## 🔴 AÇÕES BLOQUEANTES (v1 — ANTES DO GO-LIVE)

### 1. **Upgrade Next.js 14.2.0 → 14.2.1+**

**Prioridade:** 🔴 CRÍTICA  
**Risco:** DoS em produção  
**Tempo Estimado:** 30 minutos

```bash
# Passo 1: Atualizar package.json
npm install next@14.2.1

# Passo 2: Validar build
npm run build

# Passo 3: Validar tipos
npm run typecheck

# Passo 4: Validar dev
npm run dev
# Navegar em http://localhost:3000 e testar quiz

# Passo 5: Rodar npm audit novamente
npm audit --production
# Esperado: zero high/critical vulnerabilities

# Passo 6: Commit
git add package.json package-lock.json
git commit -m "fix: upgrade next.js from 14.2.0 to 14.2.1 (security patch)"
```

**Verificação:**
```bash
# Confirmar versão
npm list next
# Esperado: next@14.2.1
```

---

### 2. **Revisar GET /api/leads — Adicionar Rate Limit**

**Prioridade:** 🟡 MÉDIA  
**Risco:** Força bruta para enumerar leads  
**Tempo Estimado:** 15 minutos

**Opção A (v1 Rápida): Adicionar Rate Limiting**

```typescript
// app/api/leads/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import type { ApiResponse } from "@/lib/validation"

const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hora
const RATE_LIMIT_MAX_REQUESTS = 5 // Mais restritivo para endpoint admin

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  )
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS

  if (rateLimitMap.has(ip)) {
    const timestamps = rateLimitMap.get(ip)!
    const validTimestamps = timestamps.filter(t => t > windowStart)

    if (validTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
      return false
    }

    validTimestamps.push(now)
    rateLimitMap.set(ip, validTimestamps)
  } else {
    rateLimitMap.set(ip, [now])
  }

  return true
}

export async function GET(request: NextRequest) {
  try {
    // Verificar rate limiting
    const clientIp = getClientIp(request)
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json<ApiResponse>(
        { ok: false, error: "Muitos pedidos. Tente novamente em 1 hora." },
        { status: 429 }
      )
    }

    // Recupera apenas agregados (SEM dados pessoais)
    const totalLeads = await prisma.lead.count()
    const convertedLeads = await prisma.lead.count({
      where: { convertido: true },
    })

    // Em v2, adicionar autenticação admin para GET leads completos

    return NextResponse.json<ApiResponse>(
      {
        ok: true,
        data: {
          total: totalLeads,
          converted: convertedLeads,
          conversionRate: totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0,
        },
      },
      {
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=30",
        },
      }
    )
  } catch (error) {
    console.error("[GET /api/leads] Erro:", error)
    return NextResponse.json<ApiResponse>(
      { ok: false, error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
```

**Verificação:**
```bash
# Testar rate limiting
for i in {1..6}; do
  curl http://localhost:3000/api/leads -w "\nStatus: %{http_code}\n"
done
# Esperado: 5 × 200, 6ª = 429
```

---

### 3. **Remover Conteúdo Duplicado em Política de Privacidade**

**Prioridade:** 🟡 MÉDIA  
**Risco:** Confusão do usuário, inconsistência LGPD  
**Tempo Estimado:** 20 minutos

**Problema:** `app/politica-de-privacidade/page.tsx` tem seções 2-5 duplicadas (linhas 267-286)

```typescript
// app/politica-de-privacidade/page.tsx
// ❌ REMOVER LINHAS 267-286 (conteúdo duplicado)

// ANTES (linhas 260-288):
<hr className="my-8" />
<p className="text-xs text-gray-500">
  Esta Política de Privacidade é conforme a Lei Geral de Proteção de Dados
  (Lei nº 13.709/2018). Documento revisado em 23 de abril de 2026.
</p>
</div>
// ❌ REMOVER ISTO (linhas 267-286 — duplicado)
<p>
  Utilizamos seus dados exclusivamente para: entrar em contato e fornecer
  orçamento do serviço solicitado, e melhorar nossos serviços.
</p>

<h2>4. Seus direitos (LGPD)</h2>
<p>
  Você tem direito a: acessar, corrigir, excluir seus dados ou revogar
  consentimento a qualquer momento. Entre em contato via WhatsApp ou email
  para exercer seus direitos.
</p>

<h2>5. Contato</h2>
<p>
  Para dúvidas sobre privacidade:{" "}
  <a href={`mailto:${process.env.NOTIFICATION_EMAIL ?? "contato@solucoes2m.com.br"}`}>
    {process.env.NOTIFICATION_EMAIL ?? "contato@solucoes2m.com.br"}
  </a>
</p>
</div>
</main>

// ✅ MANTER APENAS ISTO:
</div>
</main>
```

**Verificação:**
```bash
# Contar h2 tags
grep -c "<h2>" app/politica-de-privacidade/page.tsx
# Esperado: 13 (não 17)
```

---

## 🟡 RECOMENDAÇÕES v1+ (Depois do Go-Live Inicial)

### 4. **Refinamento CSP — Remover unsafe-inline**

**Prioridade:** 🟠 ALTA  
**Risco:** XSS ainda possível com unsafe-inline  
**Tempo Estimado:** 1-2 horas  
**Para:** Frontend-developer + Content-SEO

**Atual (menos seguro):**
```javascript
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net
style-src 'self' 'unsafe-inline'
```

**Recomendado (mais seguro):**
```javascript
script-src 'self' 'nonce-<crypto-random>' https://connect.facebook.net
style-src 'self' 'nonce-<crypto-random>'
```

**Como implementar:**
1. Gerar nonce aleatório no middleware Next.js
2. Injetar nonce em `<script>` e `<style>` tags
3. Remover inline styles (usar className do Tailwind)

**Referência:**
- https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy

---

### 5. **Implementar Endpoints de Direitos LGPD (v2)**

**Prioridade:** 🟠 ALTA (v2 responsabilidade)  
**Risco:** Não ter direitos implementados pode resultar multa ANPD  
**Para:** Backend-developer

```typescript
// app/api/data-subject/access/route.ts
// GET /api/data-subject/access?email=...
// Retorna JSON com todos os dados coletados sobre o usuário

// app/api/data-subject/erasure/route.ts
// DELETE /api/data-subject/erasure?email=...
// Deleta todos os dados pessoais (GDPR/LGPD compliance)

// app/api/data-subject/portability/route.ts
// GET /api/data-subject/portability?email=...
// Retorna JSON com dados em formato estruturado (portabilidade)

// app/api/data-subject/opposition/route.ts
// POST /api/data-subject/opposition?email=...
// Marca lead como "não contatar" (opt-out permanente)
```

---

### 6. **Adicionar Sentry Error Tracking (v2)**

**Prioridade:** 🟠 ALTA  
**Risco:** Erros em produção não monitorados  
**Para:** DevOps-engineer

```typescript
// lib/sentry.ts
import * as Sentry from "@sentry/nextjs"

export function initSentry() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    integrations: [
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  })
}
```

---

### 7. **Implementar Audit Log Completo (v2)**

**Prioridade:** 🟠 ALTA  
**Risco:** Sem audit log, impossível investigar data breaches  
**Para:** Backend-developer

```typescript
// lib/audit.ts
import { prisma } from "@/lib/db"

export async function logAuditEvent(
  action: "lead_created" | "quiz_started" | "data_accessed" | "data_deleted",
  metadata: Record<string, any>,
  ipAddress?: string
) {
  await prisma.auditLog.create({
    data: {
      action,
      metadata: JSON.stringify(metadata),
      ipAddress,
      timestamp: new Date(),
    },
  })
}
```

Modelo Prisma:
```prisma
model AuditLog {
  id        String   @id @default(cuid())
  action    String   // "lead_created", "quiz_started", etc.
  metadata  String   // JSON com contexto (lead_id, email, etc.)
  ipAddress String?
  timestamp DateTime @default(now())

  @@index([action])
  @@index([timestamp])
}
```

---

### 8. **Teste de Penetração (Recomendado)**

**Prioridade:** 🟠 ALTA (post-launch)  
**Risco:** Vulnerabilidades não encontradas  
**Custo:** R$ 2k-5k BRL (agência especializada)

**Escopo Recomendado:**
- [ ] OWASP Top 10 manual testing
- [ ] SQL Injection / NoSQL Injection
- [ ] XSS (Stored + Reflected)
- [ ] CSRF attacks
- [ ] Rate limiting bypass
- [ ] Authentication bypass
- [ ] Authorization flaws
- [ ] Data exposure

**Provedores:**
- Qualysec (Brasil)
- ScanSource (Brasil)
- CyberSecure (Brasil)

---

## 📋 CHECKLIST INTEGRADO (QA + DevOps)

### QA-Engineer
- [ ] Rodar npm audit após upgrade Next.js
- [ ] Validar rate limiting (11 reqs ao /api/leads → 429)
- [ ] Verificar Lighthouse (Security score ≥ 90)
- [ ] Testar headers com curl/browser DevTools
- [ ] Validar política privacidade (sem duplicação)
- [ ] Testar cookie banner em incognito mode
- [ ] Verificar sem dangerouslySetInnerHTML inseguro

### DevOps-Engineer
- [ ] Criar Vercel Preview (staging)
- [ ] Validar headers de segurança em preview
- [ ] Configurar domínio + SSL (produção)
- [ ] Setup GitHub Actions (lint, typecheck, build)
- [ ] Configurar Sentry (se v1, senão v2)
- [ ] Validar DATABASE_URL em Vercel (Postgres production)
- [ ] Testar CI/CD pipeline
- [ ] Documentar rollback procedure

---

## 🚀 FLUXO DE DEPLOY (Após Correções)

```
1. Security-LGPD: Gera audit ✅
2. Frontend: Fix Next.js + Política privacidade
3. Frontend: Commit changes
4. QA-Engineer: Roda testes
5. DevOps: Push para Vercel Preview
6. QA: Valida em staging
7. Security-LGPD: Sign-off final
8. DevOps: Deploy para produção
9. DevOps: Monitoring + Alerts
```

---

## 📞 RESPONSABILIDADES

| Tarefa | Responsável | Prazo |
|--------|------------|-------|
| Upgrade Next.js | Frontend-developer | IMEDIATO (hoje) |
| Revisar Política | Content-SEO | Hoje |
| Rate limiting /api/leads | Backend-developer | Hoje |
| Testar tudo | QA-engineer | 2h após fixes |
| Deploy staging | DevOps-engineer | 4h |
| Sign-off final | Orchestrator | Após tudo |

---

## 📎 REFERÊNCIAS

- [OWASP Top 10 2021](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [LGPD Art. 5-34](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)
- [Next.js Security Best Practices](https://nextjs.org/docs/basic-features/security)
- [Content Security Policy MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

**Documento:** Security Recommendations  
**Status:** ✅ PRONTO PARA EXECUÇÃO  
**Data:** 23 de abril de 2026
