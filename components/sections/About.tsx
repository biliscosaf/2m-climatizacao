"use client"

// Seção About — história da empresa + foto do técnico + diferenciais
// Client Component — usa Framer Motion para animações

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"

const contentVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const imageVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function About() {
  const differentials = [
    "Técnicos certificados e experientes",
    "Atendimento no mesmo dia em emergências",
    "10+ anos de atuação em Salvador",
    "Garantia de serviço de até 12 meses",
    "Equipamentos e materiais de qualidade",
    "Preços justos e sem surpresas",
  ]

  return (
    <section className="bg-sky-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
        <motion.div
          className="grid gap-8 lg:grid-cols-2 lg:items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Coluna esquerda — texto + diferenciais */}
          <motion.div className="space-y-6" variants={contentVariants}>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
                Quem é a 2M Climatização?
              </h2>
              <div className="mt-2 h-1 w-16 bg-orange-heat-500" />
            </div>

            <p className="text-lg leading-relaxed text-gray-700">
              Somos uma empresa especializada em soluções de ar-condicionado para Salvador e região.
              Nascemos em 2014 com a missão de garantir que todo cliente tenha acesso a um serviço
              de qualidade, rápido e com preço justo.
            </p>

            <p className="text-lg leading-relaxed text-gray-700">
              Nosso time é formado por técnicos certificados, apaixonados pelo que fazem.
              Atendemos desde residências até grandes comerciais e empresas, sempre com profissionalismo
              e atenção aos detalhes.
            </p>

            {/* Diferenciais */}
            <div className="space-y-3 pt-4">
              {differentials.map((diff, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sky-500">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-base font-medium text-gray-900">{diff}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button
                size="lg"
                className="rounded-full bg-orange-heat-500 px-8 py-4 text-white transition-colors hover:bg-orange-heat-600"
              >
                Solicitar orçamento grátis →
              </Button>
            </div>
          </motion.div>

          {/* Coluna direita — foto do técnico */}
          <motion.div
            className="flex justify-center"
            variants={imageVariants}
          >
            <div className="relative w-full max-w-md">
              {/* Imagem real */}
              <div className="aspect-square overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=600&h=600&fit=crop&q=80"
                  alt="Técnico especializado em ar-condicionado"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Decoração — badge de informação */}
              <motion.div
                className="absolute -bottom-4 -right-4 rounded-xl bg-white px-6 py-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-center">
                  <span className="block text-2xl font-bold text-orange-heat-600">10+</span>
                  <span className="text-sm text-gray-600">Anos de experiência</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Seção de confiança — clientes + certificados */}
        <motion.div
          className="mt-12 rounded-2xl bg-white p-8 shadow-lg md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid gap-8 text-center md:grid-cols-2">
            <div>
              <p className="text-4xl font-bold text-sky-600">500+</p>
              <p className="mt-2 text-gray-700">Clientes atendidos</p>
              <p className="mt-1 text-sm text-gray-600">em toda Salvador e região</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-sky-600">4.9⭐</p>
              <p className="mt-2 text-gray-700">Avaliação média</p>
              <p className="mt-1 text-sm text-gray-600">baseada em 200+ avaliações</p>
            </div>
          </div>

          {/* Certificados/badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="rounded-lg bg-sky-50 px-4 py-2">
              <p className="text-sm font-medium text-sky-700">✓ Empresa registrada</p>
            </div>
            <div className="rounded-lg bg-emerald-50 px-4 py-2">
              <p className="text-sm font-medium text-emerald-700">✓ Técnicos certificados</p>
            </div>
            <div className="rounded-lg bg-orange-50 px-4 py-2">
              <p className="text-sm font-medium text-orange-700">✓ LGPD compliant</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
