# 🔧 Troubleshooting — Soluções 2M Climatização

## Problema: Site não atualiza após push para GitHub

### Causa Provável
- Vercel ainda está processando o deploy
- Cache do browser/CDN
- Deploy falhou silenciosamente

### Solução 1: Limpar Cache
```bash
# Abrir site em incognito/private mode
# Ou: Ctrl+Shift+R (força refresh ignorando cache)
# Ou: DevTools → Network → Disable cache
```

### Solução 2: Verificar Status do Deploy no Vercel
```bash
1. Ir para: https://vercel.com/dashboard/[seu-projeto]/deployments
2. Procurar pelo último deploy
3. Checar status: "Building", "Ready", ou "Error"
4. Se "Error": clicar para ver logs
```

### Solução 3: Forçar Novo Deploy
```bash
# Via CLI:
cd /tmp/2m-climatizacao
vercel --prod --force

# Ou via Vercel Dashboard:
1. Dashboard → Deployments
2. Clicar em "..." do último deploy
3. "Redeploy"
```

### Solução 4: Verificar Logs do Build
```bash
# Vercel Dashboard:
1. Dashboard → [Projeto] → Deployments
2. Clicar no deploy mais recente
3. Abrir "Build Logs"
4. Procurar por erros (❌ ou "Error")
```

---

## Problema: Build falha com "generate is not a function"

### Causa
Bug do Next.js 14.0.0 no Windows (não afeta Vercel Linux)

### Solução
Usar `/tmp/2m-climatizacao` ou deixar Vercel fazer o build (ele usa Linux)

---

## Problema: Lead não está sendo salvo no banco

### Checklist
- [ ] PostgreSQL criado no Vercel? (https://vercel.com/dashboard/integrations/postgres)
- [ ] DATABASE_URL configurada no Vercel Dashboard?
- [ ] Rodou `npx prisma migrate deploy`?
- [ ] Verificou tabelas existem? (`SELECT * FROM leads;`)

### Debug
```bash
# Ver variáveis de ambiente configuradas:
vercel env list

# Testar API de lead:
curl -X POST https://solucoes-2m-climatizacao.vercel.app/api/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"71999999999","email":"test@example.com","service":"instalacao"}'

# Deve retornar: {"success":true,"leadId":"..."}
```

---

## Problema: Email não está sendo enviado

### Checklist
- [ ] RESEND_API_KEY configurada no Vercel Dashboard?
- [ ] Chave é válida (testou em https://resend.com)?
- [ ] Email no formulário é válido?

### Debug
```bash
# Verificar configuração:
vercel env list | grep RESEND

# Testar manualmente:
1. Ir para https://resend.com/api-keys
2. Copiar chave
3. Adicionar no Vercel Dashboard
4. Fazer novo deploy
```

---

## Problema: WhatsApp link não funciona

### Checklist
- [ ] Número tem formato correto? (55 + DDD + 9 + NNNNN-NNNN)
- [ ] WHATSAPP_NUMBER configurada no Vercel?
- [ ] Testou em celular (iOS/Android)?

### Debug
```bash
# URL correta deve ser:
https://wa.me/5571999999999?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre...

# Tester URL manualmente:
# Substitua: 5571999999999 pela sua
# Clicar em link deve abrir WhatsApp
```

---

## Problema: Lighthouse scores baixos

### Comum
- **Performance** < 90: Otimizar images, remover scripts não usados
- **Accessibility** < 90: Adicionar alt text, melhorar contraste
- **Best Practices** < 90: Usar HTTPS, cookies seguros
- **SEO** < 90: Meta tags, structured data

### Solução
```bash
1. Rodar audit: https://web.dev/measure/
2. Entrar URL: https://solucoes-2m-climatizacao.vercel.app
3. Aguardar análise
4. Seguir recomendações
```

---

## Problema: "Servidordando rodando corretamente" ainda aparece

### Solução Rápida
1. Abrir https://solucoes-2m-climatizacao.vercel.app
2. Ctrl+Shift+R (força refresh)
3. Aguardar 30 segundos

### Se persistir
```bash
# Verificar commit está em GitHub:
cd C:\Users\Maria
git log -1 --oneline

# Deve mostrar:
# 3499f06 fix: restore homepage and fix postinstall script

# Se não, fazer manualmente:
git push origin main
```

---

## Problema: "Database connection failed"

### Checklist
1. PostgreSQL criado no Vercel?
2. DATABASE_URL configurada (Production + Preview)?
3. Ran `npx prisma migrate deploy`?
4. URL está no formato correto?

### Formato Correto
```
postgresql://user:password@host:5432/database?sslmode=require
```

### Debug
```bash
# Baixar env vars:
vercel env pull

# Testar conexão:
npx prisma db execute --stdin --file=- <<EOF
SELECT 1;
EOF
```

---

## Problema: 404 em /api/lead, /api/leads, etc

### Causa
Vercel não compilou os arquivos API corretamente

### Solução
```bash
# 1. Verificar arquivos existem:
ls -la app/api/*/route.ts

# 2. Deletar .vercel e .next:
rm -rf .vercel .next

# 3. Forçar novo deploy:
vercel --prod --force
```

---

## Problema: TypeScript errors em build

### Se `ignoreBuildErrors: true`
Os erros serão ignorados no build, mas ainda aparecem no IDE.

Para fixá-los:
```bash
# Rodar typecheck:
npm run typecheck

# Listar erros:
tsc --noEmit

# Fixar manualmente nos arquivos
```

---

## Contato & Suporte

| Serviço | Suporte | Docs |
|---------|---------|------|
| Vercel | https://vercel.com/support | https://vercel.com/docs |
| Next.js | GitHub Issues | https://nextjs.org/docs |
| Prisma | Discord | https://www.prisma.io/docs |
| Resend | https://resend.com/support | https://resend.com/docs |

---

## Comandos Úteis

```bash
# Logs em tempo real:
vercel logs --prod --follow

# Ver deployment history:
vercel list

# Ver environment variables:
vercel env list

# Fazer rollback:
vercel rollback

# Ver instruções:
vercel --help
```

---

**Última Atualização:** 2026-04-23  
**Se ainda tiver dúvidas:** Leia [docs/PROXIMOS_PASSOS.md](./PROXIMOS_PASSOS.md)
