"use client"

// Fluxo de Conversão de Alta Performance
// Design: Aplicativo profissional (não formulário)
// Copy: Natural, direto, humano
// Psicologia: Micro-compromissos + redução de esforço

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useQuizState } from "@/lib/hooks/useQuizState"
import { QUIZ_QUESTIONS } from "@/content/quiz"
import { BAIRROS_QUIZ_COM_OUTRO as areas } from "@/config/areas"
import { ResultScreen } from "./ResultScreen"
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react"

// Animações suaves
const containerVariants = {
  enter: {
    opacity: 0,
    y: 20,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
}

const buttonVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 },
}

export function ConversionFlow() {
  const { state, startQuiz, answerQuestion, goBack, reset } = useQuizState()
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  // Preencher opções dinâmicas (Q5 — bairros)
  const questions = QUIZ_QUESTIONS.map((q) => {
    if (q.id === "q5") {
      return {
        ...q,
        opcoes: areas.map((area) => ({
          value: area.name,
          label: area.name,
        })),
      }
    }
    return q
  })

  // ========== TELA INICIAL (Antes de iniciar) ==========
  if (state.step === "idle") {
    return (
      <section id="quiz" className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 2xl:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-white p-8 shadow-xl md:p-12"
          >
            {/* Ícone no topo */}
            <div className="mb-6 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100">
                <CheckCircle2 className="h-8 w-8 text-sky-600" />
              </div>
            </div>

            {/* Conteúdo */}
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Receba um Orçamento Personalizado
              </h2>
              <p className="text-lg text-gray-600">
                Responda 5 perguntas rápidas e já teremos uma solução para você.
              </p>
            </div>

            {/* Benefícios em linha */}
            <div className="my-8 space-y-3 border-y border-gray-200 py-6">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-lg">⚡</span> Leva apenas 2 minutos
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-lg">✓</span> Sem compromisso
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-lg">💬</span> Você recebe no WhatsApp
              </div>
            </div>

            {/* CTA principal */}
            <button
              onClick={startQuiz}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 px-8 py-4 font-semibold text-white transition-all hover:shadow-lg active:scale-95"
            >
              <div className="flex items-center justify-center gap-2">
                Começar Agora
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  // ========== TELA DE RESULTADO ==========
  if (state.step === "result" || state.step === "redirecting") {
    return (
      <ResultScreen
        answers={state.answers}
        isSubmitting={state.isSubmitting}
        error={state.error}
        onReset={reset}
      />
    )
  }

  // ========== TELA DE PERGUNTA ==========
  const currentQuestion = questions.find((q) => q.id === state.step)
  if (!currentQuestion) return null

  const progressPercent = (state.currentQuestion / 5) * 100
  const isLastQuestion = state.currentQuestion === 5

  return (
    <section id="quiz" className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 2xl:px-12">
        {/* Header com progresso */}
        <div className="mb-8 space-y-4">
          {/* Progresso numérico */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">
              Pergunta {state.currentQuestion} de 5
            </span>
            <span className="text-sm font-medium text-emerald-600">
              {Math.round(progressPercent)}% concluído
            </span>
          </div>

          {/* Barra de progresso */}
          <Progress
            value={progressPercent}
            className="h-2 rounded-full bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-sky-500 [&>div]:to-emerald-500 [&>div]:transition-all [&>div]:duration-700"
          />
        </div>

        {/* Card da pergunta */}
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            variants={containerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="rounded-2xl bg-white p-8 shadow-lg md:p-10"
          >
            {/* Pergunta */}
            <div className="mb-8 space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {currentQuestion.pergunta}
              </h2>
              {currentQuestion.subtitulo && (
                <p className="text-gray-600">{currentQuestion.subtitulo}</p>
              )}
            </div>

            {/* Opções como botões grandes */}
            <div className="space-y-3">
              {currentQuestion.opcoes.map((opcao, index) => {
                const isSelected =
                  state.answers[`q${state.currentQuestion}` as keyof typeof state.answers] ===
                  opcao.value
                const isHovered = hoveredOption === opcao.value

                return (
                  <motion.button
                    key={opcao.value}
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      answerQuestion(opcao.value)
                    }}
                    onMouseEnter={() => setHoveredOption(opcao.value)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className={`group relative w-full overflow-hidden rounded-xl border-2 px-6 py-4 transition-all duration-200 ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50"
                        : isHovered
                          ? "border-sky-400 bg-sky-50"
                          : "border-gray-200 bg-white hover:border-sky-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Ícone */}
                      {opcao.icon && (
                        <div className="mt-1 flex-shrink-0 text-2xl">
                          {opcao.icon}
                        </div>
                      )}

                      {/* Conteúdo */}
                      <div className="flex-1 text-left">
                        <p
                          className={`font-semibold transition-colors ${
                            isSelected
                              ? "text-emerald-700"
                              : "text-gray-900 group-hover:text-sky-700"
                          }`}
                        >
                          {opcao.label}
                        </p>
                        {opcao.description && (
                          <p className="mt-1 text-sm text-gray-600">
                            {opcao.description}
                          </p>
                        )}
                      </div>

                      {/* Indicador de seleção */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-1 flex-shrink-0"
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                            <span className="text-sm text-white">✓</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Botões de navegação */}
            <div className="mt-8 flex gap-3 border-t border-gray-100 pt-6">
              {state.currentQuestion > 1 && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="hidden sm:inline">Voltar</span>
                </button>
              )}

              {/* Botão próximo/finalizar */}
              <button
                onClick={() => {
                  const selectedAnswer =
                    state.answers[`q${state.currentQuestion}` as keyof typeof state.answers]
                  if (selectedAnswer) {
                    answerQuestion(selectedAnswer)
                  }
                }}
                disabled={
                  !state.answers[`q${state.currentQuestion}` as keyof typeof state.answers]
                }
                className={`flex-1 rounded-lg font-semibold py-3 transition-all ${
                  state.answers[`q${state.currentQuestion}` as keyof typeof state.answers]
                    ? "bg-gradient-to-r from-sky-500 to-emerald-500 text-white hover:shadow-lg active:scale-95"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {isLastQuestion ? "Finalizar" : "Próxima"}
                  {isLastQuestion ? "✓" : "→"}
                </div>
              </button>
            </div>

            {/* Dica de progresso */}
            <p className="mt-4 text-center text-xs text-gray-500">
              Você está quase lá! {5 - state.currentQuestion} pergunta{5 - state.currentQuestion !== 1 ? "s" : ""} restante{5 - state.currentQuestion !== 1 ? "s" : ""}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
