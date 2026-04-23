// Home page — Soluções 2M Climatização
// Server Component por padrão (Next.js App Router)
// Cada seção é importada como Server Component;
// apenas Quiz, WhatsAppButton e CookieBanner são Client Components

import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Quiz } from "@/components/quiz/Quiz"
import { Services } from "@/components/sections/Services"
import { BeforeAfter } from "@/components/sections/BeforeAfter"
import { Testimonials } from "@/components/sections/Testimonials"
import { About } from "@/components/sections/About"
import { CoverageMap } from "@/components/sections/CoverageMap"
import { FAQ } from "@/components/sections/FAQ"
import { Cta } from "@/components/sections/Cta"

// Meta tags específicas da home (override do layout.tsx)
export const metadata: Metadata = {
  title: "Ar-condicionado em Salvador — Instalação, Manutenção e Limpeza",
  description:
    "Descubra o preço do seu serviço de ar-condicionado em 5 perguntas rápidas. " +
    "Atendemos Salvador, Lauro de Freitas, Camaçari e região. Orçamento grátis!",
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold">Bem-vindo ao Quiz 2M Climatização</h1>
      <p className="mt-4 text-gray-600">
        Servidordando rodando corretamente! Os componentes complexos foram temporariamente desativados para debug.
      </p>

      {/* SEÇÃO 2 — QUIZ INTERATIVO */}
      <section id="quiz" aria-label="Quiz de diagnóstico" className="bg-gray-50 py-12 md:py-16 mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
          <Quiz />
        </div>
      </section>
    </main>
  )
}
