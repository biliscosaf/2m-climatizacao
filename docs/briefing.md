# BRIEFING — Soluções 2M Climatização

**Versão:** 1.0  
**Data:** 2026-04-23  
**Responsável:** requirements-analyst  
**Status:** Aprovado para próxima fase  

---

## 1. Resumo Executivo

A Soluções 2M Climatização, empresa de pequeno porte sediada em Salvador-BA, necessita de uma landing page de alta conversão integrada a um quiz interativo de 5 etapas. O objetivo central é capturar leads qualificados provenientes de anúncios no Facebook Ads, filtrá-los por meio do quiz (dor, local, tipo de serviço, urgência e bairro) e encaminhar os interessados diretamente para o WhatsApp do responsável com contexto pré-preenchido. O projeto será construído em Next.js 14 com TypeScript, Tailwind CSS e Prisma (SQLite em desenvolvimento, Vercel Postgres em produção), com prazo de entrega de 14 dias a partir de 2026-04-23, ou seja, até 2026-05-07.

---

## 2. Contexto de Negócio

### 2.1 Sobre o Cliente

| Campo | Detalhe |
|-------|---------|
| **Nome** | Soluções 2M Climatização |
| **Modelo** | Solopreneur / microempresa |
| **Setor** | Serviços de ar-condicionado (instalação, manutenção, higienização) |
| **Localização** | Salvador-BA e região metropolitana |
| **Diferenciais** | Resposta rápida, atendimento personalizado, garantia dos serviços |
| **Canais atuais** | Indicações, redes sociais, anúncios Facebook |
| **Domínio** | A confirmar com o cliente (placeholder: `solucoes2m.com.br`) |

**Serviços oferecidos:**

| # | Serviço | Descrição |
|---|---------|-----------|
| 1 | Instalação de novo equipamento | Instalação completa de splits e sistemas de ar-condicionado |
| 2 | Limpeza técnica | Limpeza preventiva de filtros e serpentinas |
| 3 | Manutenção preventiva | Revisão periódica para evitar falhas |
| 4 | Reparo de emergência | Atendimento urgente para equipamentos com defeito |
| 5 | Recarga de gás | Recarga de fluido refrigerante (R-22, R-410A) |
| 6 | Higienização profunda | Limpeza com produtos bactericidas, elimina fungos e bactérias |

### 2.2 Persona Alvo

**Persona Principal — "Dona Sônia"**

| Atributo | Detalhe |
|----------|---------|
| **Faixa etária** | 30 a 60 anos |
| **Classe social** | B e C (renda familiar R$ 3.000 a R$ 12.000/mês) |
| **Localização** | Salvador e região metropolitana (Lauro de Freitas, Camaçari, Simões Filho) |
| **Perfil** | Proprietária ou inquilina de imóvel residencial ou comercial |
| **Dispositivo** | Smartphone Android (maioria), iOS (minoria relevante) |
| **Comportamento** | Consome conteúdo no Facebook e Instagram; pesquisa preço antes de decidir |
| **Motivação** | Calor insuportável em Salvador, equipamento quebrado, cheiro ruim no ar |
| **Dor principal** | Não sabe quanto vai custar; tem medo de contratar errado e pagar caro |
| **Gatilho de compra** | Preço estimado + agilidade de resposta + sensação de confiança |
| **Objeções comuns** | "Vou pesquisar mais", "Quero saber o preço antes", "Tenho medo de golpe" |

**Persona Secundária — "Sr. Edilson" (comercial)**

| Atributo | Detalhe |
|----------|---------|
| **Perfil** | Dono de pequeno comércio (loja, clínica, escritório) em Salvador |
| **Motivação** | Manutenção do ambiente de trabalho; necessidade de conformidade com vigilância sanitária |
| **Urgência** | Alta — cada dia parado gera prejuízo |
| **Ticket médio** | Maior que o residencial |

### 2.3 Problema do Cliente

A Soluções 2M depende de indicações e anúncios pagos no Facebook, mas não possui uma página estruturada para converter esse tráfego pago em contatos qualificados. Sem uma landing page com quiz, os leads chegam pelo WhatsApp sem contexto, forçando o técnico a fazer triagem manual demorada. Com a landing page e o quiz, o lead já informa sua necessidade antes de entrar em contato, reduzindo o tempo de negociação e aumentando a taxa de fechamento.

**KPIs esperados:**

| Métrica | Meta |
|---------|------|
| Taxa de conclusão do quiz | >= 40% dos que iniciam |
| Taxa de clique no link WhatsApp (pós-resultado) | >= 60% dos que concluem |
| Custo por lead qualificado | Documentar baseline no início, reduzir 20% em 60 dias |
| Taxa de abertura do link WhatsApp com UTM | Rastrear desde o dia 1 |

---

## 3. Objetivo Estratégico

### 3.1 Conversão Principal

**Fluxo macro:**

```
Facebook Ads
    ↓
Landing Page (Hero com CTA)
    ↓
Quiz Interativo (5 perguntas)
    ↓
Tela de Resultado (estimativa de preço + captura de nome e telefone)
    ↓
Link WhatsApp pré-preenchido com contexto do quiz
    ↓
Atendimento e fechamento pelo técnico
```

### 3.2 Por Que o Quiz Funciona Melhor que Formulário

