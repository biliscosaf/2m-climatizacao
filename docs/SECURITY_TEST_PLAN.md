# 🧪 Plano de Testes de Segurança — QA-Engineer

**Data:** 23 de abril de 2026  
**Para:** QA-Engineer  
**Tempo Estimado:** 1.5 horas  
**Ambiente:** Local (npm run dev) + Staging (Vercel preview)

---

## ✅ TESTES OBRIGATÓRIOS (v1)

### Test 1: Rate Limiting POST /api/lead (10 req/ip/hora)

**Objetivo:** Validar que exceder 10 requisições retorna 429 Too Many Requests

**Setup:**
```bash
# Terminal 1: Rodar dev server
npm run dev
# Servidor rodando em http://localhost:3000
```

**Comando de Teste:**
```bash
# Terminal 2: Executar 11 requisições do mesmo IP
for i in {1..11}; do
  echo "Requisição $i:"
  curl -X POST http://localhost:3000/api/lead \
    -H "X-Forwarded-For: 192.168.1.100" \
    -H "Content-Type: application/json" \
    -d '{
      "nome": "Teste QA",
      "whatsapp": "71999999999",
      "problema": "cheiro-ruim",
      "local": "quarto",
      "equipamento": "9000",
      "urgencia": "hoje",
      "bairro": "Barra"
    }' -w "\nStatus: %{http_code}\n\n"
  sleep 0.5
done
```

**Resultado Esperado:**
```
Requisição 1: Status: 201
Requisição 2: Status: 201
Requisição 3: Status: 201
Requisição 4: Status: 201
Requisição 5: Status: 201
Requisição 6: Status: 201
Requisição 7: Status: 201
Requisição 8: Status: 201
Requisição 9: Status: 201
Requisição 10: Status: 201
Requisição 11: Status: 429  ← BLOCKED (Too Many Requests)
```

**Critério de Sucesso:** ✅ Se requisição 11 retorna 429

---

### Test 2: Rate Limiting POST /api/quiz/progress (50 req/ip/hora)

**Objetivo:** Validar que exceder 50 requisições retorna 429

**Setup:**
```bash
# Usar mesmo dev server
```

**Comando de Teste (Python — mais rápido):**
```python
#!/usr/bin/env python3
import subprocess
import json

url = "http://localhost:3000/api/quiz/progress"
headers = ["-H", "X-Forwarded-For: 192.168.1.101"]
data = json.dumps({
    "session": "550e8400-e29b-41d4-a716-446655440000",
    "pergunta": 2,
    "respostas": {"q1": "cheiro-ruim"}
})

success_count = 0
failed_count = 0

for i in range(51):
    cmd = [
        "curl", "-X", "POST", url,
        "-H", "Content-Type: application/json",
        "-d", data,
        "-w", "%{http_code}",
        "-s"
    ] + headers
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    status = result.stdout.strip()[-3:]  # Últimos 3 caracteres (code)
    
    if status == "200":
        success_count += 1
    elif status == "429":
        failed_count += 1
    
    print(f"Requisição {i+1}: {status}")

print(f"\nResumo: {success_count}×200 (OK), {failed_count}×429 (BLOCKED)")
```

**Resultado Esperado:**
```
Requisição 1-50: 200
Requisição 51: 429
Resumo: 50×200 (OK), 1×429 (BLOCKED)
```

**Critério de Sucesso:** ✅ Requisição 51+ retorna 429

---

### Test 3: Headers de Segurança (Localhost + Staging)

**Objetivo:** Validar headers CSP, HSTS, X-Frame-Options, etc.

**Test 3.1: Local Development**
```bash
# Terminal 2: Fazer request com curl -I
curl -I http://localhost:3000/

# Resultado esperado (deve conter):
HTTP/1.1 200 OK

# Headers esperados:
X-Frame-Options: DENY ✅
X-Content-Type-Options: nosniff ✅
Referrer-Policy: strict-origin-when-cross-origin ✅
Permissions-Policy: camera=(), microphone=(), geolocation=() ✅
Strict-Transport-Security: max-age=31536000; includeSubDomains ✅
Content-Security-Policy: default-src 'self'; ... ✅
```

