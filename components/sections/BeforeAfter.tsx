"use client"

// Seção Before/After — slider comparativo com drag
// Client Component para interatividade
// Mobile: stacked + toggle • Desktop: slider com handle

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

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
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1573919502519-69613ad0cf9d?w=800&h=450&fit=crop&q=80"
                alt="Ar-condicionado sujo antes da limpeza"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/50 px-3 py-2 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">Antes — Sujo</p>
              </div>
            </div>

            {/* Imagem DEPOIS — sobreposto */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src="https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&h=450&fit=crop&q=80"
                alt="Ar-condicionado limpo após manutenção"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-green-600/80 px-3 py-2 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">Depois — Limpo</p>
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
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1573919502519-69613ad0cf9d?w=400&h=225&fit=crop&q=80"
                alt="Antes da limpeza"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 rounded-lg bg-black/50 px-2 py-1 backdrop-blur-sm">
                <p className="text-xs font-semibold text-white">Antes — Sujo</p>
              </div>
            </motion.div>

            {/* Depois */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400&h=225&fit=crop&q=80"
                alt="Depois da limpeza"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 rounded-lg bg-green-600/80 px-2 py-1 backdrop-blur-sm">
                <p className="text-xs font-semibold text-white">Depois — Limpo</p>
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
