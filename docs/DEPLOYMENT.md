# Deployment Guide — Soluções 2M Climatização

Guia completo para deploy, monitoramento e operações.

---

## 📊 Ambientes

### Development (Local)
```bash
npm run dev
# http://localhost:3000
# Database: SQLite local (dev.db)
# Hot reload habilitado
```

**Usado para:**
- Desenvolvimento local
- Testes rápidos
- Debugging

### Staging (Preview — Vercel)
```
https://<branch>.2m-climatizacao.vercel.app
```

**Características:**
- Auto-deploy para cada PR
- Database: Vercel Postgres (preview)
- URL válida por 7 dias após PR fechado
- Idêntico à produção, sem dados reais

**Usado para:**
- Teste de features
- Validação de design
- Performance check
- Code review

### Production (Vercel)
```
https://2m-climatizacao.vercel.app
(enquanto domínio não configurado)

https://seudominio.com.br
(após cliente configurar domínio)
```

**Características:**
- Auto-deploy para cada push em main
- Database: Vercel Postgres (production)
- SSL automático
- CDN global
- Backup automático

**Usado para:**
- Clientes reais
- Dados de produção
- Métricas reais

---

## 🚀 Deployment Flow

### 1. Desenvolvimento Local

```bash
# Create branch
git checkout -b feat/quiz-validation

# Trabalhe normalmente
npm run dev
# Edite arquivos, hot reload atualiza

# Teste antes de commit
npm run typecheck   # TypeScript check
npm run lint        # ESLint + Prettier
npm run build       # Full build

# Commit quando tudo passar
git commit -m "feat: add quiz validation"
```

### 2. Push & Pull Request

```bash
git push origin feat/quiz-validation
```

**GitHub:**
1. Abra PR no GitHub
2. GitHub Actions roda CI automaticamente (veja abaixo)
3. Vercel cria preview URL (comentário no PR)
4. Teste em preview URL (mobile + desktop)

**CI Pipeline (.github/workflows/ci.yml):**
- ✅ Lint (ESLint + Prettier)
- ✅ TypeScript check
- ✅ Build (detecta erros)
- ✅ Testes (se houver)

**If CI fails:**
```bash
# Fix localmente
npm run lint --fix  # Auto-fix formatting
npm run typecheck   # Veja erros TypeScript

# Commit fix
git commit -m "fix: linting issues"
git push origin feat/quiz-validation
# CI roda novamente automaticamente
```

### 3. Code Review & Merge

1. Dev team revisa PR
2. Aobre feedback se necessário
3. Quando aprovado: **Merge PR** via GitHub UI
4. GitHub deleta branch automaticamente

**Merge Strategy:** Squash and merge (histórico limpo)

### 4. Auto-Deploy para Production

```
main branch atualizada
        ↓
Vercel detecta mudança
        ↓
Runs build (npm run build)
        ↓
Deploy para https://2m-climatizacao.vercel.app
        ↓
Completo em ~2-3 minutos
```

**Verifique deploy:**
1. Vercel dashboard: https://vercel.com/dashboard
2. Veja build status (verde = sucesso)
3. Teste em produção: https://2m-climatizacao.vercel.app

---

## 🔐 Environment Variables

### Local Development (.env.local)

Create file `/c/Users/Maria/.env.local`:

```bash
# Database
DATABASE_URL=file:./dev.db

# Negócio
WHATSAPP_NUMBER=5571999999999
BUSINESS_HOURS="seg-sab 08:00-18:00"

# Email (Resend)
RESEND_API_KEY=re_xxxxx_aqui

# Facebook
NEXT_PUBLIC_FB_PIXEL_ID=pixel_id_aqui
FB_CONVERSIONS_API_TOKEN=capi_token_aqui

# Analytics (Vercel) — opcional v1.0
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=xxxxx

# Sentry — setup v2
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx.sentry.io/xxxxx
```

**Notas:**
- `.env.local` é git-ignored (seguro)
- `NEXT_PUBLIC_*` = expostos ao cliente (não é segredo)
- Sem sufixo = servidor only (seguro)

### Production (Vercel Dashboard)

1. Acesse https://vercel.com/dashboard
2. Selecione projeto "2m-climatizacao"
3. Vá em **Settings** → **Environment Variables**
4. Adicione mesmas variáveis do `.env.local`

**Vercel Production Variables:**
```
DATABASE_URL=postgresql://user:pass@host/db
WHATSAPP_NUMBER=5571999999999
BUSINESS_HOURS=seg-sab 08:00-18:00
RESEND_API_KEY=re_xxxxx
NEXT_PUBLIC_FB_PIXEL_ID=pixel_id
FB_CONVERSIONS_API_TOKEN=capi_token
NEXT_PUBLIC_SENTRY_DSN=https://...
```

