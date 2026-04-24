"use client"

// Seção "Por que escolher a 2M?" — 6 cards com benefícios reais
// Client Component — usa Framer Motion para animações

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Zap, Shield, Users, Wrench, Clock } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const benefits = [
  {
    id: "speed",
    title: "Atendimento Rápido",
    description: "Atendemos emergências em até 4 horas. Não deixamos você na mão quando mais precisa.",
    icon: Clock,
  },
  {
    id: "clean",
    title: "Serviço Limpo",
    description: "Técnicos profissionais que respeitam sua casa. Deixamos tudo limpo e organizado.",
    icon: CheckCircle2,
  },
  {
    id: "explain",
    title: "Explicação Clara",
    description: "Explicamos o problema antes de começar. Você entende exatamente o que está sendo feito.",
    icon: Users,
  },
  {
    id: "warranty",
    title: "Garantia Completa",
    description: "90 dias de garantia no serviço. Se houver problema, retornamos sem custo adicional.",
    icon: Shield,
  },
  {
    id: "fair",
    title: "Preço Justo",
    description: "Orçamento transparente. Sem surpresas ou cobranças escondidas.",
    icon: Zap,
  },
  {
    id: "certified",
    title: "Técnicos Experientes",
    description: "10+ anos de experiência. Equipe certificada e especializada em ar-condicionado.",
    icon: Wrench,
  },
]

export function Testimonials() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 2xl:px-12">
        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Por que nossos clientes escolhem a 2M?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Mais de 500 clientes satisfeitos em Salvador confiam em nossa qualidade
          </p>
        </div>

        {/* Grid de benefícios — mobile-first */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <motion.div key={benefit.id} variants={itemVariants}>
                <Card className="flex flex-col h-full border border-gray-100 rounded-xl transition-all hover:shadow-lg hover:border-sky-500 overflow-hidden">
                  {/* Header com ícone e borda azul */}
                  <div className="border-l-4 border-sky-500 bg-sky-50 p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-sky-500">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                    </div>
                  </div>

                  {/* Corpo — descrição */}
                  <CardContent className="flex-1 p-6">
                    <p className="leading-relaxed text-gray-700">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
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
              <p className="mt-2 text-gray-700">Clientes satisfeitos em Salvador</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-sky-600">10+</p>
              <p className="mt-2 text-gray-700">Anos de experiência</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-sky-600">4.9⭐</p>
              <p className="mt-2 text-gray-700">Avaliação média dos clientes</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
