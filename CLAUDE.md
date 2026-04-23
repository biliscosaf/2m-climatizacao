# Agência Digital Brasileira - Squad de 12 Agentes

Este é um **squad completo de 12 agentes especializados** para automatizar a produção de **sites institucionais, landing pages e lojas virtuais (e-commerce)** para clientes brasileiros.

## Contexto de Negócio

- **Tipo de empresa:** Agência digital brasileira atendendo PMEs
- **Produtos:** Sites institucionais, landing pages, lojas virtuais (e-commerce)
- **Foco:** Qualidade, rapidez, conformidade LGPD, performance otimizada
- **Público:** Pequenas e médias empresas (PME) de diversos setores

## Stack Padrão (Recomendado)

```
Frontend:       Next.js 14+ (App Router)
Linguagem:      TypeScript (strict mode)
Estilos:        Tailwind CSS + shadcn/ui
Banco de dados: PostgreSQL + Prisma ORM
Auth:           NextAuth.js (se necessário)
Validação:      Zod
Animações:      Framer Motion
Deploy:         Vercel
Pagamentos:     Mercado Pago (BR), Stripe (INT), Pagar.me (fallback)
Frete:          Melhor Envio (padrão), Correios (fallback)
Analytics:      Vercel Analytics (LGPD-friendly)
Error tracking: Sentry
```

## Stack Alternativa (Para Clientes Leigos)

```
CMS:            WordPress
E-commerce:     WooCommerce
Facilidade:     Muito alta (cliente consegue editar tudo)
Performance:    Menor que Next.js
Deploy:         Hospedagem padrão WordPress
```

## Regras Globais Não-Negociáveis

### 1. Linguagem
- **Código:** variáveis em inglês (convenção JavaScript), mas comentários em **pt-BR**
- **Comentários:** sempre em **português do Brasil**
- **Copy:** 100% em **pt-BR** (landing, labels, mensagens de erro, emails)
- **Commits:** mensagens em inglês (convenção git)

