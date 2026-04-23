// Hero section — acima da dobra com gradient, H1, CTA pro quiz
// Server Component — renderizado no servidor, sem JS desnecessário

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background sky-50 → white */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-white" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 2xl:px-12">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
          {/* Coluna esquerda — texto */}
          <div className="space-y-6">
            {/* H1 — principal */}
            <h1 className="text-5xl font-bold leading-tight text-gray-900 sm:text-6xl md:text-7xl">
              Seu ar-condicionado com problema?
            </h1>

            {/* Subtítulo */}
            <p className="text-xl leading-relaxed text-gray-700 md:text-2xl">
              Descubra o preço do seu serviço em <strong>5 perguntas rápidas</strong> e receba
              uma estimativa personalizada para Salvador e região.
            </p>

            {/* Microcopy de urgência */}
            <p className="text-base font-medium text-orange-heat-600">
              ✓ Orçamento grátis • ✓ Sem compromisso • ✓ Resposta rápida
            </p>

            {/* CTA Principal — laranja */}
            <div className="pt-4">
              <Button
                size="lg"
                className="rounded-full bg-orange-heat-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-heat-600 active:scale-95"
              >
                Descobrir meu preço →
              </Button>
            </div>

            {/* Social proof — badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="inline-block rounded-full bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-700">
                  ⭐ Mais de 500 clientes satisfeitos
                </p>
              </div>
              <div className="inline-block rounded-full bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-700">
                  🏆 10+ anos de experiência
                </p>
              </div>
            </div>
          </div>

          {/* Coluna direita — imagem (placeholder) */}
          <div className="hidden lg:block">
            <div className="relative h-96 w-full rounded-3xl bg-gradient-to-br from-sky-100 to-sky-200 shadow-lg">
              {/* Placeholder com ícone */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="h-40 w-40 text-sky-500/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>

              {/* Decoração — círculos flutuantes */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-300/20" />
              <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-orange-heat-200/20" />
            </div>
          </div>
        </div>

        {/* Seção responsiva mobile — apenas H1 + CTA */}
        <div className="lg:hidden">
          <div className="mt-8 flex flex-col items-center text-center">
            <div className="h-40 w-40 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200" />
            <p className="mt-4 text-sm text-gray-600">
              💡 Receba um orçamento personalizado em 2 minutos
            </p>
          </div>
        </div>
      </div>

      {/* Divisor da seção */}
      <div className="relative z-10 border-b border-gray-200" />
    </section>
  )
}
