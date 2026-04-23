// Seção de serviços — 6 cards com ícones, preços e CTAs
// Server Component — cards renderizados estaticamente
// Mobile: 1 coluna • Tablet: 2 colunas • Desktop: 3 colunas

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SERVICES } from "@/content/services"
import * as LucideIcons from "lucide-react"

export function Services() {
  return (
    <section className="bg-white py-16 md:py-24">
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
                  <Button
                    variant="link"
                    className="w-full justify-start p-0 text-sky-600 hover:text-sky-700 hover:underline"
                  >
                    {service.ctaLabel} →
                  </Button>
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
          <Button
            size="lg"
            className="rounded-full bg-orange-heat-500 px-8 py-3 text-white transition-colors hover:bg-orange-heat-600"
          >
            Converse com um especialista →
          </Button>
        </div>
      </div>
    </section>
  )
}
