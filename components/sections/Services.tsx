// Seção de serviços — 6 cards com imagens, preços e CTAs
// Server Component — cards renderizados estaticamente
// Mobile: 1 coluna • Tablet: 2 colunas • Desktop: 3 colunas

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { SERVICES } from "@/content/services"
import * as LucideIcons from "lucide-react"
import { getWhatsAppUrl, getServiceMessage } from "@/config/whatsapp"

// Mapeamento de serviços para imagens
const SERVICE_IMAGES: Record<string, string> = {
  instalacao: "/images/servicos/tecnico-instalando.jpg",
  limpeza: "/images/servicos/limpeza-capa.jpg",
  manutencao: "/images/servicos/tecnico-abrindo-ar.jpg",
  recargaGas: "/images/servicos/tecnico-recarregando.jpg",
  conserto: "/images/servicos/tecnico-consertando.jpg",
  diagnostico: "/images/servicos/diagnostico-ar.jpg",
}

export function Services() {
  return (
    <section id="servicos" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
        {/* Cabeçalho da seção */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Nossos Serviços
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Soluções completas para manutenção e reparos do seu ar-condicionado
          </p>
        </div>

        {/* Grid de cards — mobile-first */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            // Resolver ícone dinâmico
            const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[
              service.icon as keyof typeof LucideIcons
            ]

            return (
              <Card
                key={service.id}
                className="group flex flex-col overflow-hidden border border-gray-100 rounded-xl transition-all duration-300 hover:border-sky-500 hover:shadow-lg"
              >
                {/* Imagem do serviço */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={SERVICE_IMAGES[service.id] || "/images/servicos/placeholder.jpg"}
                    alt={`${service.title} - Ar-condicionado em Salvador`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay no hover */}
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
                </div>

                {/* Header com ícone */}
                <CardHeader className="pb-4">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-sky-50 transition-colors group-hover:bg-sky-100">
                    {IconComponent ? (
                      <IconComponent className="h-8 w-8 text-sky-600" />
                    ) : (
                      <div className="h-8 w-8 bg-sky-300" />
                    )}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                {/* Descrição */}
                <CardContent className="flex-1 pb-4">
                  <p className="text-sm leading-relaxed text-gray-700">
                    {service.description}
                  </p>
                </CardContent>

                {/* Footer com CTA */}
                <CardFooter className="border-t border-gray-100 pt-4">
                  <a
                    href={getWhatsAppUrl(getServiceMessage(service.id))}
                    className="w-full"
                  >
                    <Button
                      variant="link"
                      className="w-full justify-start p-0 text-sky-600 hover:text-sky-700 hover:underline"
                    >
                      {service.ctaLabel} →
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* CTA final da seção */}
        <div className="mt-12 rounded-2xl bg-sky-50 p-8 text-center">
          <h3 className="mb-2 text-2xl font-semibold text-gray-900">
            Não viu o que procura?
          </h3>
          <p className="mb-6 text-gray-700">
            Nosso técnico pode resolver a maioria dos problemas. Clique abaixo para conversar.
          </p>
          <a href={getWhatsAppUrl()}>
            <Button
              size="lg"
              className="rounded-full bg-emerald-500 px-8 py-3 text-white transition-colors hover:bg-emerald-600"
            >
              💬 Converse com um especialista →
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