| Aspecto | Formulário tradicional | Quiz interativo |
|---------|----------------------|-----------------|
| Comprometimento progressivo | Nenhum — campo em branco é desmotivador | Alto — cada resposta cria compromisso ("já que respondi até aqui...") |
| Qualificação | O lead não sabe o que preencher | O lead informa exatamente o problema |
| Personalização | Não existe | Resultado customizado por tipo de serviço |
| Estimativa de preço | Não disponível | Mostrada no resultado, reduz objeção de custo |
| Taxa de conversão | Referência: 1-2% em frio | Referência: 3-5% com quiz contextualizado |

### 3.3 Métricas de Sucesso

| Métrica | Ferramenta de Medição | Meta |
|---------|----------------------|------|
| Lighthouse Performance | Vercel / Chrome DevTools | >= 90 |
| Lighthouse Accessibility | axe DevTools | >= 90 |
| Lighthouse Best Practices | Chrome DevTools | >= 90 |
| Lighthouse SEO | Google Search Console | >= 90 |
| LCP (Largest Contentful Paint) | Core Web Vitals | < 2.5 segundos |
| FID (First Input Delay) | Core Web Vitals | < 100 milissegundos |
| CLS (Cumulative Layout Shift) | Core Web Vitals | < 0.1 |
| Taxa de conclusão do quiz | Banco de dados / Analytics | >= 40% |
| Leads capturados / dia | Banco de dados | Documentar baseline |
| Taxa de clique no WhatsApp | UTM + Analytics | >= 60% dos que concluem |
| Taxa de abertura de email de notificação | Resend dashboard | >= 80% (notificação interna) |

---

## 4. Escopo MUST / SHOULD / COULD

### MUST — Obrigatório (sem isso, a landing não vai ao ar)

| # | Feature | Detalhe |
|---|---------|---------|
| 1 | Quiz interativo de 5 perguntas | Dor, local do equipamento, tipo de serviço, urgência, bairro |
| 2 | Tela de resultado personalizada | Estimativa de faixa de preço por tipo de serviço + captura de nome e telefone |
| 3 | Link WhatsApp pré-preenchido | Mensagem contextual com respostas do quiz; formato `wa.me/5571XXXXXXXX?text=...` |
| 4 | Lead salvo no banco de dados | Nome, telefone, respostas do quiz, timestamp, UTM source |
| 5 | Hero section | Título de impacto, subtítulo, CTA principal abrindo o quiz |
| 6 | Seção de 6 serviços | Cards com ícone, título, descrição curta |
| 7 | Galeria antes/depois | Slider comparativo com imagens (placeholders aceitos inicialmente) |
| 8 | Seção de depoimentos | 3 a 6 cards (fictícios com aviso enquanto cliente não envia reais) |
| 9 | FAQ com accordion | 6 a 8 perguntas e respostas; schema.org FAQPage |
| 10 | Botão flutuante WhatsApp | Sempre visível, em todas as seções, posição fixa inferior direita |
| 11 | Badge de horário comercial | Exibe "Aberto agora" / "Fechado" conforme horário real do servidor |
| 12 | Política de privacidade | Página `/politica-de-privacidade` LGPD-compliant |
| 13 | Termos de uso | Página `/termos-de-uso` com condições claras |
| 14 | Banner de cookies | Opt-in granular: essenciais, funcionais, analytics — aparece no primeiro acesso |
| 15 | Mobile-first responsivo | Breakpoints 360px, 768px, 1440px; testado em Android e iOS |
| 16 | Deploy público na Vercel | URL pública acessível, SSL válido |
| 17 | Lighthouse >= 90 em todos os quadrantes | Performance, Accessibility, Best Practices, SEO |

### SHOULD — Importante (agrega valor significativo; fazer se o prazo permitir)

| # | Feature | Detalhe |
|---|---------|---------|
| 1 | Facebook Pixel (client-side) | Evento `Lead` disparado após conclusão do quiz com consent |
| 2 | Facebook Conversions API (server-side) | Mesmo evento enviado pelo servidor para deduplicação |
| 3 | Mapa de área de atendimento | Leaflet.js + OpenStreetMap (sem chave de API); polígono ou marcadores dos bairros atendidos |
| 4 | Seção "Sobre a empresa" | Foto do técnico (placeholder), história de 3-4 linhas, diferenciais |
| 5 | Schema.org completo | `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList` |
| 6 | Notificação por email (Resend) | Email para o técnico a cada novo lead capturado |
| 7 | Rastreamento de abandono do quiz | Modelo `QuizProgress` no banco; salva a etapa em que o usuário abandonou |
| 8 | Acessibilidade WCAG AA+ | Navegação por teclado, `aria-label` em todos os interativos, contraste >= 4.5:1 |
| 9 | Vercel Analytics | Pageviews e eventos LGPD-friendly sem cookies de terceiros |

### COULD — Nice-to-have (versão futura; fora do escopo do prazo atual)

| # | Feature | Versão |
|---|---------|--------|
| 1 | Chat ao vivo (ex: Crisp, Tawk.to) | v2 |
| 2 | Integração com CRM (HubSpot ou Pipedrive) | v2 |
| 3 | Agendamento de visita técnica diretamente na landing | v2 |
| 4 | Dark mode | v2 |
| 5 | Internacionalização (en-US, es-ES) | v3 |
| 6 | Sentry para rastreamento de erros em produção | v2 (setup inicial no devops, ativado depois) |

