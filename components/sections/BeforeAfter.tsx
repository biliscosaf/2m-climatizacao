"use client"

// Seção Before/After — slider comparativo com drag
// Client Component para interatividade
// Mobile: stacked + toggle • Desktop: slider com handle

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(true)

  // Detectar tamanho da tela
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleTouchStart = () => setIsDragging(true)
  const handleTouchEnd = () => setIsDragging(false)

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const position = ((clientX - rect.left) / rect.width) * 100

    setSliderPosition(Math.max(0, Math.min(100, position)))
  }

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Veja a Transformação
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Antes e depois de nossos serviços de limpeza e manutenção
          </p>
        </div>

        {/* Desktop — Slider comparativo */}
        {!isMobile ? (
          <motion.div
            ref={containerRef}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-gray-200"
            style={{ aspectRatio: "16/9" }}
            onMouseMove={handleMove}
            onMouseLeave={() => setIsDragging(false)}
            onTouchMove={handleMove}
          >
            {/* Imagem ANTES */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="mx-auto h-24 w-24 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4C6.48 4 2 7.13 2 11c0 2.29 1.61 4.3 4 5.3V20c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-3h4v3c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-3.7c2.39-1 4-3.01 4-5.3 0-3.87-4.48-7-10-7zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
                <p className="mt-4 text-lg font-semibold text-gray-700">Antes</p>
                <p className="text-sm text-gray-600">Equipamento sujo ou danificado</p>
              </div>
            </div>

            {/* Imagem DEPOIS — sobreposto */}
            <div
              className="absolute inset-0 overflow-hidden bg-gradient-to-br from-emerald-300 to-sky-300 flex items-center justify-center"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="text-center">
                <svg
                  className="mx-auto h-24 w-24 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <p className="mt-4 text-lg font-semibold text-gray-700">Depois</p>
                <p className="text-sm text-gray-600">Limpo, funcionando e eficiente</p>
              </div>
            </div>

            {/* Handle do slider — barra vertical com ícone */}
            <motion.div
              className="absolute inset-y-0 w-1 cursor-col-resize bg-white shadow-lg"
              style={{ left: `${sliderPosition}%`, x: "-50%" }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onMouseUp={handleMouseUp}
              onTouchEnd={handleTouchEnd}
            >
              {/* Círculo no centro do handle */}
              <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-sky-500 shadow-lg">
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* Setas laterais */}
                    <path d="M15 4h-2v16h2V4zm4 6h-2v4h2v-4zM3 10h2v4H3v-4z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Mobile — Cards empilhados com toggle */
          <div className="space-y-6">
            {/* Antes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl bg-gray-300"
              style={{ aspectRatio: "16/9" }}
            >
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <svg
                    className="mx-auto h-20 w-20 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4C6.48 4 2 7.13 2 11c0 2.29 1.61 4.3 4 5.3V20c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-3h4v3c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-3.7c2.39-1 4-3.01 4-5.3 0-3.87-4.48-7-10-7zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                  </svg>
                  <p className="mt-3 text-lg font-semibold text-gray-700">Antes</p>
                  <p className="text-sm text-gray-600">Equipamento sujo</p>
                </div>
              </div>
            </motion.div>

            {/* Depois */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="overflow-hidden rounded-2xl bg-emerald-200"
              style={{ aspectRatio: "16/9" }}
            >
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <svg
                    className="mx-auto h-20 w-20 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <p className="mt-3 text-lg font-semibold text-gray-700">Depois</p>
                  <p className="text-sm text-gray-600">Limpo e eficiente</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Informação adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 rounded-xl bg-white p-6 shadow-md md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-orange-heat-600">85%</h3>
              <p className="mt-2 text-gray-700">
                Melhora na eficiência do equipamento
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-orange-heat-600">30%</h3>
              <p className="mt-2 text-gray-700">
                Redução no consumo de energia
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-orange-heat-600">5+</h3>
              <p className="mt-2 text-gray-700">
                Anos adicionais de vida útil
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
