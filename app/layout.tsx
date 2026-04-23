import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "@/app/globals.css"
import {
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/app/lib/schema"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/shared/WhatsAppButton"
import { CookieBanner } from "@/components/shared/CookieBanner"

// TODO: ui-ux-designer define a fonte real da marca 2M Climatização
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

// Meta tags base — content-seo preenche com copy real
export const metadata: Metadata = {
  title: {
    default: "Soluções 2M Climatização — Ar-condicionado em Salvador-BA",
    template: "%s | Soluções 2M Climatização",
  },
  description:
    "Instalação, manutenção, limpeza, reparo e higienização de ar-condicionado em Salvador. " +
    "Orçamento grátis, atendimento em até 4 horas, garantia de 24 meses.",
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
  authors: [{ name: "Soluções 2M Climatização", url: "https://solucoes2m.com.br" }],
  creator: "Soluções 2M Climatização",
  publisher: "Soluções 2M Climatização",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://solucoes2m.com.br",
    siteName: "Soluções 2M Climatização",
    title: "Soluções 2M Climatização — Ar-condicionado em Salvador-BA",
    description:
      "Instalação, manutenção, limpeza, reparo e higienização de ar-condicionado em Salvador. " +
      "Orçamento grátis, atendimento em até 4 horas, garantia 24 meses.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Soluções 2M Climatização — Ar-condicionado em Salvador",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soluções 2M Climatização",
    description: "Ar-condicionado em Salvador. Orçamento grátis, atendimento rápido.",
    images: ["/og-image.jpg"],
    creator: "@2mclimatizacao",
  },
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
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? "https://solucoes2m.com.br",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1d4ed8", // TODO: ui-ux-designer define cor real da marca
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        {/* TODO: security-lgpd implementa cookie banner (antes de Facebook Pixel) */}
        {/* <CookieBanner /> */}

        {/* Facebook Pixel — TODO: ativar quando customer preencher token real */}
        {/* <FacebookPixel /> */}

        {/* Google Analytics (se cliente preferir) — TODO: implementar conforme LGPD */}
        {/* <GoogleAnalytics /> */}

        {/* Sentry error tracking — TODO: devops-engineer configura em v2 */}
        {/* <SentryInit /> */}
      </head>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  )
}
