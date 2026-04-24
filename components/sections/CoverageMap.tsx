"use client"

// Área de cobertura — lista bonita de cidades e bairros
// Client Component para scroll suave
// Removido Leaflet (problema Windows/SSR)

import { AREAS_ATENDIMENTO } from "@/config/areas"
import { MapPin } from "lucide-react"
import { getWhatsAppUrl } from "@/config/whatsapp"
import { Button } from "@/components/ui/button"

export function CoverageMap() {
  // Agrupar áreas por região
  const salvadorCentral = AREAS_ATENDIMENTO.filter((a) => a.grupo === "salvador-central")
  const salvadorPeriferia = AREAS_ATENDIMENTO.filter((a) => a.grupo === "salvador-periferia")
  const regiaoMetropolitana = AREAS_ATENDIMENTO.filter(
    (a) => a.grupo === "regiao-metropolitana"
  )

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Área de Atendimento
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Atendemos toda Salvador e região metropolitana
          </p>
        </div>

        {/* Cards com localizações */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Salvador — central */}
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-sky-50 to-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Salvador — Centro</h3>
            </div>
            <div className="space-y-3">
              {salvadorCentral.map((area) => (
                <div key={area.nome} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{area.nome}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-600 italic">✓ Sem taxa de deslocamento</p>
          </div>

          {/* Salvador — periferia */}
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Salvador — Periferia</h3>
            </div>
            <div className="space-y-3">
              {salvadorPeriferia.map((area) => (
                <div key={area.nome} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{area.nome}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-600 italic">✓ Atendimento rápido</p>
          </div>

          {/* Região metropolitana */}
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Região Metropolitana</h3>
            </div>
            <div className="space-y-3">
              {regiaoMetropolitana.map((area) => (
                <div key={area.nome} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    {area.nome}
                    {area.taxaDeslocamento > 0 && (
                      <span className="ml-2 text-xs text-gray-500">
                        (+R$ {area.taxaDeslocamento})
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-600 italic">✓ Taxa de deslocamento pode aplicar</p>
          </div>
        </div>

        {/* Aviso e CTA final */}
        <div className="mt-12 rounded-2xl bg-blue-50 p-8 text-center border border-blue-200">
          <h3 className="mb-3 text-xl font-semibold text-gray-900">
            Não vê sua região?
          </h3>
          <p className="mb-6 text-gray-700">
            Podemos estender o atendimento em casos específicos. Consulte-nos pelo WhatsApp!
          </p>
          <a href={getWhatsAppUrl("Olá! Gostaria de consultar disponibilidade de atendimento para minha região.")}>
            <Button
              size="lg"
              className="rounded-full bg-emerald-500 px-8 py-3 text-white transition-colors hover:bg-emerald-600"
            >
              💬 Consultar disponibilidade
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
