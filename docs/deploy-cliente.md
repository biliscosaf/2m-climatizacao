# Instruções de Deploy — Cliente

## 🎯 Objetivo
Fazer seu site ir ao ar em **seu domínio pessoal** (ex: soluces2m.com.br).

---

## 📌 Status Atual

Seu site está 100% pronto e já está acessível em:

```
🌐 https://2m-climatizacao.vercel.app
```

**Este é seu URL de testes.** Ele é público, você pode compartilhar com clientes para feedback.

---

## 🚀 Próximos Passos (3 etapas)

### **ETAPA 1: Comprar/Usar Domínio** ⏱️ 5 min

Você precisa de um domínio (ex: `soluces2m.com.br`).

**Opções:**
- **Registro.br:** https://registro.br (R$ 40-50/ano)
- **Hostgator:** https://www.hostgator.com.br (R$ 30-60/ano)
- **GoDaddy:** https://www.godaddy.com ($9-15/ano)

---

### **ETAPA 2: Conectar Domínio na Vercel** ⏱️ 2-5 min

1. Acesse: https://vercel.com/dashboard
2. Clique em seu projeto
3. Settings → Domains → Add Domain
4. Digite seu domínio (ex: seudominio.com.br)
5. Vercel mostrará CNAME: `cname.vercel-dns.com`

---

### **ETAPA 3: Atualizar DNS no Registrador** ⏱️ 5-10 min

No painel do registrador (Registro.br, Hostgator, etc):
1. Procure por "DNS" ou "Servidores de Nome"
2. Configure CNAME: `cname.vercel-dns.com`
3. Salve

---

## ⏳ Esperando Propagação DNS

Após atualizar, pode levar:
- ⚡ Alguns minutos
- ⏰ Até 48 horas (normal)

**Verificar status:** https://mxtoolbox.com/

---

## ✅ Quando Funcionar

1. Vercel Dashboard mostrará: ✅ Valid Configuration
2. Seu site carrega em: https://seu-dominio.com.br
3. HTTPS/SSL ativado automaticamente 🔒

---

## 🎨 Customizando Seu Site

### Editar Logo
- Arquivo: `/public/logo.svg`
- Substitua por seu logo em SVG ou PNG

### Editar Textos
- Pasta: `/content/`
- Arquivos como `heroText.ts`, `services.ts`, etc

### Editar Cores
- Arquivo: `tailwind.config.js`
- Modifique tema de cores

---

## 📞 Suporte

**Problema: Site não funciona após DNS**
- Aguarde 24-48h (propagação)
- Verifique em: https://mxtoolbox.com/
- Limpe cache do navegador

**Problema: Email não chega**
- Verifique RESEND_API_KEY em Vercel
- Procure em pasta SPAM

---

## ✅ Checklist

- [ ] Domínio comprado
- [ ] Acesso Vercel recebido
- [ ] Domínio adicionado em Vercel
- [ ] DNS configurado no registrador
- [ ] Propagação DNS confirmada
- [ ] Site acessível em seu domínio
- [ ] HTTPS ativado

---

**Versão:** 1.0.0 — Abril 2026
