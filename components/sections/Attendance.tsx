// Seção de Atendimento — confiança e relacionamento
// Server Component com imagem de técnico com cliente

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getWhatsAppUrl } from "@/config/whatsapp"
import { Heart, Users, Clock } from "lucide-react"

export function Attendance() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
          {/* Coluna esquerda — imagem */}
          <div className="order-2 lg:order-1">
            <div className="relative h-96 w-full overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/atendimento/tecnico-com-cliente.jpg"
                alt="Técnico apertando a mão do cliente em Salvador"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/10" />
            </div>
          </div>

          {/* Coluna direita — conteúdo */}
          <div className="order-1 space-y-6 lg:order-2">
            <div>
              <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                Atendimento que Você Confia
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Nossos técnicos são treinados para oferecer soluções rápidas, honestas e com qualidade garantida.
              </p>
            </div>

            {/* Benefícios com ícones */}
            <div className="space-y-4">
              {/* Atendimento Rápido */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                    <Clock className="h-6 w-6 text-sky-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Atendimento em até 4 horas</h3>
                  <p className="text-sm text-gray-600">Em Salvador e região, no melhor horário para você</p>
                </div>
              </div>

              {/* Garantia Total */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <Heart className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Garantia 100% no serviço</h3>
                  <p className="text-sm text-gray-600">Se algo não funcionar, refazemos sem custo adicional</p>
                </div>
              </div>

              {/* Técnicos Experientes */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-heat-100">
                    <Users className="h-6 w-6 text-orange-heat-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">10+ anos de experiência</h3>
                  <p className="text-sm text-gray-600">Técnicos qualificados que resolvem qualquer problema</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a href={getWhatsAppUrl()}>
                <Button
                  size="lg"
                  className="rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
                >
                  💬 Agende uma visita
                </Button>
              </a>
            </div>

            {/* Social proof */}
            <div className="border-t border-gray-100 pt-6">
              <p className="mb-3 text-sm font-medium text-gray-600">Avaliação dos clientes:</p>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">⭐</span>
                  ))}
                </div>
                <span className="font-semibold text-gray-900">4.9/5</span>
                <span className="text-sm text-gray-600">(500+ clientes)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
