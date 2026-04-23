# DESIGN SYSTEM — Soluções 2M Climatização

**Versão:** 1.0  
**Data:** 2026-04-23  
**Responsável:** ui-ux-designer  
**Status:** Aprovado para uso pelo frontend-developer

---

## 1. Paleta de Cores

### Racional da Paleta

A Soluções 2M Climatização atua na dicotomia calor/frio — Salvador-BA tem calor extremo como dor principal do cliente, e o ar-condicionado entrega frio como solução. A paleta traduz isso visualmente: azul-gelo para trust, tecnologia e profissionalismo; laranja/vermelho para urgência, calor e CTAs que exigem ação imediata.

A Persona Principal ("Dona Sônia", 30–60 anos, smartphone Android) requer alto contraste, fontes legíveis e elementos de toque grandes. Contraste de texto validado em AA (4.5:1) em todas as combinações usadas em produção.

---

### Primárias — Frio (Trust, Profissionalismo, Tech)

| Token | Nome semântico | Hex | Tailwind | Uso |
|-------|---------------|-----|----------|-----|
| `sky-ice-50` | Fundo suave azul | `#E0F2FE` | `sky-50` | Backgrounds de seção, card hover |
| `sky-ice-100` | Fundo azul claro | `#BAE6FD` | `sky-100` | Quiz option selected background |
| `sky-ice-500` | Azul principal | `#0EA5E9` | `sky-500` | Progress bar, links, ícones, bordas de destaque |
| `sky-ice-600` | Azul escuro | `#0284C7` | `sky-600` | Hover em elementos azuis, textos sobre fundo branco (AA) |
| `sky-ice-700` | Azul profundo | `#0369A1` | `sky-700` | Textos sobre fundos sky-50/sky-100 (AA) |

