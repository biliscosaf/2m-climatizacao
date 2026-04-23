"use client"

// Mapa de cobertura — Leaflet + OpenStreetMap
// Client Component — import dinâmico para não bloquear render
// Mostra bairros atendidos com ícones

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { AREAS_ATENDIMENTO, SALVADOR_CENTER } from "@/config/areas"

// Import dinâmico do mapa para não bloquear render inicial
const DynamicMap = dynamic(
  () => import("./MapContent").then((mod) => mod.MapContent),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 items-center justify-center rounded-xl bg-gray-100">
        <p className="text-gray-600">Carregando mapa...</p>
      </div>
    ),
  }
)

export function CoverageMap() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Área de Atendimento
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Verifique se atendemos sua região
          </p>
        </div>

        {/* Mapa */}
        <div className="mb-12 overflow-hidden rounded-2xl shadow-lg">
          <Suspense
            fallback={
              <div className="flex h-96 items-center justify-center bg-gray-100">
                <p className="text-gray-600">Carregando mapa...</p>
              </div>
            }
          >
            <DynamicMap />
          </Suspense>
        </div>

        {/* Lista de bairros — grid de 2 colunas */}
        <div className="rounded-xl bg-gray-50 p-6 md:p-8">
          <h3 className="mb-6 text-2xl font-semibold text-gray-900">
            Bairros atendidos
          </h3>

          {/* Salvador — central */}
          <div className="mb-6">
            <h4 className="mb-4 font-semibold text-gray-900">Salvador — Centro</h4>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {AREAS_ATENDIMENTO.filter((a) => a.grupo === "salvador-central").map(
                (area) => (
                  <div key={area.nome} className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                    <span className="text-gray-700">{area.nome}</span>
                    {area.taxaDeslocamento > 0 && (
                      <span className="text-xs text-gray-500">
                        (+R$ {area.taxaDeslocamento})
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Salvador — periferia */}
          <div className="mb-6">
            <h4 className="mb-4 font-semibold text-gray-900">Salvador — Periferia</h4>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {AREAS_ATENDIMENTO.filter((a) => a.grupo === "salvador-periferia").map(
                (area) => (
                  <div key={area.nome} className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                    <span className="text-gray-700">{area.nome}</span>
                    {area.taxaDeslocamento > 0 && (
                      <span className="text-xs text-gray-500">
                        (+R$ {area.taxaDeslocamento})
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Região metropolitana */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Região Metropolitana</h4>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {AREAS_ATENDIMENTO.filter(
                (a) => a.grupo === "regiao-metropolitana"
              ).map((area) => (
                <div key={area.nome} className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-orange-heat-500" />
                  <span className="text-gray-700">{area.nome}</span>
                  {area.taxaDeslocamento > 0 && (
                    <span className="text-xs text-gray-500">
                      (+R$ {area.taxaDeslocamento})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Aviso */}
          <p className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
            💡 Não vê sua região? Entre em contato conosco. Podemos estender o atendimento
            em casos específicos.
          </p>
        </div>
      </div>
    </section>
  )
}