---

## 5. User Journey (Mapeado)

```
[ENTRADA]
Usuário clica em anúncio no Facebook (campanha com UTM)
    ↓
[HERO]
Vê a landing page carregada em < 2.5s no celular
Lê o título de impacto e o subtítulo
Clica no CTA "Descubra o Preço do Seu Serviço" (ou similar)
    ↓
[QUIZ — ETAPA 1]
Informa qual é o problema com o ar-condicionado
(ex: "Está com cheiro ruim", "Parou de refrigerar", "Quero instalar um novo")
    ↓
[QUIZ — ETAPA 2]
Informa onde fica o equipamento
(ex: "Quarto", "Sala", "Escritório / Comércio")
    ↓
[QUIZ — ETAPA 3]
Informa o tipo/capacidade do aparelho
(ex: "Não sei", "9.000 BTUs", "12.000 BTUs", "18.000+ BTUs")
    ↓
[QUIZ — ETAPA 4]
Informa a urgência do atendimento
(ex: "Hoje!", "Essa semana", "Posso esperar")
    ↓
[QUIZ — ETAPA 5]
Informa o bairro / região
(ex: lista dos bairros de Salvador e região metropolitana)
    ↓
[TELA DE RESULTADO]
Vê estimativa personalizada de faixa de preço
Preenche nome e telefone (WhatsApp)
Clica em "Falar com o Técnico Agora"
    ↓
[WHATSAPP]
Redireciona para wa.me com mensagem pré-preenchida:
"Olá! Fiz o quiz no site e quero um orçamento. Meu problema é: [dor]. 
O equipamento fica na [local]. É um ar de [capacidade]. 
Preciso de atendimento [urgência]. Moro em [bairro]. Meu nome é [nome]."
    ↓
[FECHAMENTO]
Técnico recebe lead qualificado e fecha o orçamento diretamente no WhatsApp
```

**Pontos de abandono mapeados e mitigações:**

| Ponto de abandono | Risco | Mitigação |
|-------------------|-------|-----------|
| Hero → Quiz | Alto — CTA pouco claro | CTA grande, colorido, com microcopy de urgência |
| Quiz etapa 1-2 | Médio — usuário se cansa | Barra de progresso visual; cada etapa em tela cheia |
| Quiz etapa 3-5 | Baixo | Quiz salva progresso (QuizProgress) para análise |
| Resultado → WhatsApp | Médio — usuário abandona antes de preencher dados | Estimativa de preço visível ANTES de pedir nome/telefone |

---

## 6. Quiz: As 5 Perguntas (Detalhadas)

### Pergunta 1 — Qual é o problema?

**Texto:** "O que está acontecendo com o seu ar-condicionado?"

| Opção | Ícone | Impacto na estimativa | Por que qualifica |
|-------|-------|----------------------|-------------------|
| Está com cheiro ruim ou sujo | Nuvem com símbolo de aviso | Limpeza técnica / Higienização: R$ 120–350 | Indica manutenção; menor ticket |
| Parou de funcionar ou resfria mal | Termômetro | Reparo / Recarga de gás: R$ 180–600 | Indica reparo; ticket médio/alto |
| Quero instalar um equipamento novo | Caixa/instalação | Instalação: R$ 350–900+ | Maior ticket; lead mais valioso |
| Quero fazer manutenção preventiva | Escudo | Manutenção: R$ 150–300 | Lead consciente; fácil de fechar |

**Por que essa pergunta existe:** Define o tipo de serviço e ancora a faixa de preço do resultado. Sem ela, não há personalização.

---

### Pergunta 2 — Onde fica o equipamento?

**Texto:** "O ar-condicionado fica em qual ambiente?"

| Opção | Impacto | Por que qualifica |
|-------|---------|-------------------|
| Quarto (residencial) | Fator de acesso padrão | Perfil residencial; ticket base |
| Sala (residencial) | Fator de acesso padrão | Residencial; possível maior capacidade |
| Cozinha / Área de serviço | Fator de gordura/sujeira | Serviço mais trabalhoso = ticket maior |
| Escritório / Comércio | Fator comercial | Persona secundária; maior urgência e ticket |
| Outro | Genérico | Aciona coleta de mais informações no WhatsApp |

**Por que essa pergunta existe:** Ambiente determina dificuldade de acesso, nível de sujeira e, portanto, tempo e custo do serviço. Comercial tem urgência e ticket maiores.

---

### Pergunta 3 — Qual é o tipo/capacidade do aparelho?

**Texto:** "Você sabe a potência do seu ar-condicionado?"

| Opção | BTUs | Impacto na estimativa | Por que qualifica |
|-------|------|----------------------|-------------------|
| Não sei / não tenho certeza | — | Usar faixa média | Técnico verifica no WhatsApp |
| Pequeno (9.000 BTUs) | 9k | Serviço mais barato | Apartamentos pequenos |
| Médio (12.000 BTUs) | 12k | Faixa intermediária | Mais comum no mercado |
| Grande (18.000 BTUs) | 18k | Faixa mais cara | Salas grandes, comércios |
| Muito grande (24.000+ BTUs) | 24k+ | Ticket mais alto | Comercial / industrial leve |

**Por que essa pergunta existe:** BTUs determinam diretamente o tempo e custo do serviço. Também valida se o lead tem equipamento compatível com o serviço ofertado.

