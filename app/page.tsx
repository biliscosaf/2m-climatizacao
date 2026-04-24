// Home page — Soluções 2M Climatização
// Server Component por padrão (Next.js App Router)
// Cada seção é importada como Server Component;
// apenas Quiz, WhatsAppButton e CookieBanner são Client Components

import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Quiz } from "@/components/quiz/Quiz"
import { Services } from "@/components/sections/Services"
import { BeforeAfter } from "@/components/sections/BeforeAfter"
import { Attendance } from "@/components/sections/Attendance"
import { AmbientResult } from "@/components/sections/AmbientResult"
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
    <>
      <Hero />
      <Quiz />
      <Services />
      <BeforeAfter />
      <Attendance />
      <AmbientResult />
      <Testimonials />
      <About />
      <CoverageMap />
      <FAQ />
      <Cta />
    </>
  )
}