**Test 3.2: Staging (Vercel Preview)**
```bash
# Após deploy para Vercel preview:
curl -I https://solucoes-2m-staging.vercel.app/

# Validar mesmos headers (HSTS pode estar com max-age diferente)
```

**Critério de Sucesso:** ✅ Todos 6 headers presentes

---

### Test 4: Zod Validation — Rejeitar Dados Inválidos

**Objetivo:** POST /api/lead rejeita dados que não passam em Zod

**Test 4.1: Nome muito curto (< 2 chars)**
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "A",
    "whatsapp": "71999999999",
    "problema": "cheiro-ruim",
    "local": "quarto",
    "equipamento": "9000",
    "urgencia": "hoje",
    "bairro": "Barra"
  }' | jq .

# Resultado esperado:
{
  "ok": false,
  "error": "Dados inválidos",
  "details": [
    {
      "path": ["nome"],
      "message": "Nome deve ter pelo menos 2 caracteres"
    }
  ]
}
```

**Status Code Esperado:** 400 ✅

**Test 4.2: WhatsApp com menos de 11 dígitos**
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste QA",
    "whatsapp": "719999999",
    "problema": "cheiro-ruim",
    "local": "quarto",
    "equipamento": "9000",
    "urgencia": "hoje",
    "bairro": "Barra"
  }' | jq .

# Resultado esperado:
{
  "ok": false,
  "error": "Dados inválidos",
  "details": [
    {
      "path": ["whatsapp"],
      "message": "WhatsApp inválido. Use o formato: DDD + número (11 dígitos)"
    }
  ]
}
```

**Status Code Esperado:** 400 ✅

**Test 4.3: Problema com valor inválido (enum)**
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste QA",
    "whatsapp": "71999999999",
    "problema": "problema-invalido",
    "local": "quarto",
    "equipamento": "9000",
    "urgencia": "hoje",
    "bairro": "Barra"
  }' | jq .

# Resultado esperado: 400 com erro de enum
```

**Status Code Esperado:** 400 ✅

**Critério de Sucesso:** ✅ Todos 3 testes retornam 400 com detalhes de erro

---

### Test 5: XSS Validation — Nenhum dangerouslySetInnerHTML Inseguro

**Objetivo:** Verificar que não há XSS vectors via user input

**Test 5.1: Verificar código-fonte**
```bash
# No terminal:
grep -r "dangerouslySetInnerHTML" app/ --include="*.tsx" --include="*.ts" \
  | grep -v "JSON.stringify" \
  | grep -v node_modules

# Resultado esperado: NADA (vazio)
# Se encontrar algo sem JSON.stringify é FAIL
```

**Critério de Sucesso:** ✅ Zero matches (ou apenas JSON.stringify)

**Test 5.2: Tentar XSS no formulário (manual)**
```
1. Abrir http://localhost:3000/ em browser
2. Navegar para o quiz
3. No campo "Nome", tentar digitar: <script>alert('XSS')</script>
4. Submeter
5. Verificar que não há alert popup (XSS blocked by React sanitization)
```

**Critério de Sucesso:** ✅ Nenhum popup/alert

---

### Test 6: TypeScript Strict Mode — Build sem erros

**Objetivo:** Validar que projeto compila com strict mode

**Comando:**
```bash
npm run typecheck

# Resultado esperado:
# ✅ Type checking completed successfully (0 errors)
```

**Criterio de Sucesso:** ✅ Zero type errors

---

### Test 7: npm audit — Vulnerabilities Após Patch

**Objetivo:** Validar que npm audit mostra 0 high/critical após upgrade Next.js

**Comando:**
```bash
npm audit --production