### 2. Performance e Acessibilidade
- **Lighthouse:** mínimo **90** em todos os 4 categories (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals:**
  - LCP (Largest Contentful Paint) < 2.5 segundos
  - FID (First Input Delay) < 100 milissegundos
  - CLS (Cumulative Layout Shift) < 0.1
- **Acessibilidade:** WCAG AA mínimo (AAA é bônus)
- **Responsividade:** mobile-first (360px → 768px → 1440px)

### 3. LGPD e Segurança
- **Política de Privacidade:** obrigatória em TODA página
- **Cookie Banner:** obrigatório com opt-in granular (essential, functional, analytics)
- **Headers de Segurança:** CSP, HSTS, X-Frame-Options configurados
- **Autenticação:** senhas com bcrypt (rounds ≥ 10), tokens JWT/sessions seguras
- **Rate Limiting:** em endpoints críticos (login, checkout, contact form)
- **Validação:** Zod em TUDO (sem exceções) — nunca confiar em cliente
- **HTTPS:** certificado SSL válido obrigatório em produção
- **Logs:** nunca logar senhas, tokens, números de cartão

### 4. Padrões de Código
- **TypeScript:** strict mode SEMPRE
- **Components:** Server Components por padrão, Client Components samente para interatividade
- **Naming:** 
  - Variáveis: `camelCase`
  - Componentes: `PascalCase`
  - Pastas/files: `kebab-case`
- **No magic numbers:** constantes nomeadas
- **No hard-code:** textos em `content/` ou i18n
- **Imports:** caminhos absolutos com `@/` (tsconfig baseUrl)

### 5. E-Commerce (Se Aplicável)
- **Carrinho persistente:** cookie + database
- **Checkout:** fluxo claro (dados → endereço → frete → revisão → pagamento)
- **Pagamento:** Mercado Pago obrigatoriamente (sandbox testado antes de prod)
- **Frete:** Melhor Envio integrado com cálculo em tempo real
- **Estoque:** validação antes de confirmar pagamento (nunca oversell)
- **Pedido:** status claro (aguardando_pagamento, pago, enviado, entregue, cancelado)
- **Email:** confirmação de pedido obrigatória após pagamento

### 6. Deploy e CI/CD
- **Staging obrigatório:** testar em staging antes de produção
- **CI/CD:** GitHub Actions com lint, typecheck, build em PRs
- **Rollback fácil:** revert commit + push (automático em Vercel)
- **Monitoramento:** Sentry para errors, Analytics para performance
- **Domínio:** sempre com SSL válido

## Como Começar

### Opção 1: Novo Projeto do Zero
```bash
cd ~/agencia-ia/novo-projeto
# Chamar orchestrator com briefing:
# "Vou criar um site para Loja X (roupas femininas), prazo 30 dias, 
# orçamento R$8k, referências em ..., precisa carrinho e Mercado Pago"
```

### Opção 2: Projeto Existente
```bash
cd /path/to/existing/project
# Chamar orchestrator para revisar/melhorar
```

## Estrutura do Squad

```
.claude/agents/
├── README.md                  (este arquivo, guia de uso)
├── orchestrator.md            (coordenador mestre)
├── requirements-analyst.md    (levanta requisitos)
├── solution-architect.md      (define arquitetura)
├── ui-ux-designer.md          (design system + wireframes)
├── frontend-developer.md      (implementa UI)
├── backend-developer.md       (APIs + banco)
├── ecommerce-specialist.md    (carrinho, checkout, Mercado Pago)
├── content-seo.md             (textos, SEO, meta tags)
├── qa-engineer.md             (testes, Lighthouse)
├── security-lgpd.md           (auditoria segurança, LGPD)
├── devops-engineer.md         (deploy, CI/CD, monitoramento)
└── documentation-writer.md    (README, manual cliente)
```

## Fluxo Padrão de Um Projeto

1. **Orchestrator** recebe briefing → cria `PROJECT_STATE.md`
2. **Requirements-analyst** → `docs/briefing.md`
3. **Solution-architect** → `docs/arquitetura.md` + estrutura de pastas
4. **UI-UX-designer** + **Frontend-developer** (paralelo) → componentes + páginas
5. **Backend-developer** (paralelo) → APIs + banco de dados
6. **Ecommerce-specialist** (se loja) → carrinho + checkout + Mercado Pago
7. **Content-seo** → textos + SEO + meta tags
8. **QA-engineer** → testa tudo (responsividade, acessibilidade, performance)
9. **Security-lgpd** → auditoria segurança, LGPD compliance
10. **DevOps-engineer** → deploy em Vercel, CI/CD, monitoramento
11. **Documentation-writer** → README + manual cliente
12. **Orchestrator** confirma: **PROJETO COMPLETO ✅**

## Critérios de "Pronto para Produção"

Um projeto só vai ao ar se:

- ✅ QA-engineer validou (Lighthouse ≥ 90, responsividade OK, acessibilidade WCAG AA)
- ✅ Security-lgpd passou (zero vulnerabilidades críticas, LGPD completa)
- ✅ DevOps-engineer configurou (Vercel, domínio, SSL, CI/CD, Sentry)
- ✅ Documentação completa (README + manual cliente)
- ✅ Teste de fluxos críticos (cadastro, login, checkout se loja)
- ✅ Staging environment funcionando

## Variáveis de Ambiente Obrigatórias

```bash
# Banco de dados
DATABASE_URL=postgresql://user:pass@host/db

# Autenticação
NEXTAUTH_SECRET=random-secret-key
NEXTAUTH_URL=https://dominio.com

# Mercado Pago (se loja)
MERCADO_PAGO_ACCESS_TOKEN=PROD-xxx
MERCADO_PAGO_SANDBOX_TOKEN=TEST-xxx

# Melhor Envio (se loja)
MELHOR_ENVIO_TOKEN=xxx

# Email (confirmação de pedido, contato)
SENDGRID_API_KEY=xxx
# ou
RESEND_API_KEY=xxx

# Monitoramento
NEXT_PUBLIC_SENTRY_DSN=https://...

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=xxx
```

## Checklist de Projeto Novo

- [ ] Briefing coletado (cliente, tipo, prazo, orçamento, referências)
- [ ] PROJECT_STATE.md criado
- [ ] Requirements-analyst: docs/briefing.md
- [ ] Solution-architect: docs/arquitetura.md + pastas
- [ ] UI-UX-designer: design-system.md + wireframes
- [ ] Frontend: componentes e páginas
- [ ] Backend: APIs e banco de dados
- [ ] (Se loja) Ecommerce: carrinho, checkout, Mercado Pago
- [ ] Content-SEO: textos, meta tags, schema.org
- [ ] QA: Lighthouse ≥ 90, responsividade OK, acessibilidade OK
- [ ] Security-LGPD: zero vulns, política + banner
- [ ] DevOps: deploy em Vercel, CI/CD, domínio, SSL
- [ ] Documentation: README + manual cliente
- [ ] Orchestrator: projeto validado e entregável

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # servidor local Next.js
npm run build           # build para produção
npm run start           # rodar build em produção
npm run lint            # ESLint
npm run typecheck       # TypeScript check
npm run format          # Prettier (se configurado)

# Banco de dados (Prisma)
npx prisma db push     # aplicar schema ao banco
npx prisma generate    # gerar tipos
npx prisma studio     # UI para explorar banco
npx prisma migrate ... # criar migration

# Git
git checkout -b feat/nova-feature    # nova feature
git commit -m "feat: descrição"      # commit
git push origin feat/...             # push para PR

# Deploy
git push origin main   # auto-deploy em Vercel
git revert commit-id && git push    # rollback
```

## Entrar em Contato

- **Orchestrator:** é seu ponto de contato principal
- **Documentação:** leia os arquivos em `.claude/agents/`
- **Problemas:** orchestrator decide se pergunta ao usuário ou resolve com outro agente

---

**Squad completo. 12 agentes especializados. Next.js + TypeScript + Tailwind + Prisma.**  
**LGPD, Mercado Pago, Melhor Envio, Lighthouse ≥ 90, Vercel, GitHub Actions.**  
**Linguagem: 100% português do Brasil.**  
**Pronto para entregar projetos de qualidade.**

Versão 1.0 — Março de 2026.
