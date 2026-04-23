# 🚀 DEPLOY INSTRUCTIONS — Soluções 2M Climatização

## Status de Preparação

✅ **Projeto pronto para deploy em Vercel**

Todos os arquivos estão configurados:
- `vercel.json` — Configuração Vercel
- `.github/workflows/ci-cd.yml` — GitHub Actions CI/CD
- `docs/deploy-report.md` — Relatório de deploy
- `docs/deploy-cliente.md` — Instruções para cliente

---

## 🎯 Objetivo

Fazer o site **Soluções 2M Climatização** ir ao ar em:
```
https://2m-climatizacao.vercel.app (preview)
https://dominio-cliente.com.br (produção, após cliente configurar)
```

---

## 📋 Pré-requisitos

Você precisa de:
1. **Conta GitHub** — https://github.com (gratuita)
2. **Conta Vercel** — https://vercel.com (gratuita)
3. **Git instalado** — https://git-scm.com

---

## 🔧 Passo 1: Criar Repositório GitHub

### Opção A: Criar novo repositório vazio em GitHub

1. Acesse: https://github.com/new
2. Nome: `2m-climatizacao`
3. Descrição: `Landing page com quiz para Soluções 2M Climatização`
4. Público ✅ (importante para Vercel)
5. **Create repository**

### Opção B: Usar um repositório existente

Se já tiver repositório, pule para **Passo 2**.

---

## 📤 Passo 2: Fazer Push em GitHub

Após criar repositório vazio em GitHub, execute localmente:

```bash
# Clone/acesse o projeto
cd /c/Users/Maria

# Configure git remote
git remote add origin https://github.com/SEU_USERNAME/2m-climatizacao.git

# Renomeie branch master → main (padrão Vercel)
git branch -M main

# Faça push
git push -u origin main
```

**Sucesso esperado:**
```
Enumerating objects: 80, done.
Counting objects: 100% (80/80), done.
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 🌐 Passo 3: Deploy em Vercel

### Via Vercel Dashboard (Recomendado)

1. **Acesse Vercel:**
   ```
   https://vercel.com/new
   ```

2. **Autorize GitHub:**
   - Clique em "Continue with GitHub"
   - Autorize Vercel acessar sua conta

3. **Importe repositório:**
   - Procure por `2m-climatizacao`
   - Clique em "Import"

4. **Configure projeto:**
   - Framework: **Next.js 14** (auto-detectado ✅)
   - Root Directory: `.` (padrão)
   - Build Command: `npm run build` ✅
   - Install Command: `npm install` ✅
   - Output Directory: `.next` (auto) ✅

5. **Clique em "Deploy"**
   - Vercel começará a fazer build
   - Aguarde ~2-3 minutos

---

## 📊 Passo 4: Configurar Banco de Dados (Vercel Postgres)

Após deploy bem-sucedido:

1. **Vercel Dashboard** → Seu projeto
2. **Storage tab** → **Create Database** → **Postgres**
3. Copie `DATABASE_URL` gerada
4. Em **Settings** → **Environment Variables**:
   - Adicione `DATABASE_URL` (valor copiado)
   - Ambientes: Production, Preview, Development

5. **Redeploy:**
   ```
   Vercel Dashboard → Deployments → Redeploy (com novas env vars)
   ```

6. **Aplicar migrations (após redeploy):**
   ```bash
   vercel env pull
   npx prisma migrate deploy
   npx prisma db seed  # (opcional)
   ```

---

## 🔐 Passo 5: Configurar Environment Variables

Em **Vercel Dashboard** → **Settings** → **Environment Variables**, adicione:

```
Production & Preview:
  DATABASE_URL = (do Vercel Postgres)
  WHATSAPP_NUMBER = 5571999999999
  NOTIFICATION_EMAIL = contato@solucoes2m.com.br
  NEXT_PUBLIC_FB_PIXEL_ID = PIXEL_ID_AQUI
  FB_CONVERSIONS_API_TOKEN = TOKEN_AQUI
  RESEND_API_KEY = re_xxxxx
  NEXT_PUBLIC_SITE_URL = https://2m-climatizacao.vercel.app
```

**IMPORTANTE:** Após adicionar variáveis, **Redeploy** o projeto!

---

## ✅ Passo 6: Validar Deploy

### Testes Básicos

```bash
# Verificar se site carrega
curl https://2m-climatizacao.vercel.app

# Ou abra no navegador:
https://2m-climatizacao.vercel.app
```

**Esperado:**
- ✅ Página carrega (HTTP 200)
- ✅ Logo aparece
- ✅ Botão WhatsApp funciona
- ✅ Cookie banner mostra
- ✅ 🔒 HTTPS ativado (cadeado no navegador)

### Testes de API

```bash
# Testar API de business hours
curl https://2m-climatizacao.vercel.app/api/business-hours

# Esperado: JSON com horários
```

---

## 🎉 Deploy Completo!

Seu site está ao vivo em:

```
🌐 https://2m-climatizacao.vercel.app
```

**Próximos passos:**
1. ✅ Cliente testa preview URL
2. ✅ Cliente configura domínio (vide `docs/deploy-cliente.md`)
3. ✅ Site ao ar em domínio final

---

## 🔄 Atualizações Futuras

Atualize o site com:

```bash
# Fazer alterações locais
# ...editar arquivos...

# Commit e push
git add .
git commit -m "feat: nova seção"
git push origin main

# Vercel faz deploy automaticamente (1-2 minutos)
```

---

## 🆘 Troubleshooting

| Problema | Solução |
|----------|---------|
| Build falha | Check logs em Vercel Dashboard → Deployments → Build Logs |
| Variáveis .env não funcionam | Redeploy após adicionar variáveis |
| Site fica branco | Verificar console do navegador (DevTools → Console) |
| Database não conecta | Validar DATABASE_URL correto em Environment Variables |

---

## 📝 Resumo de Arquivos Importantes

```
.
├── vercel.json                    # Config Vercel (framework, build, etc)
├── .github/workflows/ci-cd.yml   # GitHub Actions (auto-deploy)
├── .env.example                   # Modelo de variáveis
├── docs/
│   ├── deploy-report.md          # Status de deploy
│   ├── deploy-cliente.md         # Instruções para cliente
│   └── ...outros documentos
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Dados iniciais
└── app/
    ├── page.tsx                  # Home page
    └── api/
        ├── lead/                 # Captura leads
        └── business-hours/       # Status open/closed
```

---

## ✨ Checklist Final

- [ ] Repositório GitHub criado e com código
- [ ] Vercel project importado
- [ ] Build passou (verde em Vercel)
- [ ] Vercel Postgres database criado
- [ ] Environment variables configuradas
- [ ] Redeploy executado com novas vars
- [ ] Migrations aplicadas (npx prisma migrate deploy)
- [ ] Site carrega em preview URL
- [ ] HTTPS ativado (🔒)
- [ ] APIs respondem corretamente
- [ ] Documentação cliente atualizada
- [ ] GitHub Actions CI/CD ativado

---

## 📞 Suporte

**Dúvidas sobre Vercel:**
- Vercel Docs: https://vercel.com/docs
- Suporte Vercel: https://vercel.com/support

**Dúvidas sobre o projeto:**
- Email: gabrielnascimento2004ff@gmail.com
- GitHub Issues: https://github.com/gabrielnascimento2004/2m-climatizacao/issues

---

**Versão:** 1.0.0  
**Data:** 2026-04-24  
**DevOps Engineer** — Squad de 12 Agentes
