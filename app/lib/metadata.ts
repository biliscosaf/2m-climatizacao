// Gerador de metadados dinâmicos — OG, Twitter, SEO
// Utiliza Next.js Metadata API (app/layout.tsx)

import { Metadata } from "next"
import { SITE_URL } from "@/config/site"

/**
 * Metadados base — usado em layout.tsx
 * Pode ser estendido por páginas específicas via object spread
 */
export const BASE_METADATA: Metadata = {
  // Títulos
  title: {
    default: "Soluções 2M Climatização — Ar-condicionado em Salvador-BA",
    template: "%s | Soluções 2M Climatização",
  },

  // Description (55-160 caracteres ideal)
  description:
    "Instalação, manutenção, limpeza e reparo de ar-condicionado em Salvador. " +
    "Orçamento grátis. Atendimento em até 4 horas. Garantia 24 meses.",

  // Keywords (foco em local + serviço)
  keywords: [
    "ar-condicionado salvador",
    "ar condicionado salvador ba",
    "instalação ar-condicionado salvador",
    "manutenção ar-condicionado salvador",
    "limpeza ar-condicionado salvador",
    "reparo ar-condicionado salvador",
    "técnico ar-condicionado salvador",
    "ar-condicionado split salvador",
    "recarga gás ar-condicionado",
    "higienização ar-condicionado",
  ],

  // Autores e criador
  authors: [{ name: "Soluções 2M Climatização", url: SITE_URL }],
  creator: "Soluções 2M Climatização",

  // Open Graph (redes sociais)
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Soluções 2M Climatização",
    title: "Soluções 2M Climatização — Ar-condicionado em Salvador-BA",
    description:
      "Instalação, manutenção, limpeza e reparo de ar-condicionado. " +
      "Orçamento grátis, atendimento rápido.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Soluções 2M Climatização — Ar-condicionado em Salvador",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Soluções 2M Climatização",
    description: "Ar-condicionado em Salvador. Orçamento grátis, atendimento rápido.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@2mclimatizacao", // [PLACEHOLDER — atualizar com handles reais]
  },

  // Verificações (Google, Bing, etc)
  // Adicionar tokens após criar propriedades em Search Console
  // verification: {
  //   google: "GOOGLE_SITE_VERIFICATION_TOKEN",
  //   bing: "BING_VERIFICATION_TOKEN",
  // },

  // Robots e indexação
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Canonical (auto-resolvido por Next.js para página principal)
  alternates: {
    canonical: SITE_URL,
  },

  // Geral
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

/**
 * Metadados para página de Política de Privacidade
 */
export const POLITICA_METADATA: Metadata = {
  title: "Política de Privacidade | Soluções 2M Climatização",
  description:
    "Saiba como protegemos seus dados pessoais na Soluções 2M. " +
    "Conformidade LGPD, direitos do titular, segurança de dados.",
  openGraph: {
    title: "Política de Privacidade",
    description: "Como protegemos seus dados pessoais — Conformidade LGPD",
    url: `${SITE_URL}/politica-de-privacidade`,
  },
}

/**
 * Metadados para página de Termos de Uso
 */
export const TERMOS_METADATA: Metadata = {
  title: "Termos de Uso | Soluções 2M Climatização",
  description:
    "Conheça os termos e condições de uso do site da Soluções 2M Climatização.",
  openGraph: {
    title: "Termos de Uso",
    description: "Termos e condições de uso do site",
    url: `${SITE_URL}/termos-de-uso`,
  },
}

/**
 * Função para gerar metadados dinâmicos para páginas específicas
 * Utiliza o padrão: new_metadata = {...BASE_METADATA, ...custom_overrides}
 */
export function generatePageMetadata(overrides: Partial<Metadata>): Metadata {
  return {
    ...BASE_METADATA,
    ...overrides,
  }
}