# Resultado esperado (APÓS npm install next@14.2.1):
# 0 high severity vulnerabilities
# 0 critical severity vulnerabilities
# (may have medium/low, que são aceitáveis)
```

**Critério de Sucesso:** ✅ Zero HIGH/CRITICAL

---

### Test 8: Política de Privacidade — Carregamento e Estrutura

**Objetivo:** Validar que política carrega corretamente e tem conteúdo completo

**Test 8.1: Acessar página**
```bash
# No browser:
curl -s http://localhost:3000/politica-de-privacidade | grep "<h2>" | wc -l

# Resultado esperado: 13 (13 seções)
# Nota: Após remover duplicação (Test 9), deve ser exato 13
```

**Test 8.2: Validar links funcionais**
```bash
# Abrir em browser:
# http://localhost:3000/politica-de-privacidade
#
# Validar que:
# - Link "Política de Privacidade" no cookie banner aponta para esta página ✅
# - Link ANPD aponta para https://www.gov.br/cidadania/... ✅
# - Email privacidade@ aparece (placeholder aceitável) ✅
```

**Critério de Sucesso:** ✅ 13 h2 tags (após cleanup Test 9)

---

### Test 9: Cookie Banner — Funcionalidade

**Objetivo:** Validar que cookie banner funciona e persiste preferences

**Setup:**
```bash
# Abrir http://localhost:3000/ em modo incognito/private
# Ou limpar localStorage antes:
# F12 → Application → Local Storage → Delete All
```

**Test 9.1: Banner Aparece**
```
1. Reload página (sem cookies)
2. Validar que banner aparece no bottom ✅
3. Validar 3 botões: "Rejeitar", "Personalizar", "Aceitar tudo" ✅
```

**Test 9.2: Personalizar Preferences**
```
1. Clicar em "Personalizar"
2. Verificar que aparecem 3 checkboxes:
   - Essential (sempre checked, disabled) ✅
   - Functional (unchecked) ✅
   - Analytics (unchecked) ✅
3. Marcar "Analytics"
4. Clicar em "Salvar preferências"
5. Banner fecha ✅
```

**Test 9.3: Preferências Persistem (localStorage)**
```
1. F12 → Application → Local Storage
2. Verificar chave "cookieConsent" com valor JSON:
   {
     "essential": true,
     "functional": false,
     "analytics": true
   }
3. Reload página
4. Banner NÃO aparece (preferences salvas) ✅
```

**Test 9.4: Rejeitar All**
```
1. Limpar localStorage (nova sessão)
2. Clicar em "Rejeitar"
3. Verificar localStorage:
   {
     "essential": true,
     "functional": false,
     "analytics": false
   }
```

**Critério de Sucesso:** ✅ Todos 4 sub-testes passam

---

### Test 10: GET /api/leads — Validar Rate Limit Novo

**Objetivo:** Validar que GET /api/leads tem rate limiting (após fix backend)

**Comando (Após fix):**
```bash
# Fazer 6 requisições rápidas
for i in {1..6}; do
  curl -I http://localhost:3000/api/leads -w "Status: %{http_code}\n"
done