---

### Pergunta 4 — Qual é a urgência?

**Texto:** "Quando você precisa do atendimento?"

| Opção | Classificação | Impacto na estimativa | Por que qualifica |
|-------|---------------|----------------------|-------------------|
| Hoje mesmo! | Urgência máxima | Pode incluir taxa de urgência | Lead quente — prioridade de atendimento |
| Essa semana | Urgência alta | Valor padrão | Agendável; conversão alta |
| Nas próximas 2 semanas | Urgência média | Valor padrão | Agendável; retorno em nutrição |
| Estou pesquisando ainda | Urgência baixa | Valor estimado apenas | Lead frio; pode entrar em sequência de follow-up |

**Por que essa pergunta existe:** Define a temperatura do lead. "Hoje mesmo" e "essa semana" vão direto para WhatsApp com linguagem de urgência. "Pesquisando" recebe resultado com CTA mais suave.

---

### Pergunta 5 — Qual é o bairro?

**Texto:** "Em qual bairro / região você está?"

| Grupo | Exemplos | Impacto | Por que qualifica |
|-------|----------|---------|-------------------|
| Salvador central | Barra, Ondina, Pituba, Graça | Sem taxa de deslocamento | Atendimento padrão |
| Salvador periferia | Cajazeiras, Nordeste, Pau da Lima | Verificar disponibilidade | Pode incluir taxa de deslocamento |
| Região metropolitana | Lauro de Freitas, Camaçari, Simões Filho | Taxa de deslocamento | Agendamento com janela maior |
| Fora da área | Outra cidade | Redirecionar ou informar indisponibilidade | Filtra leads fora do raio de atendimento |

**Por que essa pergunta existe:** Valida se o cliente está dentro da área de cobertura. Leads fora da área podem ser descartados ou redirecionados, economizando tempo do técnico.

---

## 7. Tela de Resultado

**Objetivo:** Mostrar valor (estimativa de preço) ANTES de pedir dados pessoais — reduz fricção e aumenta a taxa de preenchimento.

**Estrutura visual da tela de resultado:**

```
┌─────────────────────────────────────────────────┐
│  Ícone de check verde + "Análise concluída!"    │
│                                                  │
│  Título: "Com base nas suas respostas..."        │
│                                                  │
│  ┌──────────────────────────────────┐           │
│  │  ESTIMATIVA DO SERVIÇO           │           │
│  │  [Tipo do serviço identificado]  │           │
│  │                                  │           │
│  │  De R$ [MIN] a R$ [MAX]          │           │
│  │  ★ Inclui deslocamento           │           │
│  │  ★ Diagnóstico gratuito          │           │
│  └──────────────────────────────────┘           │
│                                                  │
│  "Para receber orçamento exato, deixe            │
│   seu contato:"                                  │
│                                                  │
│  [Campo: Seu nome]                               │
│  [Campo: WhatsApp (com máscara)]                 │
│                                                  │
│  [BOTÃO: Falar com o Técnico Agora →]            │
│                                                  │
│  🔒 Seus dados não serão compartilhados           │
│  Link para Política de Privacidade               │
└─────────────────────────────────────────────────┘
```

**Lógica de estimativa de preço (tabela de referência):**

| Serviço | Capacidade | Faixa de preço |
|---------|------------|----------------|
| Limpeza / Higienização | 9k–12k BTU | R$ 120–250 |
| Limpeza / Higienização | 18k–24k+ BTU | R$ 200–350 |
| Manutenção preventiva | Qualquer | R$ 150–300 |
| Recarga de gás | 9k–12k BTU | R$ 180–350 |
| Recarga de gás | 18k–24k+ BTU | R$ 280–500 |
| Reparo / Diagnóstico | Qualquer | R$ 150–600 (varia com peças) |
| Instalação | 9k BTU | R$ 350–500 |
| Instalação | 12k BTU | R$ 450–700 |
| Instalação | 18k BTU | R$ 600–900 |
| Instalação | 24k+ BTU | R$ 800–1.200+ |

> Faixas são estimativas visuais para fins de conversão; o orçamento real é dado pelo técnico.

---

## 8. Seções da Landing (Ordem de Rolagem)

### Seção 1 — Hero

| Campo | Detalhe |
|-------|---------|
| **Posição** | 1ª seção, acima da dobra (above the fold) |
| **Conteúdo** | Logo, headline principal, subtítulo, CTA primário, elementos de prova social (ex: "500+ clientes atendidos") |
| **CTA** | "Descubra o Preço do Seu Serviço" — botão grande, cor de destaque |
| **Behavioral goal** | Fazer o visitante clicar no CTA em menos de 5 segundos |
| **Elementos visuais** | Imagem ou vídeo curto de fundo (ar-condicionado limpo), gradiente de marca |
| **Microcopy de urgência** | "Orçamento grátis • Atendimento hoje em Salvador" |

---

### Seção 2 — Quiz Interativo

| Campo | Detalhe |
|-------|---------|
| **Posição** | 2ª seção (abre em modal ou embeds inline) |
| **Conteúdo** | As 5 perguntas descritas na Seção 6, exibidas uma por vez com transição suave |
| **CTA por etapa** | "Próxima pergunta →" |
| **Barra de progresso** | Visual, ex: "Pergunta 2 de 5" + barra colorida |
| **Behavioral goal** | Manter o usuário até a etapa 5; minimizar abandono |
| **Acessibilidade** | Cada opção clicável com teclado; foco gerenciado entre etapas |

