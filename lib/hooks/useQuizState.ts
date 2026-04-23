"use client"

// Hook de state machine do quiz
// Gerencia o estado de cada etapa, respostas e transições
// Usado pelo componente Quiz.tsx (Client Component)

import { useState, useCallback } from "react"
import type {
  PROBLEMAS_VALIDOS,
  URGENCIAS_VALIDAS,
  LOCAIS_VALIDOS,
  EQUIPAMENTOS_VALIDOS,
} from "@/lib/validation"

const TOTAL_QUESTIONS = 5

export type QuizStep =
  | "idle"       // Antes de iniciar
  | "q1"         // Qual é o problema?
  | "q2"         // Onde fica o equipamento?
  | "q3"         // Qual é a capacidade?
  | "q4"         // Qual é a urgência?
  | "q5"         // Qual é o bairro?
  | "result"     // Tela de resultado + formulário de captura
  | "redirecting" // Após submit — aguardando redirect para WhatsApp

export interface QuizAnswers {
  q1?: (typeof PROBLEMAS_VALIDOS)[number]
  q2?: (typeof LOCAIS_VALIDOS)[number]
  q3?: (typeof EQUIPAMENTOS_VALIDOS)[number]
  q4?: (typeof URGENCIAS_VALIDAS)[number]
  q5?: string // Bairro (texto livre / seleção)
}

export interface QuizState {
  step: QuizStep
  answers: QuizAnswers
  currentQuestion: number // 1-5
  isSubmitting: boolean
  error: string | null
}

export interface UseQuizStateReturn {
  state: QuizState
  startQuiz: () => void
  answerQuestion: (answer: string) => void
  goBack: () => void
  submitLead: (nome: string, whatsapp: string) => Promise<string | null>
  reset: () => void
}

const STEP_ORDER: QuizStep[] = ["idle", "q1", "q2", "q3", "q4", "q5", "result"]

const INITIAL_STATE: QuizState = {
  step: "idle",
  answers: {},
  currentQuestion: 0,
  isSubmitting: false,
  error: null,
}

/**
 * Hook principal do quiz.
 * Gerencia a state machine, navegação entre etapas e submissão do lead.
 */
export function useQuizState(): UseQuizStateReturn {
  const [state, setState] = useState<QuizState>(INITIAL_STATE)

  // Inicia o quiz (idle → q1)
  const startQuiz = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: "q1",
      currentQuestion: 1,
      answers: {},
      error: null,
    }))
  }, [])

  // Registra resposta e avança para a próxima etapa
  const answerQuestion = useCallback((answer: string) => {
    setState((prev) => {
      const currentIndex = STEP_ORDER.indexOf(prev.step)
      const nextStep = STEP_ORDER[currentIndex + 1] ?? "result"

      const questionKey = `q${prev.currentQuestion}` as keyof QuizAnswers
      const updatedAnswers: QuizAnswers = {
        ...prev.answers,
        [questionKey]: answer,
      }

      return {
        ...prev,
        step: nextStep,
        answers: updatedAnswers,
        currentQuestion:
          nextStep === "result" ? TOTAL_QUESTIONS : prev.currentQuestion + 1,
        error: null,
      }
    })
  }, [])

  // Volta uma etapa
  const goBack = useCallback(() => {
    setState((prev) => {
      const currentIndex = STEP_ORDER.indexOf(prev.step)
      if (currentIndex <= 1) return prev // Não volta de q1 para idle

      const prevStep = STEP_ORDER[currentIndex - 1] ?? "q1"
      return {
        ...prev,
        step: prevStep,
        currentQuestion: Math.max(1, prev.currentQuestion - 1),
        error: null,
      }
    })
  }, [])

  // Submete o lead e retorna a URL do WhatsApp (ou null em caso de erro)
  const submitLead = useCallback(
    async (nome: string, whatsapp: string): Promise<string | null> => {
      setState((prev) => ({ ...prev, isSubmitting: true, error: null }))

      try {
        const response = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome,
            whatsapp: whatsapp.replace(/\D/g, ""), // Remove máscara
            problema: state.answers.q1,
            local: state.answers.q2,
            equipamento: state.answers.q3,
            urgencia: state.answers.q4,
            bairro: state.answers.q5,
          }),
        })

        if (!response.ok) {
          const data = (await response.json()) as { error?: string }
          throw new Error(data.error ?? "Erro ao salvar lead")
        }

        const data = (await response.json()) as { whatsappUrl: string }

        setState((prev) => ({ ...prev, step: "redirecting", isSubmitting: false }))
        return data.whatsappUrl
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro inesperado. Tente novamente."
        setState((prev) => ({ ...prev, isSubmitting: false, error: message }))
        return null
      }
    },
    [state.answers]
  )

  // Reseta o quiz para o estado inicial
  const reset = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  return { state, startQuiz, answerQuestion, goBack, submitLead, reset }
}
