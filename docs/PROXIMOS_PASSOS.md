# Próximas Ações — Soluções 2M Climatização

**Status:** ✅ Site em produção (https://solucoes-2m-climatizacao.vercel.app)  
**Data:** 2026-04-23

---

## 1. Configurar Banco de Dados em Produção ⚠️ CRÍTICO

### ⚠️ Bloqueador Atual
- O site usa SQLite (`file:./dev.db`) em produção — não funciona em Vercel
- Banco é resetado a cada deploy — **dados de leads são perdidos**
- **Ação:** Criar PostgreSQL em Vercel e configurar DATABASE_URL

### Passo a Passo

#### 1.1 Criar Instância PostgreSQL no Vercel
```bash
# 1. Ir para: https://vercel.com/dashboard/integrations/postgres
# 2. Clicar em "Create Database"
# 3. Nomear: "2m-climatizacao-db"
# 4. Selecionar região: "us-east-1" (padrão)
# 5. Clicar "Create"

# Você receberá DATABASE_URL como:
# postgresql://user:password@host:5432/dbname?sslmode=require
```

#### 1.2 Adicionar DATABASE_URL no Vercel Dashboard
```bash
# 1. Ir para: https://vercel.com/dashboard/[seu-projeto]/settings/environment-variables
# 2. Clicar "Add New"
# 3. Nome: DATABASE_URL
# 4. Valor: (copiar do passo 1.1)
# 5. Selecionar: Production, Preview, Development
# 6. Clicar "Save"
```

#### 1.3 Rodar Migrações do Prisma
```bash
# Localmente:
vercel env pull                    # Baixar env vars do Vercel
npx prisma migrate deploy         # Rodar migrations em produção

# Ou via Vercel CLI:
vercel env list                    # Ver variáveis configuradas
```

#### 1.4 Validar Conexão
```bash
# Testar se banco está conectado:
curl https://solucoes-2m-climatizacao.vercel.app/api/business-hours

# Resposta esperada:
# {"hours": [...], "isOpen": true/false}
```

---

## 2. Configurar Variáveis de Ambiente Reais 🔑

### Variáveis Requeridas no Vercel Dashboard

| Variável | Tipo | Valor Atual | Ação |
|----------|------|-------------|------|
| `WHATSAPP_NUMBER` | String | `5571999999999` (dummy) | ⚠️ Substituir por número real |
| `NEXT_PUBLIC_FB_PIXEL_ID` | String | `PIXEL_ID_AQUI` | ⚠️ Adicionar Facebook Pixel real |
| `FB_CONVERSIONS_API_TOKEN` | String | `TOKEN_AQUI` | ⚠️ Token API do Facebook |
| `RESEND_API_KEY` | String | `re_fake_key...` | ⚠️ Chave real do Resend |
| `DATABASE_URL` | String | `file:./dev.db` | ✅ Já configurado (ver seção 1) |

### 2.1 WhatsApp
```
Formato: 55 + DDD + 9 + NNNNN-NNNN
Exemplo: 5571999887766

Ir em: https://vercel.com/dashboard/[projeto]/settings/environment-variables
- Nome: WHATSAPP_NUMBER
- Valor: 55[seu-número]
```

### 2.2 Facebook Pixel (opcional)
Se quer rastrear conversões via Facebook:

```
1. Ir para: https://business.facebook.com/
2. Settings → Data Sources → Web Pixels
3. Copiar Pixel ID
4. No Vercel Dashboard:
   - NEXT_PUBLIC_FB_PIXEL_ID: [seu-pixel-id]
   - FB_CONVERSIONS_API_TOKEN: [seu-token]
```

### 2.3 Email (Resend)
Para enviar notificações de leads por email:

```
1. Ir para: https://resend.com/api-keys
2. Criar nova chave API
3. Copiar chave
4. No Vercel Dashboard:
   - RESEND_API_KEY: [sua-chave]
5. Testar: POST /api/lead com email válido
```

---

## 3. Testes de Produção 🧪

### 3.1 Fluxo Completo do Quiz
```bash
1. Abrir: https://solucoes-2m-climatizacao.vercel.app
2. Clicar em "Iniciar Quiz" ou scroll até quiz
3. Responder 5 perguntas:
   - Tipo de serviço
   - Capacidade do ar
   - Localização
   - Urgência
   - Dados de contato
4. Clicar "Obter Orçamento"
5. ✅ Deve receber mensagem "Lead capturado com sucesso"
6. ✅ WhatsApp deve abrir com mensagem
7. ✅ Email deve chegar na caixa de entrada
```

### 3.2 Validar Links WhatsApp
```bash
# iOS e Android
1. Acessar site no celular
2. Clicar botão WhatsApp flutuante
3. ✅ Deve abrir WhatsApp com mensagem pré-preenchida
4. Testar em iPhone e Android separadamente
```

### 3.3 Verificar Email de Notificação
```bash
1. Responder quiz com seu email
2. ✅ Deve receber email em até 2 minutos
3. Verificar: assunto, conteúdo, links
4. Testar com 2-3 emails diferentes
```

### 3.4 Auditoria Lighthouse
```bash
1. Abrir: https://web.dev/measure/
2. Entrar URL: https://solucoes-2m-climatizacao.vercel.app
3. Aguardar análise
4. Verificar scores:
   - Performance: ≥90
   - Accessibility: ≥90
   - Best Practices: ≥90
   - SEO: ≥90
```

### 3.5 Acessibilidade WCAG AA
```bash
1. Usar: https://www.axe-devtools.com/ (Chrome)
2. ou: https://wave.webaim.org/
3. Verificar: sem erros críticos
4. Testar navegação via teclado (Tab, Enter)
```

---

## 4. Domínio Personalizado (Opcional) 🌐

Se quer usar um domínio próprio (ex: www.2m-climatizacao.com.br):

### 4.1 Adicionar Domínio no Vercel
```bash
1. Ir para: https://vercel.com/dashboard/[projeto]/settings/domains
2. Clicar "Add Domain"
3. Entrar seu domínio
4. Copiar registros de DNS fornecidos
```

### 4.2 Configurar DNS (no seu registrador)
```bash
# Tipos de registro necessários:
# CNAME: www → cname.vercel-dns.com
# A: @ → 76.76.19.165
# AAAA: @ → 2610:7d5:3:1::1
# TXT: @ → v=spf1 include:sendgrid.net ~all (se usar SendGrid)

# Exemplos de registradores:
# - Registro.br (CNPJ obrigatório)
# - GoDaddy
# - Hostinger
# - NameCheap
```

### 4.3 SSL/TLS
```bash
✅ Vercel cria certificado automaticamente após DNS sincronizar
   (leva até 24-48 horas)
```

### 4.4 Atualizar NEXT_PUBLIC_SITE_URL
```bash
1. No Vercel Dashboard → Environment Variables
2. Adicionar/editar: NEXT_PUBLIC_SITE_URL
3. Valor: https://www.seu-dominio.com.br
4. Deploy automático acontece
```

---

## 5. Monitoramento e Manutenção 📊

### 5.1 Ver Leads Capturados
```bash
# Banco de dados via Vercel Postgres Console:
1. https://vercel.com/dashboard/integrations/postgres
2. Selecionar banco: "2m-climatizacao-db"
3. Abrir "Data Studio"
4. Executar query:
   SELECT * FROM leads ORDER BY created_at DESC LIMIT 50;
```

### 5.2 Analytics e Performance
```bash
# Vercel Analytics (automático):
https://vercel.com/dashboard/[projeto]/analytics

# Sentry (se configurado):
https://sentry.io/organizations/2m-climatizacao/

# Logs de erro:
https://vercel.com/dashboard/[projeto]/logs
```

### 5.3 Alertas e Monitoramento
```bash
# Uptime monitoring (recomendado):
- Better Uptime (https://betterstack.com/)
- Statuspage.io
- PingDom

# Configurar alertar para:
- Site fora do ar
- Erros 5xx
- Performance degradada
```

---

## 6. Checklist Final ✅

### Antes de Considerar "Pronto para Produção"
- [ ] PostgreSQL configurado e sincronizado
- [ ] Todos os leads sendo salvos no banco
- [ ] WhatsApp number configurado e testado
- [ ] Email notifications funcionando
- [ ] Lighthouse scores ≥90 em todas as categorias
- [ ] Teste de acessibilidade WCAG AA passou
- [ ] URLs de domínio personalizado configuradas (se aplicável)
- [ ] Backup diário de banco de dados habilitado
- [ ] Monitoramento ativo (uptime + errors)

### Depois de Pronto
- [ ] Comunicar URL de produção aos clientes
- [ ] Atualizar Google Business Profile
- [ ] Enviar campanha de launch nas redes sociais
- [ ] Configurar Google Analytics 4
- [ ] Solicitar avaliações de clientes que passarem pelo quiz

---

## 7. Contato e Suporte

**Plataforma:** Vercel  
**Dashboard:** https://vercel.com/dashboard  
**Documentação:** https://vercel.com/docs  
**Suporte:** https://vercel.com/support

**Banco de Dados:** Vercel Postgres  
**Documentação:** https://vercel.com/docs/storage/vercel-postgres  

**Email:** Resend  
**Dashboard:** https://resend.com  
**Documentação:** https://resend.com/docs

---

**Última Atualização:** 2026-04-23  
**Status:** ✅ Pronto para Configuração Final