---

### Seção 3 — Serviços

| Campo | Detalhe |
|-------|---------|
| **Posição** | 3ª seção |
| **Conteúdo** | 6 cards (Instalação, Limpeza, Manutenção, Reparo, Recarga de Gás, Higienização Profunda) |
| **Cada card** | Ícone SVG, título, descrição de 2-3 linhas |
| **CTA** | Cada card tem link "Solicitar esse serviço" que abre o quiz na pergunta correspondente |
| **Behavioral goal** | Reforçar autoridade; dar segunda chance ao lead que não clicou no hero |

---

### Seção 4 — Antes e Depois

| Campo | Detalhe |
|-------|---------|
| **Posição** | 4ª seção |
| **Conteúdo** | Slider comparativo (drag para comparar) mostrando fotos de equipamentos antes e depois da higienização/limpeza |
| **CTA** | "Quero meu ar-condicionado assim" → abre quiz |
| **Behavioral goal** | Prova visual do serviço; despertar desejo e urgência ("meu ar tá assim...") |
| **Placeholder** | SVG genérico de "antes" (sujo) e "depois" (limpo) até cliente enviar fotos reais |

---

### Seção 5 — Depoimentos

| Campo | Detalhe |
|-------|---------|
| **Posição** | 5ª seção |
| **Conteúdo** | 3 a 6 cards com nome, foto (avatar), estrelas (4-5), texto do depoimento |
| **Nota** | Inicialmente fictícios com aviso interno; cliente substitui pelos reais |
| **CTA** | "Eu também quero esse resultado" → abre quiz |
| **Behavioral goal** | Prova social; reduzir medo de contratar errado |

---

### Seção 6 — Sobre a Empresa

| Campo | Detalhe |
|-------|---------|
| **Posição** | 6ª seção |
| **Conteúdo** | Foto do técnico (placeholder), 3-4 linhas de história, lista de diferenciais (ex: "Técnico certificado", "Garantia de 90 dias", "Pontualidade garantida") |
| **CTA** | "Falar com a gente" → WhatsApp direto |
| **Behavioral goal** | Humanizar a empresa; construir confiança com a persona que ainda tem objeções |

---

### Seção 7 — Área de Atendimento (Mapa)

| Campo | Detalhe |
|-------|---------|
| **Posição** | 7ª seção |
| **Conteúdo** | Mapa interativo (Leaflet + OpenStreetMap) com marcadores ou polígono dos bairros atendidos |
| **Lista textual** | Abaixo do mapa: lista dos bairros principais (placeholder: 10 bairros populares de Salvador) |
| **CTA** | "Moro nessa área — quero orçamento" → abre quiz |
| **Behavioral goal** | Confirmar para o lead que ele está na área de cobertura; filtrar fora da área |

---

### Seção 8 — FAQ (Perguntas Frequentes)

| Campo | Detalhe |
|-------|---------|
| **Posição** | 8ª seção |
| **Conteúdo** | 6 a 8 perguntas em accordion (abre/fecha) |
| **Exemplos de perguntas** | "Quanto tempo demora uma limpeza?", "Tem garantia?", "Atendem no final de semana?", "Preciso estar em casa?", "Vocês trazem os equipamentos?", "Como é feito o pagamento?" |
| **Schema.org** | `FAQPage` implementado para SEO |
| **CTA** | Após o FAQ: "Ainda tem dúvidas? Fale conosco" → WhatsApp |
| **Behavioral goal** | Eliminar objeções finais; converter leads que precisam de mais informação antes de agir |

---

### Seção 9 — CTA Final / Rodapé

| Campo | Detalhe |
|-------|---------|
| **Posição** | Última seção antes do footer |
| **Conteúdo** | Fundo de cor de destaque, headline de urgência, CTA grande para o quiz |
| **Microcopy** | "Responda 5 perguntas rápidas e receba sua estimativa de preço agora" |
| **Behavioral goal** | Última chance de converter leads que rolaram até o fim sem agir |

---

### Footer

| Campo | Detalhe |
|-------|---------|
| **Conteúdo** | Logo, CNPJ (placeholder), links: Política de Privacidade, Termos de Uso |
| **Contato** | WhatsApp, email (se houver), horário de atendimento |
| **Badge horário** | Exibe "Aberto agora" ou "Voltamos às [horário]" com base em horário real do servidor |

---

## 9. Integrações Técnicas