# Resultado esperado:
# 200 (5 vezes)
# 429 (6ª vez)
```

**Critério de Sucesso:** ✅ 6ª requisição retorna 429

---

## 🧪 TESTES COMPLEMENTARES (Lighthouse)

### Test 11: Lighthouse Security Score

**Setup:**
```bash
# Chrome DevTools:
1. F12 → Lighthouse
2. Selecionar "Performance", "Accessibility", "Best Practices", "SEO"
3. Rodar
```

**Resultado Esperado:**
- Performance: ≥ 90 ✅
- Accessibility: ≥ 90 ✅
- Best Practices: ≥ 90 ✅
- SEO: ≥ 90 ✅

**Se não atingir 90 em Security/Best Practices:**
- Investigar warnings
- Reportar ao QA-Engineer + Frontend-developer

---

## 📋 CHECKLIST COMPLETO

### Pré-Testes
- [ ] npm install (dependências instaladas)
- [ ] npm run dev (servidor rodando)
- [ ] Nenhuma erro no console

### Testes Obrigatórios
- [ ] **Test 1:** Rate Limiting POST /api/lead (10 req/ip → 429)
- [ ] **Test 2:** Rate Limiting POST /api/quiz/progress (50 req/ip → 429)
- [ ] **Test 3:** Headers segurança (6 headers presentes)
- [ ] **Test 4:** Zod validation (3 casos de erro)
- [ ] **Test 5:** XSS validation (zero dangerouslySetInnerHTML inseguro)
- [ ] **Test 6:** TypeScript strict (zero erros)
- [ ] **Test 7:** npm audit (zero HIGH/CRITICAL após patch)
- [ ] **Test 8:** Política privacidade (13 seções, links OK)
- [ ] **Test 9:** Cookie banner (funcional, persiste)
- [ ] **Test 10:** GET /api/leads rate limit (após fix)

### Testes Complementares
- [ ] **Test 11:** Lighthouse ≥ 90 (Performance, Accessibility, Best Practices, SEO)

### Testes em Staging (Vercel Preview)
- [ ] [ ] Headers de segurança em HTTPS
- [ ] Lighthouse em production
- [ ] Performance core web vitals

---

## 🚨 FAILURE CRITERIA (Bloquear PR Se)

| Teste | Fail Condition |
|-------|---|
| Test 1-2 | Taxa limiting não funciona (todas req retornam 201/200) |
| Test 3 | Faltam headers de segurança (CSP, HSTS, X-Frame-Options) |
| Test 4 | Validação Zod aceita dados inválidos (retorna 201 com erro) |
| Test 5 | Encontrado dangerouslySetInnerHTML sem JSON.stringify |
| Test 6 | TypeScript errors (tsc --noEmit falha) |
| Test 7 | npm audit mostra HIGH/CRITICAL vulnerabilities |
| Test 8 | Política privacidade não tem 13 seções ou tem erro de link |
| Test 9 | Cookie banner não aparece ou preferences não persistem |
| Test 10 | GET /api/leads sem rate limit (todas req retornam 200) |
| Test 11 | Lighthouse < 80 em qualquer categoria |

---

## 📝 TEMPLATE DE RELATÓRIO

Após completar todos os testes, preencher:

```markdown
# Relatório de Testes de Segurança — QA

**Data:** [data]
**QA-Engineer:** [nome]
**Ambiente:** Local + Staging

## Resultados

| Teste | Status | Observações |
|-------|--------|-------------|
| Test 1 (Rate Limit /api/lead) | ✅ PASS | [ou detalhes se falha] |
| Test 2 (Rate Limit /api/quiz) | ✅ PASS | |
| Test 3 (Headers) | ✅ PASS | |
| Test 4 (Zod Validation) | ✅ PASS | |
| Test 5 (XSS) | ✅ PASS | |
| Test 6 (TypeScript) | ✅ PASS | |
| Test 7 (npm audit) | ✅ PASS | Após npm install next@14.2.1 |
| Test 8 (Política) | ✅ PASS | Conteúdo duplicado removido |
| Test 9 (Cookie Banner) | ✅ PASS | |
| Test 10 (GET /api/leads) | ✅ PASS | Rate limit implementado |
| Test 11 (Lighthouse) | ✅ PASS | Todos ≥ 90 |

## Sign-Off

- **QA-Engineer:** ✅ APROVADO para produção
- **Data:** [data]
- **Observações:** [se houver]

```

---

## 📞 SUPORTE

Se algum teste falhar:
1. Consultar `docs/security-audit.md` para contexto
2. Consultar `docs/security-recommendations.md` para soluções
3. Contactar Security-LGPD ou Developer responsável

---

**Plano de Testes:** Versão 1.0  
**Criado:** 23 de abril de 2026  
**Status:** ✅ PRONTO PARA EXECUÇÃO