**Importante:**
- `DATABASE_URL` = Vercel Postgres connection string
- Criptografado em repouso
- Não aparecem em logs
- Acessíveis apenas em deploy

---

## 💾 Database Management

### Local Development (SQLite)

```bash
# Sincronize schema com database
npm run db:push
# Cria dev.db automaticamente

# Abra Prisma Studio (UI para explorar)
npm run db:studio
# http://localhost:5555

# Seed dados de exemplo
npm run db:seed
# Popula com leads/quiz progress de teste
```

### Production (Vercel Postgres)

**Setup inicial:**
1. Vercel cria Postgres automaticamente
2. Connection string em `.env` (DATABASE_URL)
3. Migrations rodam automaticamente

**Migrations:**

```bash
# Criar migration (após editar prisma/schema.prisma)
npm run db:migrate
# Cria arquivo em prisma/migrations/

# Deploy migration (automático em Vercel)
npx prisma migrate deploy
```

**Exemplo: Adicionar campo novo**

```typescript
// prisma/schema.prisma
model Lead {
  id              String    @id @default(cuid())
  nome            String
  whatsapp        String
  // ✨ Nova coluna
  email           String?   // nullable field
  createdAt       DateTime  @default(now())
}
```

```bash
# Cria migration
npm run db:migrate

# Se produção:
# Vercel executa migration automaticamente
# (ou manual: npx prisma migrate deploy)
```

**Backup & Restore:**

```bash
# Backup automático Vercel (diário)
# Dashboard: Settings → Storage → Postgres → Backups

# Restore (manual via Vercel UI)
# Cria nova database + switchover
```

**Database Health:**

```bash
# Verifique connection
npx prisma db execute --stdin < /dev/null

# Size
SELECT pg_size_pretty(pg_database_size('dbname'));

# Ativa query insights
EXPLAIN ANALYZE SELECT * FROM "Lead" WHERE createdAt > ...;
```

---

## 🔄 Rollback de Emergência

Se produção tem problema crítico:

### Opção 1: Git Revert (Preferido)

```bash
# Find last good commit
git log --oneline | head -10
# Output:
# abc1234 feat: add admin dashboard (BAD - quebrado)
# def5678 fix: quiz validation (GOOD - funciona)
# ...

# Revert último commit
git revert abc1234

# Push
git push origin main

# Vercel auto-deploys novo build
# (manda ~2-3 min)
```

### Opção 2: Git Reset (Cuidado!)

```bash
# ⚠️ Só se necessário (perde histórico)
git reset --hard def5678
git push origin main --force

# Vercel auto-deploys
```

**Depois de rollback:**
1. Investigue bug
2. Crie branch novo para fix: `git checkout -b fix/bug-name`
3. Commit fix
4. PR + review
5. Merge quando pronto

---

## 📊 Monitoring

### Vercel Dashboard

**Metrics:**
- Build success/failure
- Deployment history
- Function execution
- Database usage
- CDN cache hit rate

**Access:** https://vercel.com/dashboard/2m-climatizacao

### Vercel Analytics

**Real User Monitoring (RUM):**
- Page views
- Device type (mobile/desktop)
- Browser
- Country
- Performance metrics (LCP, CLS, etc)

**Access:** Vercel Dashboard → Analytics

**Baseline:**
- LCP <2.5s
- FID <100ms
- CLS <0.1

If higher:
1. Check Lighthouse (pageinsights)
2. Profile no DevTools
3. Open GitHub issue

### Sentry Error Tracking (v2)

**Setup:**
1. Create account: https://sentry.io
2. Create project (Next.js)
3. Get DSN: `https://xxxxx.sentry.io/xxxxx`
4. Add to `.env.local` and Vercel

**Monitoring:**
- JavaScript errors (client + server)
- API errors
- Database errors
- Performance monitoring

**Access:** https://sentry.io/organizations/your-org/

**Alerts:**
- Email on new error
- Slack integration (optional)
- PagerDuty for critical (optional)

### Custom Monitoring

**Health Check Endpoint:**
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date(),
    database: 'connected' // check DB
  });
}
```

**Monitor:**
```bash
# Check every 5 min
while true; do
  curl https://seudominio.com.br/api/health
  sleep 300
done
```

---

## 🔒 Security Checklist

Before production:

- [ ] SSL certificate valid (Vercel auto)
- [ ] CSP headers configured
- [ ] HSTS enabled
- [ ] Rate limiting active
- [ ] Database backups enabled
- [ ] API keys rotated
- [ ] LGPD audit logs working
- [ ] No PII in logs
- [ ] Zero npm vulnerabilities (`npm audit`)
- [ ] Dependencies updated

```bash
# Check vulnerabilities
npm audit