| Integração | Modo | Chave/Token | Prioridade | Observações |
|-----------|------|-------------|-----------|-------------|
| **WhatsApp Deep Link** | Produção (`wa.me`) | Número: `WHATSAPP_NUMBER` (env) | MUST | Testado em iOS (Safari) e Android (Chrome) antes de deploy |
| **Facebook Pixel** | Client-side; sandbox durante dev, produção no go-live | `NEXT_PUBLIC_FB_PIXEL_ID` (env) | SHOULD | Só dispara após consent do banner de cookies |
| **Facebook Conversions API** | Server-side; mesmo evento para deduplicação | `FB_CONVERSIONS_API_TOKEN` (env, servidor) | SHOULD | Implementado em API route `/api/events/facebook` |
| **Resend** | Sandbox durante dev, produção no go-live | `RESEND_API_KEY` (env) | SHOULD | Notificação de novo lead para email do técnico |
| **Vercel Postgres** | SQLite em dev, Vercel Postgres em produção | `DATABASE_URL` (env) | MUST | Schema: modelos `Lead` e `QuizProgress` |
| **Vercel Analytics** | Produção | `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` (env) | SHOULD | LGPD-friendly; sem cookies de terceiros |
| **Leaflet + OpenStreetMap** | Produção | Sem chave de API | SHOULD | Carregado dinamicamente (import dinâmico) para não afetar performance |
| **Sentry** | Setup inicial; ativo em v2 | `NEXT_PUBLIC_SENTRY_DSN` (env) | COULD | DSN configurado no devops; SDK habilitado em v2 |

**Dependências entre integrações:**

```
Lead capturado (banco de dados)
    ├── Resend: dispara email de notificação para técnico
    ├── Facebook Conversions API: dispara evento Lead (server-side)
    └── WhatsApp Deep Link: usuário é redirecionado com contexto

Facebook Pixel (client-side)
    └── Só ativo se: consent de cookies = true (banner aprovado)
```

---

## 10. Variáveis de Configuração (Placeholders)

Todas as variáveis abaixo são placeholders que o cliente ou a equipe deve substituir antes do go-live. O manual do cliente (`docs/manual-cliente.md`) explicará cada uma em linguagem leiga.

| Variável | Placeholder padrão | Arquivo/Local | Quem troca |
|----------|--------------------|---------------|-----------|
| `WHATSAPP_NUMBER` | `5571999999999` | `.env.local` | Cliente (número real do WhatsApp Business) |
| `CNPJ` | `00.000.000/0001-00` | `config/site.ts` | Cliente |
| `BUSINESS_HOURS` | `seg-sab 08:00-18:00,dom fechado` | `config/site.ts` | Cliente |
| `COVERAGE_AREAS` | 10 bairros populares de Salvador (lista fictícia) | `config/areas.ts` | Cliente |
| `NEXT_PUBLIC_FB_PIXEL_ID` | `PIXEL_ID_AQUI` | `.env.local` | Cliente (obtido no Facebook Ads Manager) |
| `FB_CONVERSIONS_API_TOKEN` | `TOKEN_AQUI` | `.env.local` | Cliente (obtido no Facebook Events Manager) |
| `RESEND_API_KEY` | `re_XXXXX` | `.env.local` | Agência (configurado no onboarding) |
| `DATABASE_URL` | `file:./dev.db` (dev) / Vercel Postgres string (prod) | `.env.local` | Agência (Vercel Postgres gerado no deploy) |
| `NEXT_PUBLIC_SITE_URL` | `https://solucoes2m.com.br` | `.env.local` | Agência (após cliente confirmar domínio) |
| `TESTIMONIALS` | 3 depoimentos fictícios com aviso `[PLACEHOLDER]` | `content/testimonials.ts` | Cliente (envia depoimentos reais) |
| `BEFORE_AFTER_IMAGES` | Placeholders SVG genéricos | `public/images/before-after/` | Cliente (envia fotos reais) |
| `LOGO` | SVG "2M" estilizado | `public/logo.svg` | Designer / Cliente |
| `ABOUT_PHOTO` | Avatar genérico (SVG) | `public/images/about.jpg` | Cliente (envia foto do técnico) |
| `NOTIFICATION_EMAIL` | `contato@solucoes2m.com.br` | `config/site.ts` | Cliente (email para receber novos leads) |

---

## 11. Requisitos Não-Funcionais

### 11.1 Performance

| Métrica | Meta | Ferramenta de validação |
|---------|------|------------------------|
| Lighthouse Performance | >= 90 | Google Chrome DevTools / Vercel Speed Insights |
| LCP (Largest Contentful Paint) | < 2.5 segundos | Core Web Vitals |
| FID / INP (Interaction to Next Paint) | < 100ms | Core Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Core Web Vitals |
| Tamanho do bundle JS inicial | < 150 KB (gzip) | next build --analyze |
| Imagens | Formato WebP, lazy load, tamanho adequado por breakpoint | Next.js Image component |
| Fontes | Subset WOFF2, `font-display: swap` | next/font |
| Mapa (Leaflet) | Import dinâmico com `loading="lazy"` para não bloquear render | Dynamic import Next.js |

**Estratégia mobile-first:**
- Breakpoints obrigatórios: 360px (mínimo), 768px (tablet), 1440px (desktop)
- Teste em dispositivo real Android e iOS antes de deploy
- Touch targets >= 44px em todos os elementos interativos

### 11.2 Acessibilidade

| Requisito | Padrão |
|-----------|--------|
| Conformidade mínima | WCAG 2.1 AA (AAA é bônus) |
| Contraste de cor | >= 4.5:1 para texto normal; >= 3:1 para texto grande |
| Navegação por teclado | Todos os elementos interativos acessíveis via Tab e Enter/Space |
| Screen reader | Todos os ícones com `aria-label`; imagens com `alt` descritivo |
| Focus visible | Outline visível em todos os elementos focados (nunca `outline: none` sem alternativa) |
| Quiz | Foco gerenciado programaticamente a cada etapa (sem scroll manual necessário) |
| Formulários | Labels associados a inputs; mensagens de erro acessíveis via `aria-describedby` |