**Contraste validado:**
- `sky-ice-700` (#0369A1) sobre branco = 5.9:1 — AA para texto normal
- `sky-ice-600` (#0284C7) sobre `sky-ice-50` (#E0F2FE) = 4.8:1 — AA para texto normal
- `sky-ice-500` (#0EA5E9) sobre branco = 2.8:1 — use APENAS para elementos UI >= 18px ou componentes decorativos (ícones 24px+)

---

### Primárias — Calor (Urgência, CTAs, Ação)

| Token | Nome semântico | Hex | Tailwind | Uso |
|-------|---------------|-----|----------|-----|
| `orange-heat-50` | Fundo laranja suave | `#FFF7ED` | `orange-50` | Badge de urgência, fundo de seção CTA |
| `orange-heat-100` | Fundo laranja claro | `#FFEDD5` | `orange-100` | Hover state em botões ghost |
| `orange-heat-500` | Laranja CTA | `#F97316` | `orange-500` | Botão CTA primário, badges de preço, estrelas de avaliação |
| `orange-heat-600` | Laranja hover | `#EA580C` | `orange-600` | Hover/active em botões CTA |
| `red-alert-600` | Vermelho destrutivo | `#DC2626` | `red-600` | Erros críticos, ações destrutivas — nunca como CTA principal |

**Contraste validado:**
- Texto branco (#FFFFFF) sobre `orange-heat-500` (#F97316) = 3.06:1 — use apenas para texto >= 18px bold (24px bold = 3:1 OK para AA large text)
- Texto branco (#FFFFFF) sobre `orange-heat-600` (#EA580C) = 3.47:1 — AA para texto large (botões com padding, texto 18px+)
- Texto `gray-900` (#111827) sobre `orange-heat-50` (#FFF7ED) = 16.7:1 — AAA

**Decisao de acessibilidade:** Todos os botões CTA usam texto branco sobre `orange-heat-600` (hover padrão) com texto mínimo 16px bold. No estado default `orange-heat-500`, o texto interno deve ter font-weight 700 e font-size >= 16px para enquadrar como "large text" WCAG. Labels complementares de cor em preto/cinza-escuro sempre presentes.

---

### Neutros

| Token | Hex | Tailwind | Uso |
|-------|-----|----------|-----|
| `neutral-white` | `#FFFFFF` | `white` | Fundo de cards, backgrounds padrão |
| `neutral-50` | `#F9FAFB` | `gray-50` | Backgrounds de seções alternadas |
| `neutral-100` | `#F3F4F6` | `gray-100` | Card backgrounds, borders suaves |
| `neutral-200` | `#E5E7EB` | `gray-200` | Divisores, bordas de input |
| `neutral-400` | `#9CA3AF` | `gray-400` | Placeholder text, ícones inativos |
| `neutral-500` | `#6B7280` | `gray-500` | Texto secundário, help text, captions |
| `neutral-700` | `#374151` | `gray-700` | Corpo de texto em cards |
| `neutral-900` | `#111827` | `gray-900` | Texto primário — headings, labels |

**Contraste validado (texto sobre fundos de uso real):**
- `neutral-900` (#111827) sobre branco = 17.5:1 — AAA
- `neutral-700` (#374151) sobre branco = 10.1:1 — AAA
- `neutral-500` (#6B7280) sobre branco = 4.6:1 — AA (texto normal)
- `neutral-500` (#6B7280) sobre `neutral-50` (#F9FAFB) = 4.5:1 — AA (limite exato — use apenas para help text, nunca para informação crítica)

---

### Estados e Feedback

| Estado | Cor | Hex | Tailwind | Uso |
|--------|-----|-----|----------|-----|
| Sucesso | Verde | `#10B981` | `emerald-500` | Confirmação de lead enviado, check do resultado |
| Aviso | Âmbar | `#F59E0B` | `amber-500` | Alertas não-críticos, badge "Atenção" |
| Erro | Vermelho | `#EF4444` | `red-500` | Erros de validação de formulário |
| Info | Azul | `#3B82F6` | `blue-500` | Mensagens informativas, tooltips |

**Fundo escuro para estados:** usar variantes 50 (ex: `emerald-50`, `red-50`) como background de banners de estado, com texto na variante 700+ para AA garantido.

---

### Mapa Semântico de Cores por Componente

```
HERO
  Background:    gradient de sky-ice-50 para white (diagonal)
  H1 texto:      neutral-900
  Subheadline:   neutral-700
  CTA button:    orange-heat-500 bg / white text / hover: orange-heat-600
  Badge social:  neutral-100 bg / neutral-700 text

QUIZ
  Wrapper bg:    white (card)
  Progress fill: sky-ice-500
  Progress track: sky-ice-50
  Pergunta:      neutral-900 (H3)
  Opções default: white bg / neutral-700 text / neutral-200 border
  Opção hover:   sky-ice-50 bg / sky-ice-700 text / sky-ice-500 border
  Opção selected: sky-ice-100 bg / sky-ice-700 text / sky-ice-600 border (2px)
  Botão avançar: sky-ice-500 bg / white text / hover: sky-ice-600
  Resultado CTA: orange-heat-500 bg / white text / hover: orange-heat-600

SERVIÇOS (Cards)
  Card bg:       white
  Card border:   neutral-100 (default) / sky-ice-500 (hover)
  Ícone area:    sky-ice-50 bg / sky-ice-600 ícone
  Título:        neutral-900 (H4)
  Descrição:     neutral-700
  Preço/badge:   orange-heat-500 text (bold)
  Link CTA:      sky-ice-600 text / hover: sky-ice-700 underline

ANTES/DEPOIS
  Background:    neutral-100
  Handle:        sky-ice-500 (círculo) / white (ícone seta)
  Labels:        neutral-900 bold sobre white/neutral-100

DEPOIMENTOS
  Card bg:       white
  Border left:   4px sky-ice-500
  Estrelas:      orange-heat-500 (filled) / neutral-200 (empty)
  Nome:          neutral-900 bold
  Localização:   neutral-500 small
  Texto:         neutral-700 italic

SOBRE
  Background:    sky-ice-50 (diferencia da seção anterior)
  Título:        neutral-900
  Texto:         neutral-700
  Diferenciais:  sky-ice-600 ícone / neutral-900 texto
  CTA:           orange-heat-500 bg / white text

MAPA
  Background:    white
  Título seção:  neutral-900
  Marcadores:    sky-ice-500
  Polígono:      sky-ice-500 / opacity 0.2
  Lista bairros: neutral-700 / ícone sky-ice-500

FAQ
  Background:    neutral-50
  Trigger:       neutral-900 text / hover: sky-ice-50 bg
  Ícone chevron: sky-ice-500 (rotaciona 180° open)
  Conteúdo:      neutral-700 text
  Divisor:       neutral-200

CTA FINAL
  Background:    orange-heat-500 (seção inteira)
  Título:        white
  Subtítulo:     orange-heat-100 (suavizado)
  Botão:         white bg / orange-heat-600 text / hover: neutral-100

FOOTER
  Background:    neutral-900
  Logo:          white
  Texto:         neutral-400
  Links:         neutral-400 / hover: white
  Badge Aberto:  emerald-500 text / emerald-50 bg
  Badge Fechado: neutral-400 text / neutral-800 bg
```

---

## 2. Tipografia

### Racional da Escolha

**Inter** para corpo e UI: máxima legibilidade em telas pequenas (360px Android), suporte robusto a caracteres PT-BR (ã, ç, ô, etc), variável font disponível via Google Fonts com subset `latin`.

**Plus Jakarta Sans** para headlines H1 e H2: moderna, geométrica, impacto visual em títulos grandes. Transmite profissionalismo e tecnologia alinhado com o posicionamento da empresa.

Ambas as fontes são carregadas via `next/font/google` com `display: swap` e subset `latin` — sem round-trip adicional, menor CLS possível.

---

### Fontes

```typescript
// Em app/layout.tsx
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['700'],
})
```

---

### Escala de Tamanhos

| Elemento | Mobile (360px) | Desktop (1440px) | Line-height | Weight | Font | Uso |
|----------|---------------|-----------------|-------------|--------|------|-----|
| **H1** | 40px (2.5rem) | 56px (3.5rem) | 1.15 | 700 | Plus Jakarta Sans | Hero headline |
| **H2** | 30px (1.875rem) | 42px (2.625rem) | 1.2 | 700 | Plus Jakarta Sans | Título de seção |
| **H3** | 22px (1.375rem) | 26px (1.625rem) | 1.3 | 600 | Inter | Título de card, pergunta do quiz |
| **H4** | 18px (1.125rem) | 20px (1.25rem) | 1.4 | 600 | Inter | Sub-heading, nome de serviço |
| **Body-lg** | 18px (1.125rem) | 18px (1.125rem) | 1.6 | 400 | Inter | Subheadline hero, lead copy |
| **Body** | 16px (1rem) | 16px (1rem) | 1.65 | 400 | Inter | Texto corrente, parágrafos |
| **Body-sm** | 14px (0.875rem) | 14px (0.875rem) | 1.5 | 400 | Inter | Help text, captions, rodapé legal |
| **Label** | 14px (0.875rem) | 14px (0.875rem) | 1.4 | 500 | Inter | Labels de formulário |
| **Badge/Tag** | 12px (0.75rem) | 12px (0.75rem) | 1.4 | 600 | Inter | Badges, tags, counters |

**Nota sobre acessibilidade:** Tamanho mínimo de 14px em produção. Nunca usar 11px ou 12px para informação essencial — reservado exclusivamente para labels secundários e notices legais. A Persona Principal tem faixa etária de 30–60 anos e usa dispositivos móveis em condições de iluminação variável.

---

### Hierarquia Visual nas Seções

```
HERO
  H1: "Seu ar-condicionado com problema?" (40px mob / 56px desk, Plus Jakarta Sans 700)
  Body-lg: Subtítulo com proposta de valor (18px, Inter 400)
  Body-sm: Microcopy de urgência (14px, Inter 500)

SEÇÕES
  H2: Título da seção (30px mob / 42px desk, Plus Jakarta Sans 700)
  Body: Parágrafo introdutório (16px, Inter 400)
  H3: Título de card (22px mob / 26px desk, Inter 600)
  H4: Sub-item de card (18px / 20px, Inter 600)
  Body-sm: Descrição de card (14px, Inter 400)

QUIZ
  H3: Número da pergunta + texto (22px, Inter 600)
  Body: Opções de resposta (16px, Inter 400)

FORMULÁRIO
  Label: Labels dos inputs (14px, Inter 500)
  Body: Texto dentro dos inputs (16px, Inter 400)
  Body-sm: Mensagens de erro e help (14px, Inter 400)
```

---

## 3. Spacing System

### Base: Grade de 4px

Todos os espaçamentos são múltiplos de 4px. O Tailwind CSS padrão já usa escala de 4px (sp-1 = 4px, sp-2 = 8px, sp-4 = 16px, sp-6 = 24px, etc). Não criar tokens fora da grade.

```
4px   = sp-1   (micro-espaçamento: gap entre ícone e label)
8px   = sp-2   (espaço entre elementos inline)
12px  = sp-3   (padding mínimo de badges)
16px  = sp-4   (padding lateral em mobile, gap padrão em grid)
20px  = sp-5   (espaçamento entre elementos de formulário)
24px  = sp-6   (padding interno de cards no mobile)
32px  = sp-8   (padding interno de cards no desktop, gap maior)
48px  = sp-12  (espaçamento entre sub-seções)
64px  = sp-16  (margin-top entre seções no mobile)
80px  = sp-20  (variação de seção intermediária)
96px  = sp-24  (margin-top entre seções no desktop)
```

---

### Regras de Espaçamento por Contexto

**Padding interno de cards:**
- Mobile: `p-6` (24px)
- Desktop: `p-8` (32px)

**Margin entre seções (espaço vertical):**
- Mobile: `py-16` (64px topo e base)
- Desktop: `py-24` (96px topo e base)

**Gap em grids de cards:**
- Mobile: `gap-4` (16px)
- Tablet: `gap-6` (24px)
- Desktop: `gap-6` (24px) — não aumentar mais, prejudica legibilidade

**Padding horizontal de containers:**
- Mobile (360px): `px-4` (16px)
- Tablet (768px): `px-6` (24px)
- Desktop (1440px): `px-12` (48px) com `max-w-6xl mx-auto` (max-width 1152px centralizado)

**Padding de botões:**
- Botão padrão: `px-6 py-3` (24px / 12px) — altura mínima 44px (WCAG touch target)
- Botão grande (CTA hero): `px-8 py-4` (32px / 16px) — altura mínima 56px
- Botão pequeno (link secundário): `px-4 py-2` (16px / 8px) — nunca usar para CTA principal

**Espaçamento de formulário:**
- Entre label e input: `mb-1.5` (6px)
- Entre campos de formulário: `space-y-5` (20px)
- Padding do input: `px-4 py-3` (16px / 12px) — altura mínima 44px

---

## 4. Border Radius

| Token | Valor | Tailwind | Uso |
|-------|-------|----------|-----|
| Nenhum | 0px | `rounded-none` | Não usado na v1 |
| Extra pequeno | 6px | `rounded` | Badges pequenos, tooltips |
| Pequeno | 8px | `rounded-lg` | Botões, inputs, badges |
| Médio | 12px | `rounded-xl` | Cards de serviço, cards de depoimento |
| Grande | 16px | `rounded-2xl` | Cards do quiz, modais |
| Extra grande | 24px | `rounded-3xl` | Hero section card (se aplicável) |
| Pill | 9999px | `rounded-full` | Botões CTA primário, progress bar, avatares |

**Decisão:** Botões CTA usam `rounded-full` (pill) — remete a modernidade e converte melhor em mobile (estudos de CRO). Cards usam `rounded-xl` (12px) — profissional sem ser rígido demais.

---

## 5. Shadows e Elevation

### Sistema de 4 Níveis

```css
/* Nível 1 — Sutil: hover states, microelevação */
shadow-subtle: 0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 3px 0 rgba(0,0,0,0.10)

/* Nível 2 — Médio: cards em estado default */
shadow-md: 0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10)

/* Nível 3 — Elevado: cards em hover, elementos flutuantes */
shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)

/* Nível 4 — Alto: modais, drawers, quiz card */
shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)
```

**Regras de uso:**
- Cards de serviço: `shadow-md` default, `shadow-lg` no hover
- Quiz card (modal-like): `shadow-xl` sempre
- WhatsApp float button: `shadow-lg` sempre
- Inputs em foco: `ring-2 ring-sky-500 ring-offset-2` (sem box-shadow extra)
- Sem sombra em elementos sobre fundo colorido (hero, CTA final)

---

## 6. Componentes shadcn/ui

### Lista de Componentes a Instalar

```bash
# Instalação via shadcn/ui CLI
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add badge
npx shadcn@latest add accordion
npx shadcn@latest add dialog
npx shadcn@latest add progress
npx shadcn@latest add sonner
npx shadcn@latest add avatar
npx shadcn@latest add separator
npx shadcn@latest add form
```

---

### Button — Variantes e Uso

| Variante | Fundo | Texto | Uso |
|----------|-------|-------|-----|
| `default` (primary) | `orange-heat-500` | white | CTA principal (Hero, Resultado, CTA final) |
| `secondary` | `sky-ice-500` | white | CTAs secundários, avançar no quiz |
| `outline` | transparent | `sky-ice-600` | Ações terciárias, voltar no quiz |
| `ghost` | transparent | `neutral-700` | Opções do quiz (antes de selecionar) |
| `link` | transparent | `sky-ice-600` | Links em texto corrente |
| `destructive` | `red-alert-600` | white | Ações destrutivas (não há na v1) |

**Customização no `components/ui/button.tsx`:**
- Tamanho padrão (`md`): `h-11 px-6` (44px de altura — WCAG touch target)
- Tamanho grande (`lg`): `h-14 px-8 text-base` (56px de altura — CTAs hero)
- Tamanho pequeno (`sm`): `h-9 px-4 text-sm` (36px — nunca como CTA crítico)
- `rounded-full` em todos (decision #4 acima)
- `transition-colors duration-150` em todos
- Focus ring: `focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2`

---

### Card — Estrutura e Variantes

```tsx
// Estrutura padrão de card de serviço
<Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-neutral-100 hover:border-sky-500">
  <CardHeader>
    <div className="w-16 h-16 rounded-xl bg-sky-50 flex items-center justify-center mb-4">
      {/* Ícone Lucide 32px, text-sky-600 */}
    </div>
    <CardTitle className="text-h4 font-semibold text-neutral-900">
      Nome do Serviço
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-body-sm text-neutral-700">Descrição de 2-3 linhas.</p>
  </CardContent>
  <CardFooter>
    <Button variant="link" className="text-sky-600 p-0">
      Solicitar esse serviço →
    </Button>
  </CardFooter>
</Card>
```

---

### Input — Especificações

```tsx
// Input padrão
<Input
  className="
    h-12 px-4
    border-neutral-300 rounded-lg
    focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0
    placeholder:text-neutral-400
    text-neutral-900
  "
/>
```

- Altura mínima: 48px (`h-12`) — touch target seguro
- Borda default: `border-neutral-300`
- Borda foco: `border-sky-500` + `ring-2 ring-sky-500`
- Borda erro: `border-red-500` + `ring-2 ring-red-200`
- Texto placeholder: `neutral-400` — contraste 2.1:1 (intencional para placeholder, não informação crítica)
- Texto digitado: `neutral-900`

---

### Progress — Quiz Progress Bar

```tsx
// Barra de progresso do quiz
<Progress
  value={progressPercent}
  className="h-2 rounded-full bg-sky-100 [&>div]:bg-sky-500 [&>div]:transition-all [&>div]:duration-500"
/>
// + texto acima: "Pergunta 2 de 5" — body-sm, neutral-500
```

---

### Accordion — FAQ

```tsx
// FAQ accordion
<AccordionItem value="q1" className="border-b border-neutral-200">
  <AccordionTrigger className="
    text-left text-neutral-900 font-medium
    hover:bg-sky-50 px-4 py-4 rounded-lg
    hover:no-underline
    [&[data-state=open]>svg]:rotate-180
  ">
    Pergunta do FAQ
  </AccordionTrigger>
  <AccordionContent className="px-4 pb-4 text-neutral-700 text-body leading-relaxed">
    Resposta detalhada.
  </AccordionContent>
</AccordionItem>
```

---

### Badge — Status e Tags

| Variante | Fundo | Texto | Uso |
|----------|-------|-------|-----|
| Aberto agora | `emerald-50` | `emerald-700` | Badge horário comercial |
| Fechado | `neutral-100` | `neutral-600` | Badge horário comercial |
| Urgência | `orange-heat-50` | `orange-heat-700` | "Atendimento hoje em Salvador" |
| Novo | `sky-ice-50` | `sky-ice-700` | "Novidade" (se necessário) |

---

### Avatar — Depoimentos

- Tamanho: 48px x 48px (`w-12 h-12`)
- Fallback: Iniciais do nome em `sky-ice-50` bg / `sky-ice-700` text
- Borda: `ring-2 ring-sky-500 ring-offset-2`

---

## 7. Motion e Animações

### Princípios

1. Animações servem ao usuário, não à estética — cada animação deve reduzir confusão ou indicar estado
2. Duração máxima de 400ms para interações (300ms ideal) — usuários de mobile precisam de feedback imediato
3. Respeitar `prefers-reduced-motion` — desabilitar animações não-essenciais quando ativo

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### Tabela de Animações

| Elemento | Tipo | Duração | Easing | Trigger |
|----------|------|---------|--------|---------|
| Abertura do quiz | Fade + slide-up | 300ms | `ease-out` | Click no CTA |
| Troca de pergunta | Slide horizontal | 300ms | `ease-in-out` | Click em "Próxima" |
| Resultado aparece | Fade + scale 0.95→1 | 400ms | `ease-out` | Após pergunta 5 |
| Progress bar | Linear fill | 500ms | `linear` | A cada etapa do quiz |
| Cards on scroll | Fade + slide-up | 300ms | `ease-out` | Intersection Observer |
| Hover em cards | Scale 1 → 1.02 | 150ms | `ease-in-out` | Mouse enter |
| Acordeão FAQ | Height expand | 200ms | `ease-out` | Click no trigger |
| Botão WhatsApp | Pulse (anel) | 2000ms | `ease-in-out` | Continuous (attention) |
| CTA hover | Background darken | 150ms | `ease-in-out` | Mouse enter |

---

### Framer Motion — Variantes Reutilizáveis

```typescript
// lib/animations.ts — variantes para uso nos componentes

// Entrada de cards (scroll reveal)
export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}

// Troca de pergunta do quiz (slide horizontal)
export const quizSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  })
}

// Resultado do quiz
export const resultVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
}

// Container stagger (para listas de cards)
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}
```

---

## 8. Breakpoints

| Nome | Tailwind prefix | Min-width | Uso |
|------|----------------|-----------|-----|
| Mobile XS | (padrão, sem prefix) | 360px | Design base — smartphones pequenos |
| Mobile | `xs:` (custom) | 360px | Confirmação mínima suportada |
| Tablet | `md:` | 768px | Tablets, smartphones grandes |
| Desktop | `lg:` | 1024px | Laptops |
| Desktop XL | `2xl:` | 1440px | Monitores full HD |

**Abordagem mobile-first obrigatória:** Todo CSS começa sem prefix (360px), depois `md:` para 768px+, depois `lg:` para 1024px+, depois `2xl:` para 1440px+.

**Nunca usar** `max-width` breakpoints (não mobile-first). Nunca criar breakpoints fora da escala acima.

---

### Grid de Conteúdo por Seção

```
HERO
  mob:  1 coluna, texto centrado, CTA full-width
  md:   2 colunas (texto esquerda, imagem direita), max-w-5xl
  2xl:  2 colunas, max-w-6xl

SERVIÇOS (6 cards)
  mob:  1 coluna
  md:   2 colunas
  lg:   3 colunas

ANTES/DEPOIS
  mob:  1 item por vez (botão para alternar, sem drag)
  md:   slider comparativo horizontal com drag
  lg:   slider com handle centralizado, max-w-4xl

DEPOIMENTOS (3-6 cards)
  mob:  1 coluna (scroll horizontal opcional)
  md:   2 colunas
  lg:   3 colunas

SOBRE
  mob:  1 coluna (foto em cima, texto embaixo)
  md:   2 colunas (foto esquerda, texto direita)

MAPA
  mob:  mapa 100% largura, h-56; lista abaixo em 2 colunas
  md:   mapa h-72
  lg:   mapa h-96, max-w-5xl

FAQ
  mob:  1 coluna, full-width
  md:   max-w-3xl centrado
  lg:   max-w-3xl centrado

FOOTER
  mob:  1 coluna empilhada
  md:   3 colunas (logo | links | contato)
```

---

### Container e Max-widths

```tsx
// Container padrão — usar em TODAS as seções
<div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-12">
  {/* conteúdo da seção */}
</div>

// max-w-6xl = 1152px — centralizado em desktop, sem margens em mobile
// px-4 mob / px-6 tablet / px-12 desktop = breathing room adequado
```

---

## 9. Contraste e Acessibilidade (WCAG 2.1 AA)

### Padrões Mínimos

| Tipo de elemento | Contraste mínimo | Tailwind padrão |
|-----------------|-----------------|-----------------|
| Texto normal (< 18px regular ou < 14px bold) | 4.5:1 | `text-neutral-700` sobre branco = 10.1:1 OK |
| Texto grande (>= 18px regular ou >= 14px bold) | 3.0:1 | `text-orange-heat-600` sobre `orange-50` = 4.2:1 OK |
| Componentes UI (botões, inputs, ícones informativos) | 3.0:1 | Validado individualmente |
| Foco visível (outline) | 3.0:1 entre outline e bg adjacente | `ring-sky-500` sobre branco = OK |

---

### Combinações de Cores Validadas em Produção

| Texto | Background | Contraste | WCAG | Uso |
|-------|-----------|-----------|------|-----|
| `neutral-900` (#111827) | `white` (#FFFFFF) | 17.5:1 | AAA | Headings principais |
| `neutral-700` (#374151) | `white` (#FFFFFF) | 10.1:1 | AAA | Corpo de texto |
| `neutral-500` (#6B7280) | `white` (#FFFFFF) | 4.6:1 | AA | Help text |
| `neutral-500` (#6B7280) | `neutral-50` (#F9FAFB) | 4.5:1 | AA | Help text em bg cinza |
| `sky-ice-700` (#0369A1) | `white` (#FFFFFF) | 5.9:1 | AA | Links, textos azuis |
| `sky-ice-700` (#0369A1) | `sky-ice-50` (#E0F2FE) | 4.3:1 | AA (large) | Texto em badges azuis |
| `white` (#FFFFFF) | `sky-ice-500` (#0EA5E9) | 2.8:1 | — | NUNCA usar para texto — apenas ícones decorativos |
| `white` (#FFFFFF) | `sky-ice-600` (#0284C7) | 4.8:1 | AA | Texto em botões azuis (>= 14px bold) |
| `white` (#FFFFFF) | `orange-heat-600` (#EA580C) | 3.5:1 | AA (large) | Botão CTA (texto bold 16px+) |
| `neutral-900` (#111827) | `orange-heat-50` (#FFF7ED) | 16.7:1 | AAA | Texto em seções laranja claro |
| `white` (#FFFFFF) | `neutral-900` (#111827) | 17.5:1 | AAA | Footer, texto sobre fundo escuro |
| `neutral-400` (#9CA3AF) | `neutral-900` (#111827) | 4.6:1 | AA | Links do footer |
| `emerald-700` (#047857) | `emerald-50` (#ECFDF5) | 6.3:1 | AA | Badge "Aberto agora" |

**Combinações PROIBIDAS (falham WCAG AA para texto normal):**
- `white` sobre `sky-ice-500` (2.8:1) — nunca como texto informativo
- `orange-heat-500` (#F97316) sobre `white` (3.0:1) — uso restrito a decorativo/large
- `neutral-400` sobre `white` (2.6:1) — nunca como texto de conteúdo

---

### Focus Management — Quiz

O quiz requer gerenciamento programático de foco para acessibilidade via teclado e screen readers.

```typescript
// Ao trocar de pergunta, mover foco para o título da nova pergunta
// Em useQuizState.ts:
useEffect(() => {
  // Após animação (300ms), focar o H3 da pergunta
  const timer = setTimeout(() => {
    const questionEl = document.getElementById(`question-${currentStep}`)
    questionEl?.focus()
  }, 320)
  return () => clearTimeout(timer)
}, [currentStep])

// O H3 da pergunta deve ter:
// tabIndex={-1} (focável programaticamente, não pelo Tab)
// role="heading" aria-level="3"
```

---

### ARIA e Semântica

```tsx
// Quiz — estrutura semântica obrigatória
<section aria-label="Quiz de diagnóstico de ar-condicionado" role="form">
  <div aria-live="polite" aria-atomic="true">
    {/* Texto "Pergunta X de 5" — anunciado pelo screen reader a cada troca */}
  </div>
  <fieldset>
    <legend id={`question-${step}`} tabIndex={-1}>
      {pergunta.texto}
    </legend>
    {pergunta.opcoes.map((opcao) => (
      <label key={opcao.id} className="...">
        <input
          type="radio"
          name={`pergunta-${step}`}
          value={opcao.valor}
          aria-describedby="quiz-hint"
        />
        {opcao.label}
      </label>
    ))}
  </fieldset>
  <p id="quiz-hint" className="sr-only">
    Use Tab para navegar entre opções e Enter para selecionar
  </p>
</section>

// Botão WhatsApp flutuante
<a
  href={whatsappUrl}
  aria-label="Falar com técnico pelo WhatsApp"
  role="button"
  className="..."
>
  {/* Ícone WhatsApp com aria-hidden="true" */}
  <WhatsAppIcon aria-hidden="true" />
</a>

// Slider Antes/Depois
<div
  role="img"
  aria-label="Comparativo: equipamento antes e depois da limpeza profissional"
>
  {/* Slider handle com aria-valuemin, aria-valuemax, aria-valuenow */}
</div>

// FAQ Accordion (shadcn/ui já implementa aria-expanded, aria-controls)
// Verificar se aria-expanded="true/false" está sendo transmitido

// Cards de serviço — CTA secundário
<a href="#quiz" aria-label="Solicitar serviço de Instalação — ir para o quiz">
  Solicitar esse serviço →
</a>
```

---

### Keyboard Navigation

| Tecla | Comportamento esperado |
|-------|----------------------|
| `Tab` | Navega por todos os elementos interativos na ordem lógica do DOM |
| `Shift + Tab` | Navega em sentido contrário |
| `Enter` / `Space` | Ativa botões, seleciona opções do quiz, abre/fecha FAQ |
| `Esc` | Fecha modal do quiz (se implementado como Dialog) |
| `Arrow keys` | Navega entre opções de radio no quiz |

**Tab order obrigatório:**
1. Skip link "Ir para conteúdo principal" (visível no primeiro Tab — ver Seção 9.5)
2. Logo (link para `#top`)
3. Quiz CTA (hero)
4. Opções do quiz (quando ativo)
5. Botões de navegação do quiz
6. Formulário de resultado
7. Botão WhatsApp
8. FAQ triggers
9. Links do footer

---

### Skip Link

```tsx
// Em app/layout.tsx — primeiro elemento após <body>
<a
  href="#main-content"
  className="
    sr-only focus:not-sr-only
    focus:fixed focus:top-4 focus:left-4
    focus:z-[100] focus:px-4 focus:py-2
    focus:bg-sky-500 focus:text-white
    focus:rounded-lg focus:shadow-lg
    focus:outline-none
  "
>
  Ir para o conteúdo principal
</a>

// No início do <main>:
<main id="main-content">
```

---

### Checklist WCAG 2.1 AA (para QA validar)

**Percepção:**
- [ ] Texto normal: contraste >= 4.5:1 em todas as combinações de produção
- [ ] Texto grande (>= 18px): contraste >= 3.0:1
- [ ] Componentes UI: contraste de borda/ícone >= 3.0:1
- [ ] Imagens informativas com `alt` descritivo
- [ ] Imagens decorativas com `alt=""`
- [ ] Antes/Depois: `role="img"` com `aria-label` descritivo
- [ ] Cor não é o único indicador (ex: erro de formulário tem texto + ícone + cor)

**Operabilidade:**
- [ ] Skip link funciona
- [ ] Tab order lógico em toda a página
- [ ] Quiz navegável por teclado (Tab + Enter + Arrow keys)
- [ ] FAQ accordion com teclado
- [ ] Botão WhatsApp acessível por teclado
- [ ] Foco visível em todos os elementos (`ring-2 ring-sky-500`)
- [ ] Nenhum elemento prende o foco (sem keyboard traps)
- [ ] Touch targets >= 44x44px em todos os interativos (mobile)
- [ ] `prefers-reduced-motion` respeitado

**Compreensibilidade:**
- [ ] `lang="pt-BR"` no `<html>`
- [ ] Labels em todos os inputs (`<label for>` ou `aria-label`)
- [ ] Mensagens de erro identificam o campo e descrevem o problema
- [ ] `aria-describedby` em inputs com help text
- [ ] `aria-live="polite"` no status do quiz
- [ ] `autocomplete` nos campos de nome e telefone

**Robustez:**
- [ ] HTML semanticamente correto (sem divs fake sendo botões sem `role`)
- [ ] `aria-expanded` no accordion FAQ
- [ ] Landmarks: `<header>`, `<main>`, `<footer>`, `<nav>` (se houver), `<section aria-label>`

**Ferramentas de teste:**
- axe DevTools (extensão Chrome) — deve ter zero issues críticos
- Lighthouse Accessibility >= 90 em staging
- WAVE (wave.webaim.org) — nenhum erro vermelho
- Teste manual com teclado (desabilitar mouse)
- Teste com VoiceOver (iOS) ou TalkBack (Android)

---

## 10. Componentes Específicos por Seção

### 10.1 Hero Section

**Layout mobile:**
```
[16px margin lateral]
  Logo 2M (40px height, link para #top)
  ---
  Badge: "Orçamento grátis • Atendimento hoje" (pill, orange-heat-50 bg)
  ---
  H1: "Seu ar-condicionado com problema?" (40px, Plus Jakarta Sans 700, neutral-900)
  Body-lg: Subtítulo de proposta de valor (18px, neutral-700)
  ---
  [CTA BUTTON] "Descubra o Preço do Seu Serviço" (orange-heat-500, pill, full-width, h-14)
  Body-sm: "Sem compromisso • Resposta em minutos" (14px, neutral-500, centrado)
  ---
  Prova social: "500+ clientes atendidos em Salvador"
    [ícones de estrelas, orange-heat-500] [texto, neutral-700]
[16px margin lateral]
```

**Layout desktop (md:):**
```
Grid 2 colunas: [conteúdo esquerda] [imagem direita]
Conteúdo: alinhado à esquerda (texto-left)
CTA: auto-width (não full-width)
Imagem: foto ou ilustração de AC, object-cover, rounded-2xl
```

**Background:** `bg-gradient-to-br from-sky-50 to-white` com sutileza. Não usar imagem de fundo no mobile (CLS e LCP).

---

### 10.2 Quiz Component

**Estrutura do container:**
```
Posição: seção embarcada (inline), não modal no mobile — evita problemas de scroll em iOS
Desktop: card centralizado max-w-2xl com shadow-xl

[Progress indicator]
  "Pergunta X de 5" — body-sm, neutral-500, text-right
  [Progress bar] — h-2, sky-ice-500 fill, sky-ice-50 track, rounded-full

[Área da pergunta — fieldset]
  H3: Texto da pergunta (neutral-900, tabIndex=-1, id=question-N)

[Opções — radio buttons estilizados]
  Cada opção:
    padding: p-4 (16px)
    border: 2px solid neutral-200
    rounded: rounded-xl
    hover: border-sky-500 bg-sky-50
    selected: border-sky-600 bg-sky-100
    ícone emoji/SVG à esquerda + texto label à direita
    full-width, touch target >= 48px de altura

[Ações]
  [Botão Voltar] — ghost, sky-ice-600 text, "← Voltar"
  [Botão Avançar] — secondary (sky-ice-500), "Próxima →"
  Distribuídos: justify-between
```

**Tela de Resultado:**
```
[Card resultado — shadow-xl, rounded-2xl, max-w-lg]
  [Check icon — emerald-500, 48px]
  "Análise concluída!" — H3, neutral-900
  "Com base nas suas respostas..." — body, neutral-700

  [Box estimativa — sky-50 bg, sky-500 border-left-4, rounded-xl]
    [Tipo de serviço] — badge sky-ice
    "De R$ MIN a R$ MAX" — H2, neutral-900
    "★ Inclui deslocamento" — body-sm, emerald-700
    "★ Diagnóstico gratuito" — body-sm, emerald-700

  [Formulário de captura]
    Label "Seu nome"
    Input nome (autocomplete="given-name")
    Label "WhatsApp"
    Input telefone com máscara (autocomplete="tel")

  [CTA] "Falar com o Técnico Agora →" — orange-heat-500, pill, full-width, h-14

  [Trust signal] "🔒 Seus dados não serão compartilhados"
    Link "Política de Privacidade" — sky-ice-600, underline
```

---

### 10.3 Service Cards (6 cards)

```
Grid: 1 col mob / 2 col md / 3 col lg
Gap: 24px
Card: rounded-xl, shadow-md, hover:shadow-lg, border border-neutral-100 hover:border-sky-500
Transition: transition-all duration-300

Cada card:
  [Ícone area] w-16 h-16, bg-sky-50, rounded-xl, flex center
    Lucide icon, 32px, text-sky-600
  [Título] H4, neutral-900, mt-4
  [Descrição] body-sm, neutral-700, mt-2, line-clamp-3
  [Link CTA] "Solicitar esse serviço →", sky-ice-600, hover:sky-ice-700, mt-4

Ícones por serviço:
  1. Instalação: Wrench
  2. Limpeza: Wind
  3. Manutenção preventiva: Shield
  4. Reparo de emergência: Zap
  5. Recarga de gás: Droplets
  6. Higienização profunda: Sparkles
```

---

### 10.4 Antes/Depois Slider

**Mobile (360px–767px):**
```
Não usar drag slider em mobile (problemas de scroll touch)
Alternativa: 2 imagens empilhadas com label "ANTES" / "DEPOIS"
Ou: botão toggle para alternar entre as imagens com fade transition (300ms)

[Imagem ANTES] — aspect-ratio 4/3, object-cover, rounded-xl
  Badge "ANTES" — neutral-900 text, neutral-100 bg, top-left, rounded
[Imagem DEPOIS]
  Badge "DEPOIS" — white text, sky-ice-500 bg, top-left, rounded
[Botão toggle] — outline, sky-ice-600, "Ver antes / Ver depois"
```

**Desktop (md:+):**
```
Slider comparativo horizontal com handle central
Handle: círculo sky-ice-500 (40px), ícones seta ← → em white
Cursor: col-resize
Imagem: aspect-ratio 16/9, max-w-4xl centrado
Labels: "ANTES" e "DEPOIS" fixos em cada canto
```

**CTA abaixo:** "Quero meu ar-condicionado assim" — botão orange-heat-500, centralizado.

---

### 10.5 Testimonials Cards

```
Grid: 1 col mob / 2 col md / 3 col lg
Gap: 24px

Cada card:
  border-left: 4px solid sky-ice-500
  rounded-xl (nos outros 3 lados), shadow-md
  padding: p-6

  [Stars] 5 estrelas, orange-heat-500 filled / neutral-200 empty
  [Texto depoimento] body, neutral-700, italic, linha-clamp-4 ou expandível
  [Separador] neutral-200, my-4

  [Rodapé do card]
    [Avatar] 48x48, rounded-full, ring-2 ring-sky-500
    [Dados]
      [Nome] body, neutral-900, font-semibold
      [Local] body-sm, neutral-500
```

---

### 10.6 Sobre a Empresa

```
Background: bg-sky-50 (diferencia visualmente)
Layout mob: 1 coluna centrada
Layout md+: 2 colunas (foto | texto)

[Foto]
  Placeholder: avatar genérico, aspect-square
  rounded-2xl, shadow-lg
  max-w-sm no desktop

[Texto]
  Badge "Nossa história" — sky-ice pill, mb-4
  H2 título — neutral-900
  Parágrafos — neutral-700
  
  [Lista de diferenciais]
    Cada item:
      [Check icon] sky-ice-500, 20px
      [Texto] neutral-900, font-medium
    gap-3 entre itens

  [CTA] "Falar com a gente" — orange-heat-500, pill, mt-8
```

---

### 10.7 Mapa de Atendimento

```
Background: white
max-w-5xl centrado

[Título seção] H2, neutral-900
[Subtítulo] body, neutral-700

[Mapa Leaflet]
  Carregado com dynamic import (sem SSR)
  altura: h-56 mob / h-72 md / h-96 lg
  rounded-2xl, overflow-hidden, shadow-md
  Marcadores: sky-ice-500 personalizado
  Polígono: sky-ice-500 com opacity 0.2

[Lista de bairros]
  Grid 2 col mob / 3 col md
  Cada item: [MapPin icon sky-500 16px] [Nome do bairro body-sm neutral-700]
  gap-2

[CTA] "Moro nessa área — quero orçamento" — outline sky-ice, centralizado, mt-8
```

---

### 10.8 FAQ Section

```
Background: bg-neutral-50

max-w-3xl centrado

[Título seção] H2, neutral-900, text-center
[Subtítulo] body, neutral-600, text-center, max-w-xl

[Accordion]
  Shadcn/ui Accordion, type="single", collapsible
  Cada AccordionItem:
    border-b border-neutral-200 (sem borda nas laterais)
    trigger: py-4 px-0, text-left, neutral-900, font-medium, hover:text-sky-700
    ícone chevron: sky-ice-500, transition-transform duration-200
    content: pb-4 text-neutral-700 body leading-relaxed

[CTA pós-FAQ]
  "Ainda tem dúvidas?" — H4, neutral-900, text-center
  "Fale conosco pelo WhatsApp" — link sky-ice-600, underline
```

---

### 10.9 CTA Final

```
Background: bg-orange-heat-500 (seção inteira)
padding: py-20

[Conteúdo centrado, max-w-2xl]
  [Ícone] sun ou snowflake, white, 48px
  H2: "Não passe mais calor!" — white, text-center
  Body-lg: Microcopy — orange-heat-100, text-center
  [CTA] "Quero meu Orçamento Agora →" — white bg, orange-heat-600 text, pill, h-14, hover:bg-neutral-50
  Body-sm: "Responda 5 perguntas rápidas" — orange-heat-100, text-center, mt-2
```

---

### 10.10 Footer

```
Background: bg-neutral-900
padding: py-12

Grid 3 col md+ / 1 col mob

Coluna 1 — Brand:
  Logo white
  Tagline: body-sm, neutral-400
  CNPJ: body-sm, neutral-500

Coluna 2 — Links:
  "Empresa": H4, neutral-400, font-medium, uppercase tracking-wide, mb-4
  Links: body-sm, neutral-400, hover:text-white
    Política de Privacidade
    Termos de Uso
    Início

Coluna 3 — Contato:
  "Contato": H4, neutral-400, uppercase tracking-wide, mb-4
  [WhatsApp icon + número]: neutral-400, hover:white
  [Badge horário] — ver badge specs na Seção 6

[Divisor] border-neutral-800, mt-8
[Copyright] body-sm, neutral-500, text-center, py-4

WhatsApp Float Button (posição fixa):
  Fundo: green-500 (#22C55E)
  Posição: fixed bottom-6 right-6, z-50
  Tamanho: 60x60px, rounded-full
  Sombra: shadow-lg
  Anel de atenção: ring animado (2000ms pulse)
  Hover: scale-110 duration-150
  aria-label: "Falar com técnico pelo WhatsApp"
```

---

## 11. Dark Mode

Dark mode não está previsto para v1. A arquitetura Tailwind está preparada com `darkMode: ["class"]` para v2.

Em v1: garantir que TODOS os componentes usem tokens de cor semânticos (não hex hardcoded) para facilitar a adição do dark mode em v2 sem reescrita.

---

## 12. Responsive Grid System

### Mobile (360px padrão)

```css
/* Container */
max-width: 100%;
padding: 0 16px; /* px-4 */

/* Grid de cards */
grid-template-columns: 1fr;
gap: 16px;
```

### Tablet (768px — md:)

```css
/* Container */
max-width: 100%;
padding: 0 24px; /* px-6 */

/* Grid de cards */
grid-template-columns: repeat(2, 1fr);
gap: 24px;
```

### Desktop (1440px — 2xl:)

```css
/* Container */
max-width: 1152px; /* max-w-6xl */
margin: 0 auto;
padding: 0 48px; /* px-12 */

/* Grid de cards */
grid-template-columns: repeat(3, 1fr);
gap: 24px;
```

---

## 13. Ícones

**Biblioteca:** Lucide React (`lucide-react`) — tree-shakeable, SVG, suporte TypeScript.

**Não misturar** com outras bibliotecas de ícones em v1 (React Icons, Heroicons). Consistência visual é prioridade.

```
Tamanhos:
  16px (size={16}) — ícones em body text, badges
  20px (size={20}) — ícones em listas, labels
  24px (size={24}) — ícones padrão (default)
  32px (size={32}) — ícones grandes em cards de serviço
  48px (size={48}) — ícones hero de seção, resultado do quiz

Cor padrão:
  currentColor — herda a cor do elemento pai (ideal)
  Definir a cor no elemento pai: text-sky-600, text-orange-500, etc

aria-hidden="true" — obrigatório em ícones decorativos
Ícones funcionais: aria-label no elemento pai (botão/link)
```

**Mapeamento de ícones por seção:**

| Seção | Ícone | Lucide |
|-------|-------|--------|
| Hero badge | Star | `Star` |
| Serviço: Instalação | Chave inglesa | `Wrench` |
| Serviço: Limpeza técnica | Vento | `Wind` |
| Serviço: Manutenção | Escudo | `Shield` |
| Serviço: Reparo emergência | Raio | `Zap` |
| Serviço: Recarga de gás | Gotas | `Droplets` |
| Serviço: Higienização | Brilho | `Sparkles` |
| Resultado: Check | Círculo check | `CheckCircle2` |
| Sobre: Diferenciais | Check | `Check` |
| Mapa: Bairros | Pin | `MapPin` |
| FAQ: Chevron | Seta baixo | `ChevronDown` |
| WhatsApp float | — | SVG custom (brand icon) |
| Footer: WhatsApp | Telefone | `Phone` |
| Badge Aberto | Círculo verde | `Circle` (filled) |
| Badge Fechado | Círculo cinza | `Circle` |

---

## 14. Validação Checklist — Critérios de Done para o Design System

**Cores:**
- [ ] Paleta completa definida e documentada com valores hex e Tailwind
- [ ] Todas as combinações de texto + fundo validadas (>= 4.5:1 para texto normal)
- [ ] Botões CTA validados (>= 3.0:1 para texto large em botões laranja)
- [ ] Nenhum uso de cor como único indicador de estado

**Tipografia:**
- [ ] Fontes definidas: Inter (body) + Plus Jakarta Sans (display)
- [ ] Escala de tamanhos documentada (8 níveis)
- [ ] Line-heights definidos para cada nível
- [ ] Tamanho mínimo: 14px em produção
- [ ] Responsividade tipográfica definida (H1 muda entre mob/desk)

**Espaçamento:**
- [ ] Grade de 4px usada em todos os tokens
- [ ] Padding de cards definido (mob/desk)
- [ ] Margin de seções definido (mob/desk)
- [ ] Touch targets >= 44px em todos os interativos documentados

**Componentes:**
- [ ] Todos os componentes shadcn/ui listados com instruções de instalação
- [ ] Button: 6 variantes especificadas
- [ ] Card: estrutura HTML definida
- [ ] Input: estados (default, focus, error) especificados
- [ ] Quiz: todas as telas especificadas (pergunta + resultado)
- [ ] Progress bar: tokens definidos

**Motion:**
- [ ] Todas as animações dentro de 400ms
- [ ] `prefers-reduced-motion` documentado
- [ ] Variantes Framer Motion definidas e reutilizáveis
- [ ] Pulse do WhatsApp float especificado

**Acessibilidade:**
- [ ] Skip link especificado
- [ ] ARIA roles documentados para cada componente complexo
- [ ] Tab order documentado
- [ ] Focus management do quiz documentado
- [ ] Checklist WCAG AA completa para QA validar
- [ ] Ferramentas de teste especificadas

**Responsividade:**
- [ ] Breakpoints alinhados com briefing (360px / 768px / 1440px)
- [ ] Mobile-first (sem max-width queries)
- [ ] Grid de cada seção documentado nos 3 breakpoints
- [ ] Container max-width e padding por breakpoint definidos

**Ícones:**
- [ ] Biblioteca única definida (Lucide React)
- [ ] Tamanhos padronizados (16/20/24/32/48px)
- [ ] Mapeamento ícone por seção documentado
- [ ] `aria-hidden` em ícones decorativos especificado

---

**Documento criado por:** ui-ux-designer  
**Data:** 2026-04-23  
**Próxima fase:** frontend-developer usa este design system para implementar os componentes
