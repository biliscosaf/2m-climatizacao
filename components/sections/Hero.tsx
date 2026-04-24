// Hero section — acima da dobra com gradient, H1, CTA pro quiz
// Server Component — renderizado no servidor, sem JS desnecessário

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getWhatsAppUrl } from "@/config/whatsapp"
import { CheckCircle2 } from "lucide-react"

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
              Instalação, Limpeza e Manutenção de Ar-Condicionado em Salvador
            </h1>

            {/* Subtítulo */}
            <p className="text-xl leading-relaxed text-gray-700 md:text-2xl">
              Atendimento rápido, serviço com garantia e orçamento direto pelo WhatsApp.
            </p>

            {/* Selos de confiança */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                <span className="text-sm font-medium text-gray-700">Orçamento grátis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                <span className="text-sm font-medium text-gray-700">Atendimento em Salvador e região</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                <span className="text-sm font-medium text-gray-700">Garantia no serviço</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                <span className="text-sm font-medium text-gray-700">Resposta rápida</span>
              </div>
            </div>

            {/* CTAs — WhatsApp principal + Ver serviços */}
            <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:gap-4">
              <a href={getWhatsAppUrl()}>
                <Button
                  size="lg"
                  className="w-full rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95 sm:w-auto"
                >
                  💬 Pedir orçamento no WhatsApp
                </Button>
              </a>
              <a href="#servicos">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full border-2 border-gray-300 px-8 py-4 text-base font-semibold text-gray-900 transition-all hover:border-sky-500 hover:bg-sky-50 sm:w-auto"
                >
                  Ver nossos serviços →
                </Button>
              </a>
            </div>

            {/* Social proof — badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="inline-block rounded-full bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-700">
                  ⭐ 500+ clientes satisfeitos
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
                src="/images/hero/tecnico-instalando.jpg"
                alt="Técnico instalando ar-condicionado em Salvador"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay escuro leve para melhorar leitura — premium effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10" />
            </div>
          </div>
        </div>

        {/* Seção responsiva mobile — apenas imagem + microcopy */}
        <div className="lg:hidden">
          <div className="mt-8 flex flex-col items-center text-center">
            <div className="relative h-48 w-full overflow-hidden rounded-2xl shadow-md">
              <Image
                src="/images/hero/tecnico-instalando.jpg"
                alt="Técnico instalando ar-condicionado em Salvador"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/10" />
            </div>
            <p className="mt-4 text-sm font-medium text-gray-600">
              ✨ Especialistas prontos para atender em 4 horas
            </p>
          </div>
        </div>
      </div>

      {/* Divisor da seção */}
      <div className="relative z-10 border-b border-gray-200" />
    </section>
  )
}