### 11.3 Segurança e LGPD

| Requisito | Detalhe |
|-----------|---------|
| HTTPS | SSL válido obrigatório em produção (Vercel provisiona automaticamente) |
| Headers de segurança | CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy (configurados em `next.config.ts`) |
| Rate limiting | Endpoint `POST /api/lead`: máximo 10 requisições por IP por hora; endpoint `POST /api/quiz/progress`: máximo 50 por IP por hora |
| Validação de entrada | Zod em todas as rotas de API; nenhum dado de entrada confiado sem validação |
| LGPD — Política de Privacidade | Página `/politica-de-privacidade` com: quais dados coleta (nome, telefone, IP), finalidade, base legal (legítimo interesse / consentimento), retenção, direitos do titular |
| LGPD — Termos de Uso | Página `/termos-de-uso` |
| LGPD — Cookie Banner | Opt-in granular: Essenciais (sempre ativos), Funcionais, Analytics — Facebook Pixel só ativa com consent = Analytics |
| Logs | Nunca logar nome, telefone, WhatsApp ou qualquer dado pessoal em texto puro nos logs de aplicação |
| npm audit | Zero vulnerabilidades high/critical antes do deploy |

### 11.4 SEO Técnico

| Requisito | Detalhe |
|-----------|---------|
| Meta tags | `title`, `description`, `og:title`, `og:description`, `og:image` dinâmicos via `generateMetadata()` do Next.js |
| Schema.org | `LocalBusiness` (nome, endereço Salvador, área, telefone), `Service` (para cada serviço), `FAQPage`, `BreadcrumbList` |
| Sitemap | `/sitemap.xml` gerado automaticamente (Next.js App Router) |
| Robots.txt | `/robots.txt` permitindo indexação da landing; bloqueando `/api/*` |
| Canonical | Tag `<link rel="canonical">` em todas as páginas |
| Open Graph | Imagem OG 1200x630px com branding 2M |
| Lighthouse SEO | >= 90 |

---

## 12. Critérios de Aceite (DoA — Definition of Acceptance)

### Requirements Analyst (este agente)
- [x] `docs/briefing.md` criado, estruturado e sem ambiguidades
- [x] Escopo MUST é finito e claro
- [x] Todas as integrações com nomes exatos e modos especificados
- [x] Prazo documentado em data real (2026-05-07)
- [x] Referências visuais e estilo listados

### Solution Architect
- [ ] `docs/arquitetura.md` criado com estrutura de pastas, stack justificada
- [ ] Schema Prisma com modelos `Lead` e `QuizProgress` definidos
- [ ] Scaffolding inicial criado (`package.json`, `tsconfig.json`, `next.config.ts`)

### UI/UX Designer
- [ ] `docs/design-system.md` criado com tokens Tailwind personalizados
- [ ] Paleta de cores definida (fria/profissional + acento quente para CTA)
- [ ] Wireframes ASCII ou descritivos para todas as seções da Seção 8

### Frontend Developer
- [ ] Todos os componentes da Seção 8 implementados e responsivos (360–1440px)
- [ ] Quiz funcional com 5 etapas, barra de progresso e transição suave
- [ ] Animações com Framer Motion nos elementos críticos (quiz, resultado)
- [ ] Botão flutuante WhatsApp visível em todas as páginas
- [ ] Badge de horário comercial funcionando com lógica real de horário do servidor

### Backend Developer
- [ ] `POST /api/lead` — salva lead no banco com validação Zod; retorna 201 com link WhatsApp
- [ ] `POST /api/quiz/progress` — salva progresso parcial do quiz
- [ ] `GET /api/business-hours` — retorna se está aberto agora com base em horário configurado
- [ ] Migrations Prisma aplicadas; seed data com dados fictícios marcados como placeholder
- [ ] Rate limiting ativo nos endpoints críticos
- [ ] Notificação por email (Resend) disparada a cada novo lead

### Content/SEO
- [ ] Copy PT-BR finalizada para todas as seções (Hero, Serviços, Depoimentos, Sobre, FAQ)
- [ ] Schema.org implementado (`LocalBusiness`, `Service`, `FAQPage`)
- [ ] Meta tags dinâmicas configuradas
- [ ] Sitemap e robots.txt gerados

### QA Engineer
- [ ] Lighthouse >= 90 em Performance, Accessibility, Best Practices, SEO (confirmado em staging)
- [ ] Responsividade validada em 360px, 768px, 1440px
- [ ] Quiz testado do início ao fim em Chrome Android e Safari iOS
- [ ] Link WhatsApp testado e funcionando em iOS e Android
- [ ] Formulário de captura de dados validado (campos obrigatórios, máscaras, erros)
- [ ] Quiz suporta >= 100 submissions por dia sem degradação (carga simulada)
- [ ] Landing carrega em < 2.5s em conexão 4G simulada (DevTools throttling)

### Security/LGPD
- [ ] OWASP Top 10 auditado — zero vulnerabilidades críticas
- [ ] Cookie banner funcional com opt-in granular
- [ ] Facebook Pixel só dispara com consent explícito
- [ ] Política de Privacidade e Termos de Uso publicados
- [ ] Headers de segurança configurados e validados (securityheaders.com)
- [ ] `npm audit` — zero high/critical

