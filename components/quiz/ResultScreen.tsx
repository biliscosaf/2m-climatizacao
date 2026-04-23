"use client"

// Tela de resultado do quiz — exibe estimativa de preço e captura lead
// Requisitos: orange-heat CTA, captura nome + WhatsApp, integração com API

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuizState } from "@/lib/hooks/useQuizState"
import type { QuizAnswers } from "@/lib/hooks/useQuizState"
import { MessageCircle, AlertCircle, CheckCircle } from "lucide-react"

const resultVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

// Mapear respostas para estimativa de preço (mock)
function estimatePrice(answers: QuizAnswers): {
  min: number
  max: number
  description: string
} {
  const basePrice = 150 // Base mínima

  // Adicionar preço por tipo de serviço (Q1)
  let servicePrice = 0
  switch (answers.q1) {
    case "cheiro-ruim":
      servicePrice = 80 // Limpeza
      break
    case "nao-resfria":
      servicePrice = 150 // Manutenção/reparo
      break
    case "instalacao":
      servicePrice = 300 // Instalação
      break
    case "manutencao":
      servicePrice = 100 // Manutenção preventiva
      break
    default:
      servicePrice = 100
  }

  // Adicionar preço por local (Q2)
  let locationPrice = 0
  switch (answers.q2) {
    case "cozinha":
      locationPrice = 50 // Maior complexidade
      break
    case "escritorio":
      locationPrice = 30
      break
    default:
      locationPrice = 0
  }

  // Adicionar preço por capacidade (Q3)
  let equipmentPrice = 0
  switch (answers.q3) {
    case "9000":
      equipmentPrice = 0
      break
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
  const maxPrice = Math.round(minPrice * 1.3) // Até 30% acima do mínimo

  return {
    min: minPrice,
    max: maxPrice,
    description: getServiceDescription(answers.q1),
  }
}

function getServiceDescription(service?: string): string {
  const descriptions: Record<string, string> = {
    "cheiro-ruim": "Limpeza e higienização do ar-condicionado",
    "nao-resfria": "Manutenção e reparo do equipamento",
    instalacao: "Instalação de novo ar-condicionado",
    manutencao: "Manutenção preventiva periódica",
  }
  return descriptions[service || ""] || "Serviço de ar-condicionado"
}

interface ResultScreenProps {
  answers: QuizAnswers
  isSubmitting: boolean
  error: string | null
  onReset: () => void
}

export function ResultScreen({ answers, isSubmitting, error, onReset }: ResultScreenProps) {
  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const { submitLead } = useQuizState()

  const estimate = estimatePrice(answers)

  // Formatar WhatsApp com máscara
  const formatWhatsApp = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length <= 2) return digits
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value)
    setWhatsapp(formatted)
  }

  const isFormValid = nome.trim().length > 0 && whatsapp.replace(/\D/g, "").length === 11

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    const whatsappUrl = await submitLead(nome, whatsapp)
    if (whatsappUrl) {
      setShowSuccess(true)
      // Redirecionar após 1.5s
      setTimeout(() => {
        window.location.href = whatsappUrl
      }, 1500)
    }
  }

  return (
    <motion.div
      variants={resultVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center"
    >
      <Card className="w-full max-w-2xl border-0 shadow-xl">
        {/* Conteúdo de Sucesso */}
        {showSuccess ? (
          <CardContent className="space-y-6 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                </div>
              </div>
            </motion.div>
            <div>
              <h3 className="text-h3 mb-2 font-semibold text-gray-900">
                Orçamento enviado!
              </h3>
              <p className="text-body text-gray-600">
                Você será redirecionado para o WhatsApp agora. Nossa equipe logo entrarão em contato.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="h-1 w-12 bg-sky-500" />
            </div>
          </CardContent>
        ) : (
          <>
            {/* Cabeçalho com estimativa */}
            <CardHeader className="space-y-4 border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-h3 mb-2 font-semibold text-gray-900">
                  Sua estimativa de preço
                </h2>
                <p className="text-body text-gray-600">{estimate.description}</p>
              </div>

              {/* Box de preço */}
              <div className="rounded-xl bg-orange-heat-50 p-6">
                <p className="text-center text-body-sm text-gray-600">Estimativa para:</p>
                <div className="mt-2 text-center">
                  <span className="text-4xl font-bold text-orange-heat-600">
                    R$ {estimate.min}
                  </span>
                  <span className="ml-2 text-lg text-gray-600">
                    a R$ {estimate.max}
                  </span>
                </div>
                <p className="mt-3 text-center text-body-sm text-gray-500">
                  Valor aproximado • Confirmado após avaliação do técnico
                </p>
              </div>
            </CardHeader>

            {/* Formulário de captura */}
            <CardContent className="space-y-5 p-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-lg bg-red-50 p-4"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                  <p className="text-body-sm text-red-700">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-label font-medium text-gray-900">
                    Seu nome
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: João Silva"
                    disabled={isSubmitting}
                    className="h-12 rounded-lg border-gray-200 px-4 text-base placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-2">
                  <Label
                    htmlFor="whatsapp"
                    className="text-label font-medium text-gray-900"
                  >
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
                    className="h-12 rounded-lg border-gray-200 px-4 text-base placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                  />
                  <p className="text-body-sm text-gray-500">
                    Precisamos confirmar seu número para enviar a estimativa
                  </p>
                </div>

                {/* CTA principal */}
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  size="lg"
                  className="w-full rounded-full bg-orange-heat-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-heat-600 disabled:bg-gray-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Falar agora no WhatsApp
                    </span>
                  )}
                </Button>

                {/* Aviso de segurança */}
                <p className="text-center text-body-sm text-gray-500">
                  Seus dados estão seguros e não será spam
                </p>
              </form>

              {/* Link para voltar */}
              <button
                onClick={onReset}
                disabled={isSubmitting}
                className="w-full py-2 text-center text-body-sm text-sky-600 transition-colors hover:text-sky-700 disabled:text-gray-400"
              >
                ← Voltar ao quiz
              </button>
            </CardContent>
          </>
        )}
      </Card>
    </motion.div>
  )
}
