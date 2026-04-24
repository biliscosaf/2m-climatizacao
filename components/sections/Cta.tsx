// Seção CTA final — último call-to-action antes do footer
// Server Component

import { Button } from "@/components/ui/button"
import { getWhatsAppUrl } from "@/config/whatsapp"

export function Cta() {
  return (
    <section className="bg-orange-heat-500 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Pronto para resolver seu problema de ar-condicionado?
          </h2>

          <p className="mt-4 text-lg text-orange-heat-100">
            Nossas equipes estão prontas para atender em Salvador e região. Orçamento grátis!
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-4">
            <a href="#quiz" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full rounded-full bg-white px-8 py-4 font-semibold text-orange-heat-600 transition-all hover:bg-orange-heat-50 sm:w-auto"
              >
                Descobrir meu preço →
              </Button>
            </a>
            <a href={getWhatsAppUrl()} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full border-white px-8 py-4 font-semibold text-white hover:bg-orange-heat-600 sm:w-auto"
              >
                💬 Conversar no WhatsApp
              </Button>
            </a>
          </div>

          <p className="mt-6 text-sm text-orange-heat-100">
            Responda 5 perguntas rápidas e receba uma estimativa personalizada
          </p>
        </div>
      </div>
    </section>
  )
}