### DevOps Engineer
- [ ] Deploy em Vercel com staging e produção separados
- [ ] CI/CD GitHub Actions com lint, typecheck e build em PRs
- [ ] Vercel Postgres configurado em produção
- [ ] Variáveis de ambiente configuradas no Vercel (todas as da Seção 10)
- [ ] SSL válido confirmado
- [ ] Domínio conectado (ou URL Vercel padrão se domínio ainda não confirmado)

### Documentation Writer
- [ ] `README.md` profissional com setup local, variáveis de ambiente e estrutura de pastas
- [ ] `docs/manual-cliente.md` em linguagem leiga explicando como substituir cada placeholder
- [ ] `CHANGELOG.md` criado
- [ ] Integrações documentadas (como configurar Pixel, Resend, WhatsApp)

---

## 13. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação | Plano B |
|-------|--------------|---------|-----------|---------|
| Link WhatsApp com formato incorreto em iOS | Média | Alto | QA testa em device real iOS (Safari) antes do deploy; usar formato `https://wa.me/` (não `whatsapp://`) | Botão de cópia de número como fallback |
| Facebook Pixel disparando sem consent | Alta | Alto | security-lgpd implementa cookie banner antes do frontend terminar; Pixel inicializado só após consent | Remover Pixel no go-live se não configurado pelo cliente |
| Quiz com abandono alto (UI confusa) | Média | Médio | ui-ux-designer valida UX antes do dev começar; QA mede abandono por etapa via QuizProgress | Simplificar para 3 perguntas se abandono > 60% |
| Prazo não cumprido por atraso de um agente | Média | Alto | Caminho crítico mapeado; requirements → architect → frontend+backend (paralelo) | Reduzir SHOULD para COULD se necessário para garantir MUST no prazo |
| Cliente não envia placeholders a tempo | Alta | Baixo | Usar mocks claros e documentados; não bloquear desenvolvimento por falta de fotos/logo | Go-live com placeholders documentados no manual |
| Acessibilidade WCAG AA não atingida no prazo | Média | Médio | qa-engineer usa axe DevTools desde o início; frontend-developer usa componentes shadcn/ui (já acessíveis por padrão) | Documentar issues pendentes; corrigir em v1.1 |
| Domínio não confirmado pelo cliente no prazo | Alta | Baixo | Deploy inicial em URL Vercel padrão (ex: `solucoes2m.vercel.app`); domínio conectado depois | Entregar com URL Vercel; manual explica como conectar domínio |
| Banco de dados Postgres não escalável no futuro | Baixa | Médio | Prisma com índices nos campos mais consultados (`email`, `createdAt`, `bairro`); plano de escalabilidade documentado pelo devops | Migrar para PlanetScale ou Neon se volume crescer |

---

## 14. Perguntas Pendentes

As questões abaixo foram identificadas durante a análise de requisitos. Elas não bloqueiam o início do desenvolvimento (as alternativas padrão estão documentadas), mas devem ser respondidas pelo cliente antes do go-live.

| # | Pergunta | Impacto se não respondida | Prazo para resposta | Responsável |
|---|---------|--------------------------|---------------------|-------------|
| 1 | Qual é o número real do WhatsApp Business da 2M Climatização? | O link de contato usará placeholder `5571999999999` até substituição | Antes do go-live | Cliente |
| 2 | Qual é o domínio desejado? (ex: `solucoes2m.com.br`) | Deploy ficará em URL Vercel padrão | Antes do go-live | Cliente |
| 3 | Qual é o CNPJ real da empresa? | Footer e política de privacidade terão placeholder | Antes do go-live | Cliente |
| 4 | Quais são os bairros exatos de atendimento? | Mapa e lista usarão 10 bairros fictícios de Salvador | Antes do go-live | Cliente |
| 5 | Qual é o horário real de atendimento? | Badge mostrará "Seg–Sáb 8h–18h, Dom fechado" como padrão | Antes do go-live | Cliente |
| 6 | O cliente já possui Facebook Pixel ID configurado? | Pixel não rastreará dados reais sem o ID; feature marcada como SHOULD (não bloqueante) | Antes do go-live | Cliente |
| 7 | O cliente possui fotos reais de antes/depois de higienizações realizadas? | Galeria usará SVG placeholder genérico | Após go-live (v1.1 ok) | Cliente |
| 8 | O cliente possui foto para a seção "Sobre a empresa"? | Avatar genérico será usado | Após go-live (v1.1 ok) | Cliente |
| 9 | Existem depoimentos reais de clientes (nome + texto)? | 3 depoimentos fictícios com aviso serão usados | Após go-live (v1.1 ok) | Cliente |
| 10 | Qual é o email para receber notificações de novos leads? | Notificações serão enviadas para placeholder até substituição | Antes do go-live | Cliente |
| 11 | As faixas de preço da tabela de estimativas estão corretas ou precisam de ajuste? | Estimativas incorretas podem gerar expectativas erradas nos leads | Antes do go-live | Cliente |

> Nenhuma dessas perguntas bloqueia o início da fase de arquitetura ou implementação. O projeto avança com os valores padrão (mocks) documentados.

---

**Documento aprovado por:** requirements-analyst  
**Data de criação:** 2026-04-23  
**Prazo de entrega do projeto:** 2026-05-07  
**Próxima fase:** solution-architect cria `docs/arquitetura.md`
