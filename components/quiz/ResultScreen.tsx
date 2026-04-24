"use client"

// Tela de Resultado — Estimativa de Preço + Captura de Lead
// Design premium com mensagem WhatsApp inteligente baseada nas respostas

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQuizState } from "@/lib/hooks/useQuizState"
import type { QuizAnswers } from "@/lib/hooks/useQuizState"
import { MessageCircle, AlertCircle, CheckCircle, Zap } from "lucide-react"

const resultVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

// Estimativa inteligente de preço
function estimatePrice(answers: QuizAnswers): {
  min: number
  max: number
  description: string
} {
  const basePrice = 150
  let servicePrice = 0

  switch (answers.q1) {
    case "cheiro-ruim":
      servicePrice = 80
      break
    case "nao-resfria":
      servicePrice = 150
      break
    case "instalacao":
      servicePrice = 300
      break
    case "manutencao":
      servicePrice = 100
      break
    default:
      servicePrice = 100
  }

  let locationPrice = 0
  switch (answers.q2) {
    case "cozinha":
      locationPrice = 50
      break
    case "escritorio":
      locationPrice = 30
      break
    default:
      locationPrice = 0
  }

  let equipmentPrice = 0
  switch (answers.q3) {
    case "12000":
      equipmentPrice = 20
      break
    case "18000":
      equipmentPrice = 50
      break
    case "24000+":
      equipmentPrice = 100
      break
    default:
      equipmentPrice = 0
  }

  const minPrice = basePrice + servicePrice + locationPrice + equipmentPrice
  const maxPrice = Math.round(minPrice * 1.3)

  return {
    min: minPrice,
    max: maxPrice,
    description: getServiceDescription(answers.q1),
  }
}

// Descrição do serviço
function getServiceDescription(service?: string): string {
  const descriptions: Record<string, string> = {
    "cheiro-ruim": "Limpeza e higienização profissional",
    "nao-resfria": "Diagnóstico e reparo do equipamento",
    instalacao: "Instalação de novo ar-condicionado",
    manutencao: "Manutenção preventiva periódica",
  }
  return descriptions[service || ""] || "Serviço de ar-condicionado"
}

// Construir mensagem WhatsApp inteligente a partir das respostas
function buildWhatsAppMessage(answers: QuizAnswers): string {
  const parts: string[] = [
    "Oi! Estou interessado em um orçamento para meu ar-condicionado.",
  ]

  // Adicionar detalhes baseado nas respostas
  if (answers.q1) {
    const problemMap: Record<string, string> = {
      "cheiro-ruim": "Ele está com cheiro ruim",
      "nao-resfria": "Ele não está resfriando direito",
      instalacao: "Preciso instalar um novo",
      manutencao: "Quero fazer uma manutenção preventiva",
    }
    if (problemMap[answers.q1]) {
      parts.push(problemMap[answers.q1] + ".")
    }
  }

  if (answers.q2) {
    const locationMap: Record<string, string> = {
      sala: "Ele fica na sala",
      quarto: "Ele fica no quarto",
      cozinha: "Ele fica na cozinha",
      "escritorio-home": "Ele fica no home office",
      comercio: "É para um ambiente comercial",
    }
    if (locationMap[answers.q2]) {
      parts.push(locationMap[answers.q2] + ".")
    }
  }

  if (answers.q5) {
    parts.push(`Moro em ${answers.q5}.`)
  }

  parts.push("Qual seria o valor aproximado?")

  return parts.join(" ")
}

interface ResultScreenProps {
  answers: QuizAnswers
  isSubmitting: boolean
  error: string | null
  onReset: () => void
}

export function ResultScreen({
  answers,
  isSubmitting,
  error,
  onReset,
}: ResultScreenProps) {
  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const { submitLead } = useQuizState()

  const estimate = estimatePrice(answers)
  const whatsappMessage = buildWhatsAppMessage(answers)

  const formatWhatsApp = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length <= 2) return digits
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsapp(formatWhatsApp(e.target.value))
  }

  const isFormValid =
    nome.trim().length > 0 && whatsapp.replace(/\D/g, "").length === 11

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    const whatsappUrl = await submitLead(nome, whatsapp)
    if (whatsappUrl) {
      setShowSuccess(true)
      setTimeout(() => {
        window.location.href = whatsappUrl
      }, 1500)
    }
  }

  // ========== TELA DE SUCESSO ==========
  if (showSuccess) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-12">
        <motion.div
          variants={resultVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl md:p-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
          </motion.div>

          <h2 className="mb-3 text-3xl font-bold text-gray-900">
            Perfeito! 🎉
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            Você está sendo redirecionado para o WhatsApp agora. Nossa equipe entrará em contato em breve!
          </p>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">
              Sua estimativa de preço foi enviada.
            </p>
          </div>
        </motion.div>
      </section>
    )
  }

  // ========== TELA DE FORMULÁRIO ==========
  return (
    <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <motion.div
          variants={resultVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl bg-white p-8 shadow-xl md:p-10"
        >
          {/* Cabeçalho com estimativa */}
          <div className="mb-8 space-y-6 border-b border-gray-100 pb-8">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                Sua Estimativa
              </h2>
              <p className="text-lg text-gray-600">{estimate.description}</p>
            </div>

            {/* Box de preço premium */}
            <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 p-8 text-center">
              <p className="mb-2 text-sm font-semibold text-gray-600">
                Valor aproximado:
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-sky-600">
                  R$ {estimate.min}
                </span>
                <span className="text-xl text-gray-600">a R$ {estimate.max}</span>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Valor confirmado após avaliação do técnico
              </p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 rounded-lg bg-red-50 p-4"
              >
                <AlertCircle className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" />
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}

            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome" className="font-semibold text-gray-900">
                Seu Nome
              </Label>
              <Input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="João Silva"
                disabled={isSubmitting}
                className="h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="font-semibold text-gray-900">
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                value={whatsapp}
                onChange={handleWhatsAppChange}
                placeholder="(71) 99999-9999"
                disabled={isSubmitting}
                maxLength={16}
                className="h-12 rounded-xl border-2 border-gray-200 px-4 text-base focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
              <p className="text-xs text-gray-500">
                Para enviarmos sua estimativa de forma personalizada
              </p>
            </div>

            {/* CTA principal */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`group relative w-full overflow-hidden rounded-xl py-4 font-semibold text-white transition-all ${
                isFormValid && !isSubmitting
                  ? "bg-gradient-to-r from-sky-500 to-emerald-500 hover:shadow-lg active:scale-95"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Receber Orçamento no WhatsApp
                </span>
              )}
            </button>

            {/* Garantia */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Zap className="h-4 w-4 text-sky-500" />
              <span>Sem spam ou ligações indesejadas</span>
            </div>
          </form>

          {/* Voltar */}
          <button
            onClick={onReset}
            disabled={isSubmitting}
            className="mt-6 w-full py-2 text-center text-sm text-sky-600 transition-colors hover:text-sky-700 disabled:text-gray-400"
          >
            ← Voltar para mudar respostas
          </button>
        </motion.div>
      </div>
    </section>
  )
}
