"use client"

// Quiz interativo — máquina de estados com 5 perguntas
// Requisitos: progress bar sky-500, opções em ghost variant,
// transições slide+fade 300ms, integração com ResultScreen

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuizState } from "@/lib/hooks/useQuizState"
import { QUIZ_QUESTIONS, QUIZ_PROGRESS_LABELS, QUIZ_CTA_LABELS } from "@/content/quiz"
import { areas } from "@/config/areas"
import { ResultScreen } from "./ResultScreen"

// Variantes de animação
const quizSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

export function Quiz() {
  const { state, startQuiz, answerQuestion, goBack, reset } = useQuizState()
  const [direction, setDirection] = useState(0)

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

  // Se ainda não iniciou o quiz, mostrar CTA
  if (state.step === "idle") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center"
      >
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="space-y-6 p-8">
            <div className="text-center">
              <h2 className="text-h3 mb-2 font-semibold text-gray-900">
                Descubra o preço do seu serviço
              </h2>
              <p className="text-body text-gray-700">
                Responda 5 perguntas rápidas e receba uma estimativa de preço personalizada.
              </p>
            </div>
            <Button
              onClick={startQuiz}
              size="lg"
              className="w-full rounded-full bg-orange-heat-500 px-8 py-4 text-white transition-colors hover:bg-orange-heat-600"
            >
              Iniciar Quiz →
            </Button>
            <p className="text-center text-body-sm text-gray-500">
              Leva apenas 2 minutos
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Tela de resultado
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

  // Encontrar pergunta atual
  const currentQuestion = questions.find((q) => q.id === state.step)
  if (!currentQuestion) return null

  const progressPercent = (state.currentQuestion / 5) * 100
  const progressLabel = QUIZ_PROGRESS_LABELS[state.currentQuestion]
  const ctaLabel = QUIZ_CTA_LABELS[state.currentQuestion]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center"
    >
      <Card className="w-full max-w-2xl border-0 shadow-xl">
        <CardHeader className="space-y-4 border-b border-gray-100 pb-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-body-sm font-medium text-gray-600">
                Pergunta {state.currentQuestion} de 5
              </span>
              <span className="text-body-sm text-gray-500">{progressLabel}</span>
            </div>
            <Progress
              value={progressPercent}
              className="h-2 rounded-full bg-sky-100 [&>div]:bg-sky-500 [&>div]:transition-all [&>div]:duration-500"
            />
          </div>

          {/* Título da pergunta */}
          <div>
            <CardTitle className="text-h3 mb-2 font-semibold text-gray-900">
              {currentQuestion.pergunta}
            </CardTitle>
            {currentQuestion.subtitulo && (
              <p className="text-body text-gray-600">{currentQuestion.subtitulo}</p>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-6">
          {/* Opções com AnimatePresence para slide de saída */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={state.step}
              custom={direction}
              variants={quizSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-3"
            >
              {currentQuestion.opcoes.map((opcao) => {
                const isSelected =
                  state.answers[`q${state.currentQuestion}` as keyof typeof state.answers] ===
                  opcao.value

                return (
                  <motion.button
                    key={opcao.value}
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => {
                      setDirection(1)
                      answerQuestion(opcao.value)
                    }}
                    className={`
                      group relative w-full rounded-lg border-2 px-6 py-4 text-left
                      transition-all duration-200
                      ${
                        isSelected
                          ? "border-sky-600 bg-sky-100"
                          : "border-gray-200 bg-white hover:border-sky-500 hover:bg-sky-50"
                      }
                    `}
                  >
                    <div className="flex items-start gap-4">
                      {/* Ícone */}
                      {opcao.icon && (
                        <div className="mt-0.5 flex-shrink-0 text-xl">
                          {opcao.icon}
                        </div>
                      )}
                      {/* Conteúdo */}
                      <div className="flex-1">
                        <p
                          className={`font-medium transition-colors ${
                            isSelected ? "text-sky-700" : "text-gray-900 group-hover:text-sky-700"
                          }`}
                        >
                          {opcao.label}
                        </p>
                        {opcao.description && (
                          <p className="mt-1 text-body-sm text-gray-600">
                            {opcao.description}
                          </p>
                        )}
                      </div>
                      {/* Indicador de seleção */}
                      {isSelected && (
                        <div className="mt-0.5 flex-shrink-0">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500"
                          >
                            <span className="text-sm text-white">✓</span>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Botões de navegação */}
          <div className="flex gap-3 pt-4">
            {state.currentQuestion > 1 && (
              <Button
                onClick={() => {
                  setDirection(-1)
                  goBack()
                }}
                variant="outline"
                className="flex-1 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                ← Voltar
              </Button>
            )}
            <Button
              onClick={() => {
                setDirection(1)
                const selectedAnswer = state.answers[
                  `q${state.currentQuestion}` as keyof typeof state.answers
                ]
                if (selectedAnswer) {
                  answerQuestion(selectedAnswer)
                }
              }}
              disabled={
                !state.answers[`q${state.currentQuestion}` as keyof typeof state.answers]
              }
              className="flex-1 rounded-full bg-sky-500 px-6 py-3 text-white transition-colors hover:bg-sky-600 disabled:bg-gray-300"
            >
              {ctaLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
