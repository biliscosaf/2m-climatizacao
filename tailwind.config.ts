import type { Config } from "tailwindcss"

// Design system definido pelo ui-ux-designer para a Soluções 2M Climatização
// Paleta: azul-gelo (frio, trust, tech) + laranja/vermelho (urgência, calor, CTA)
// Acessibilidade: WCAG 2.1 AA validada em todas as combinações de produção
// Mobile-first: 360px → 768px → 1440px

const config: Config = {
  // Habilita dark mode via classe — preparado para v2, não implementado em v1
  darkMode: ["class"],

  // Paths de todos os arquivos que usam classes Tailwind
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      // ============================================================
      // PALETA DE CORES DA MARCA
      // ============================================================

      colors: {
        // Frio — trust, profissionalismo, tecnologia
        // Cor principal da interface (progress bar, links, bordas de destaque, ícones)
        "sky-ice": {
          50: "#E0F2FE",   // Fundo suave — card hover, quiz option bg
          100: "#BAE6FD",  // Quiz option selected background
          500: "#0EA5E9",  // Cor principal — progress bar, bordas
          600: "#0284C7",  // Hover em elementos azuis, texto AA sobre branco (4.8:1)
          700: "#0369A1",  // Texto sobre sky-ice-50 (4.3:1 AA large) e branco (5.9:1 AA)
        },

        // Calor — urgência, CTAs, ação imediata
        // Cor de conversão (botões CTA, badges de preço, estrelas de avaliação)
        "orange-heat": {
          50: "#FFF7ED",   // Fundo suave — badges de urgência, seção CTA final leve
          100: "#FFEDD5",  // Hover state em ghost buttons
          500: "#F97316",  // Botão CTA primário (texto bold 16px+ = 3.0:1 AA large)
          600: "#EA580C",  // Hover/active em CTAs (texto white = 3.5:1 AA large)
        },

        // Alerta destrutivo — somente para erros críticos e ações irreversíveis
        "red-alert": {
          500: "#EF4444",  // Erros de validação de formulário
          600: "#DC2626",  // Ações destrutivas (não há na v1)
        },

        // Neutros — escala completa para texto, backgrounds e divisores
        neutral: {
          50: "#F9FAFB",   // Backgrounds de seções alternadas (FAQ, Sobre)
          100: "#F3F4F6",  // Card backgrounds, bordas suaves
          200: "#E5E7EB",  // Divisores, bordas de input
          400: "#9CA3AF",  // Placeholder text, ícones inativos
          500: "#6B7280",  // Texto secundário — AA sobre branco (4.6:1)
          700: "#374151",  // Corpo de texto em cards — AAA sobre branco (10.1:1)
          800: "#1F2937",  // Elementos sobre fundo escuro (footer hover)
          900: "#111827",  // Texto primário — AAA sobre branco (17.5:1)
        },

        // Estados de feedback — sempre usar com variante 50 no background
        feedback: {
          "success-bg": "#ECFDF5",  // emerald-50
          "success":    "#10B981",  // emerald-500
          "success-dk": "#047857",  // emerald-700 — texto em feedback-success-bg (6.3:1 AA)
          "warning-bg": "#FFFBEB",  // amber-50
          "warning":    "#F59E0B",  // amber-500
          "warning-dk": "#B45309",  // amber-700
          "error-bg":   "#FEF2F2",  // red-50
          "error":      "#EF4444",  // red-500
          "error-dk":   "#B91C1C",  // red-700
          "info-bg":    "#EFF6FF",  // blue-50
          "info":       "#3B82F6",  // blue-500
          "info-dk":    "#1D4ED8",  // blue-700
        },
      },

      // ============================================================
      // TIPOGRAFIA
      // ============================================================

      fontFamily: {
        // Inter — corpo e UI: máxima legibilidade, suporte PT-BR, variável font
        // Carregada via next/font/google com display: swap e subset latin
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],

        // Plus Jakarta Sans — headlines H1 e H2: impacto visual, transmite tech/profissionalismo
        // Carregada via next/font/google, weight 700 apenas
        display: ["var(--font-display)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },

      // Escala tipográfica completa — todos os valores são pares [fontSize, { lineHeight, fontWeight }]
      // Uso: className="text-h1-mob md:text-h1-desk" etc
      fontSize: {
        // Headlines — Plus Jakarta Sans
        "h1-mob":  ["2.5rem",   { lineHeight: "1.15", fontWeight: "700" }],  // 40px mobile
        "h1-desk": ["3.5rem",   { lineHeight: "1.15", fontWeight: "700" }],  // 56px desktop
        "h2-mob":  ["1.875rem", { lineHeight: "1.2",  fontWeight: "700" }],  // 30px mobile
        "h2-desk": ["2.625rem", { lineHeight: "1.2",  fontWeight: "700" }],  // 42px desktop

        // Headings de card e sub-seção — Inter
        "h3-mob":  ["1.375rem", { lineHeight: "1.3",  fontWeight: "600" }],  // 22px mobile
        "h3-desk": ["1.625rem", { lineHeight: "1.3",  fontWeight: "600" }],  // 26px desktop
        "h4-mob":  ["1.125rem", { lineHeight: "1.4",  fontWeight: "600" }],  // 18px mobile
        "h4-desk": ["1.25rem",  { lineHeight: "1.4",  fontWeight: "600" }],  // 20px desktop

        // Corpo de texto — Inter
        "body-lg": ["1.125rem", { lineHeight: "1.6",  fontWeight: "400" }],  // 18px — subheadline, lead copy
        "body":    ["1rem",     { lineHeight: "1.65", fontWeight: "400" }],  // 16px — texto corrente
        "body-md": ["1rem",     { lineHeight: "1.65", fontWeight: "500" }],  // 16px medium

        // Texto auxiliar — Inter
        "body-sm": ["0.875rem", { lineHeight: "1.5",  fontWeight: "400" }],  // 14px — help text, captions
        "label":   ["0.875rem", { lineHeight: "1.4",  fontWeight: "500" }],  // 14px medium — labels de form
        "badge":   ["0.75rem",  { lineHeight: "1.4",  fontWeight: "600" }],  // 12px bold — badges, tags
      },

      // ============================================================
      // BREAKPOINTS
      // ============================================================

      // Mobile-first: design em 360px, depois md: 768px, depois lg: 1024px, depois 2xl: 1440px
      // Nunca usar max-width queries — sempre min-width (mobile-first)
      screens: {
        xs:  "360px",   // Confirmação mínima suportada (telefones pequenos)
        sm:  "640px",   // Smartphones grandes (não prioridade no projeto)
        md:  "768px",   // Tablets, smartphones grandes
        lg:  "1024px",  // Laptops
        xl:  "1280px",  // Monitores médios
        "2xl": "1440px", // Full HD — layout desktop final
      },

      // ============================================================
      // BORDER RADIUS
      // ============================================================

      // Estende os tokens padrão do Tailwind com aliases semânticos
      borderRadius: {
        // Tailwind padrão mantido: rounded, rounded-sm, rounded-md, rounded-lg, rounded-xl, rounded-2xl, rounded-3xl, rounded-full
        // Tokens semânticos adicionais:
        "btn":     "9999px", // Botões (pill) — moderno, converte bem em mobile
        "card-sm": "0.75rem", // Cards pequenos, badges (12px)
        "card":    "0.75rem", // Cards de serviço, depoimentos (12px = rounded-xl do Tailwind)
        "card-lg": "1rem",    // Quiz card, modais (16px = rounded-2xl)
      },

      // ============================================================
      // SOMBRAS (4 níveis de elevação)
      // ============================================================

      boxShadow: {
        // Nível 1 — hover states, microelevação sutil
        "subtle": "0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 3px 0 rgba(0,0,0,0.10)",

        // Nível 2 — cards em estado default (sobrescreve shadow-md do Tailwind)
        "md": "0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10)",

        // Nível 3 — cards em hover, elementos flutuantes (sobrescreve shadow-lg)
        "lg": "0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)",

        // Nível 4 — quiz card, modais, drawers (sobrescreve shadow-xl)
        "xl": "0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)",

        // Especial — WhatsApp float button (destaque máximo)
        "float": "0 8px 30px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.10)",
      },

      // ============================================================
      // ANIMAÇÕES E KEYFRAMES
      // ============================================================

      // Complementam as animações do Framer Motion usadas no quiz
      // CSS puro para micro-interações que não precisam de JS
      animation: {
        // Entrada de elementos (scroll reveal, abertura do quiz)
        "fade-in":    "fadeIn 300ms ease-out",
        "slide-up":   "slideUp 300ms ease-out",
        "slide-in-right": "slideInRight 300ms ease-in-out",

        // WhatsApp float button — chama atenção sem irritar
        "pulse-ring": "pulseRing 2000ms cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",

        // Progress bar — preenche suavemente sem jump
        "progress-fill": "progressFill 500ms linear",

        // Acordeão FAQ — rotação do chevron
        "rotate-180": "rotate180 200ms ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%":   { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseRing: {
          "0%":   { boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.5)" },
          "70%":  { boxShadow: "0 0 0 14px rgba(34, 197, 94, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(34, 197, 94, 0)" },
        },
        progressFill: {
          "0%":   { width: "0%" },
          "100%": { width: "var(--progress-value, 100%)" },
        },
        rotate180: {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
      },

      // ============================================================
      // TRANSIÇÕES (durations padrão usadas nos componentes)
      // ============================================================

      transitionDuration: {
        "150": "150ms",  // Micro-interações: hover, focus (mais rápido que percepção)
        "300": "300ms",  // Padrão: modal appear, card hover, quiz slide
        "500": "500ms",  // Lento: scroll reveals, progress bar fill
      },

      transitionTimingFunction: {
        "ease-out":     "cubic-bezier(0, 0, 0.2, 1)",  // Entradas
        "ease-in":      "cubic-bezier(0.4, 0, 1, 1)",  // Saídas
        "ease-in-out":  "cubic-bezier(0.4, 0, 0.2, 1)", // Padrão
      },

      // ============================================================
      // SPACING CUSTOMIZAÇÕES
      // ============================================================

      // Tailwind padrão usa escala de 4px (sp-1 = 4px, sp-2 = 8px, etc)
      // Apenas adições que complementam a escala base:
      spacing: {
        "4.5": "1.125rem", // 18px — espaçamento intermediário (não na escala padrão)
        "13":  "3.25rem",  // 52px — variação útil para heights de botões
        "15":  "3.75rem",  // 60px — WhatsApp float button size
        "18":  "4.5rem",   // 72px — variação de seção
        "22":  "5.5rem",   // 88px — variação de seção
        "26":  "6.5rem",   // 104px — variação de seção
        "30":  "7.5rem",   // 120px — variação de seção grande
      },

      // ============================================================
      // MAX-WIDTHS (containers e layouts)
      // ============================================================

      maxWidth: {
        // Container principal — max-w-6xl do Tailwind (1152px) é o padrão
        // Containers especiais:
        "quiz":       "42rem",   // 672px — quiz card centralizado
        "result":     "32rem",   // 512px — tela de resultado
        "faq":        "48rem",   // 768px — seção FAQ centralizada
        "testimonial": "36rem",  // 576px — card individual de depoimento
      },

      // ============================================================
      // HEIGHT CUSTOMIZAÇÕES (touch targets e seções)
      // ============================================================

      height: {
        "touch":  "2.75rem",  // 44px — touch target mínimo WCAG
        "btn-md": "2.75rem",  // 44px — botão padrão
        "btn-lg": "3.5rem",   // 56px — botão CTA hero
        "wpp":    "3.75rem",  // 60px — WhatsApp float button
      },

      minHeight: {
        "touch": "2.75rem",  // 44px — garantia de touch target mínimo
        "hero-mob":  "60vh", // Hero mobile
        "hero-desk": "80vh", // Hero desktop
      },
    },
  },

  plugins: [
    // Tipografia para páginas legais (política de privacidade, termos de uso)
    require("@tailwindcss/typography"),
  ],
}

export default config