# Fix
npm audit fix
```

---

## 📈 Performance Optimization

### Lighthouse Monitoring

Monthly check:
```bash
# Local
npm run build
npx lighthouse https://localhost:3000 --view

# Or PageSpeed Insights
# https://pagespeed.web.dev/
```

**Targets:**
- Performance ≥90
- Accessibility ≥95
- Best Practices ≥95
- SEO ≥90

**If lower:**
1. Identify bottleneck (images, JS size, etc)
2. Create optimization PR
3. Merge + deploy
4. Re-test

### Database Query Optimization

```bash
# Slow query log
npm run db:studio
# Check query performance

# Or:
npx prisma db execute --stdin < query.sql
```

**Common fixes:**
- Add indexes: `@@index([createdAt])`
- Paginate results: `.skip(x).take(y)`
- Select only needed fields: `.select({ id: true, nome: true })`
- Avoid N+1: use `include` or `select` (Prisma)

---

## 🚨 Incident Response

### Step 1: Detect
- Sentry alert (email)
- Vercel dashboard (failed deployment)
- Monitoring script (health check fails)

### Step 2: Assess
- What's broken? (API? UI? Database?)
- When did it start?
- How many users affected?

### Step 3: Mitigate
- **Option A:** Rollback (fastest if bad change)
  ```bash
  git revert <bad-commit>
  git push origin main
  ```
- **Option B:** Hotfix (if rollback isn't safe)
  ```bash
  git checkout -b hotfix/critical-bug
  # Fix the bug
  git commit -m "fix: critical bug"
  git push origin hotfix/critical-bug
  # Create PR, merge immediately
  ```

### Step 4: Root Cause
- What caused the bug?
- Why didn't CI catch it?
- How to prevent next time?

### Step 5: Document
- Write post-mortem (internal)
- Update docs
- Add test to prevent recurrence

---

## 📝 Deployment Checklist

Before deploying to production:

**Code Quality:**
- [ ] npm run lint passed
- [ ] npm run typecheck passed
- [ ] npm run build succeeded
- [ ] No TypeScript errors
- [ ] All tests pass

**Testing:**
- [ ] Tested in preview URL (Vercel)
- [ ] Mobile responsive OK
- [ ] Quiz flow works end-to-end
- [ ] WhatsApp link correct
- [ ] Email notifications work

**Performance:**
- [ ] Lighthouse ≥90 all categories
- [ ] Core Web Vitals OK
- [ ] Load time <3s

**Security:**
- [ ] No API keys in code
- [ ] npm audit clean
- [ ] Rate limiting active
- [ ] HTTPS working

**Data:**
- [ ] Database backups enabled
- [ ] Connection string correct
- [ ] Migrations applied

**Monitoring:**
- [ ] Sentry DSN configured
- [ ] Vercel Analytics enabled
- [ ] Facebook Pixel firing
- [ ] Email notifications work

**Documentation:**
- [ ] CHANGELOG updated
- [ ] Docs reflect new feature (if any)
- [ ] Deploy guide updated (if needed)

---

## 🛠️ Troubleshooting

### Build Fails in Vercel

```bash
# Check locally first
npm run build

# If fails locally:
npm run typecheck  # TypeScript errors?
npm run lint       # Linting errors?

# Check node_modules corruption
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Database Connection Error

```bash
# Test connection
npm run db:studio

# Or check .env.local
cat .env.local | grep DATABASE_URL

# Vercel: check Dashboard → Storage → Postgres
```

### API Route 500 Error

```bash
# Check Sentry for stack trace
# https://sentry.io/organizations/...

# Or check Vercel function logs
# Dashboard → Functions → Logs

# Add logging to isolate issue
console.log('Before DB call:', { data });
```

### Slow Performance

```bash
# Run Lighthouse
npm run build && npx lighthouse https://localhost:3000

# Check Core Web Vitals in Vercel Analytics
# Identify bottleneck (image? JS? API?)

# Profile in Chrome DevTools
# Performance tab → Record → Analyze
```

---

## 📞 Support

- **Vercel Status:** https://vercel.com/status
- **Vercel Support:** https://vercel.com/support
- **Sentry:** https://sentry.io/
- **GitHub Issues:** https://github.com/seu-repo/issues

---

## Checklist Final

- [x] Local development setup
- [x] Preview environment (Vercel)
- [x] Production environment
- [x] Environment variables configured
- [x] Database setup
- [x] Monitoring active
- [x] Backup strategy
- [x] Rollback procedure documented
- [x] Security checklist
- [x] Performance targets

---

**Pronto para deploy! 🚀**

Desenvolvido por Squad de 12 Agentes — Anthropic Claude Code
