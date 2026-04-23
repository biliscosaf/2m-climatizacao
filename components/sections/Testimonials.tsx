// Seção de depoimentos — 3+ cards com foto, nome, localização e stars
// Server Component — renderizado estaticamente
// ⚠️ PLACEHOLDER — depoimentos fictícios para desenvolvimento

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import { TESTIMONIALS } from "@/content/testimonials"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export function Testimonials() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            O que nossos clientes dizem
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Confira os depoimentos de quem confiou na 2M Climatização
          </p>
        </div>

        {/* AVISO: DEPOIMENTOS PLACEHOLDER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4"
        >
          <p className="text-sm font-medium text-amber-900">
            ⚠️ Em desenvolvimento: Estes depoimentos são fictícios e usados apenas para demonstração.
            Serão substituídos por depoimentos reais de clientes antes do go-live.
          </p>
        </motion.div>

        {/* Grid de cards — mobile-first */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="flex flex-col h-full border border-gray-100 rounded-xl shadow-md transition-all hover:shadow-lg hover:border-sky-500">
                {/* Header com borda azul esquerda */}
                <div className="border-l-4 border-sky-500 pl-4 pt-4">
                  {/* Avatar + Nome + Localização */}
                  <CardHeader className="p-0 pb-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar gerado com iniciais */}
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 ring-2 ring-sky-500 ring-offset-2">
                        <span className="text-sm font-bold text-sky-700">
                          {testimonial.avatarInitials}
                        </span>
                      </div>

                      {/* Nome + Bairro */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {testimonial.nome}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.bairro} • {testimonial.servico}
                        </p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="mt-3 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "fill-orange-heat-500 text-orange-heat-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </CardHeader>
                </div>

                {/* Corpo — texto do depoimento */}
                <CardContent className="flex-1 pt-4">
                  <p className="leading-relaxed text-gray-700 italic">
                    "{testimonial.texto}"
                  </p>
                </CardContent>

                {/* Footer — badge do serviço */}
                <div className="border-t border-gray-100 p-4">
                  <span className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                    {testimonial.servico}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Estatísticas de satisfação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 rounded-2xl bg-sky-50 p-8"
        >
          <div className="grid gap-6 text-center md:grid-cols-3">
            <div>
              <p className="text-4xl font-bold text-sky-600">500+</p>
              <p className="mt-2 text-gray-700">Clientes satisfeitos</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-sky-600">4.9⭐</p>
              <p className="mt-2 text-gray-700">Avaliação média</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-sky-600">98%</p>
              <p className="mt-2 text-gray-700">Taxa de recomendação</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
