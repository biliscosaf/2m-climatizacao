// Hero section — acima da dobra com gradient, H1, CTA pro quiz
// Server Component — renderizado no servidor, sem JS desnecessário

import { Button } from "@/components/ui/button"
import Image from "next/image"

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

          {/* Coluna direita — imagem real */}
          <div className="hidden lg:block">
            <div className="relative h-96 w-full overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop&q=80"
                alt="Técnico realizando manutenção de ar-condicionado"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay com gradiente */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
            </div>
          </div>
        </div>

        {/* Seção responsiva mobile — apenas H1 + CTA */}
        <div className="lg:hidden">
          <div className="mt-8 flex flex-col items-center text-center">
            <div className="relative h-40 w-40 overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop&q=80"
                alt="Técnico em ação"
                fill
                className="object-cover"
              />
            </div>
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
