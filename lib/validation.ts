// =============================================================
// SOLUÇÕES 2M CLIMATIZAÇÃO — Schemas de Validação (Zod)
// =============================================================
// Todos os dados recebidos nas APIs são validados aqui antes de
// qualquer processamento. Nunca confiar em dados do cliente.
// =============================================================

import { z } from "zod"

// -------------------------------------------------------------
// Constantes (sem magic numbers)
// -------------------------------------------------------------
const NOME_MIN_LENGTH = 2
const NOME_MAX_LENGTH = 100
const WHATSAPP_LENGTH = 11 // apenas DDD + número (sem +55), ex: 71999999999
const SESSION_UUID_LENGTH = 36
const MAX_QUIZ_QUESTIONS = 5

// Opções válidas do quiz — espelham content/quiz.ts
// Centralizado aqui para validação server-side

/** Pergunta 1 — Problema com o ar-condicionado */
export const PROBLEMAS_VALIDOS = [
  "cheiro-ruim",
  "nao-resfria",
  "instalacao",
  "manutencao",
] as const

/** Pergunta 2 — Local do equipamento */
export const LOCAIS_VALIDOS = [
  "quarto",
  "sala",
  "cozinha",
  "escritorio",
  "outro",
] as const

/** Pergunta 3 — Capacidade do equipamento em BTUs */
export const EQUIPAMENTOS_VALIDOS = [
  "nao-sei",
  "9000",
  "12000",
  "18000",
  "24000+",
] as const

/** Pergunta 4 — Urgência do atendimento */
export const URGENCIAS_VALIDAS = [
  "hoje",
  "esta-semana",
  "duas-semanas",
  "pesquisando",
] as const

// -------------------------------------------------------------
// Schema: Submissão de Lead (POST /api/lead)
// -------------------------------------------------------------
export const LeadSchema = z.object({
  // Dados pessoais
  nome: z
    .string()
    .min(NOME_MIN_LENGTH, "Nome deve ter pelo menos 2 caracteres")
    .max(NOME_MAX_LENGTH, "Nome muito longo")
    .trim(),

  // WhatsApp: apenas dígitos com DDD, sem +55 (máscara aplicada no frontend)
  // Exemplo válido: 71999999999
  whatsapp: z
    .string()
    .regex(
      /^\d{11}$/,
      "WhatsApp inválido. Use o formato: DDD + número (11 dígitos)"
    ),

  // Respostas do quiz
  problema: z.enum(PROBLEMAS_VALIDOS, {
    errorMap: () => ({ message: "Opção de problema inválida" }),
  }),

  local: z.enum(LOCAIS_VALIDOS, {
    errorMap: () => ({ message: "Opção de local inválida" }),
  }),

  equipamento: z.enum(EQUIPAMENTOS_VALIDOS, {
    errorMap: () => ({ message: "Opção de equipamento inválida" }),
  }),

  urgencia: z.enum(URGENCIAS_VALIDAS, {
    errorMap: () => ({ message: "Opção de urgência inválida" }),
  }),

  bairro: z
    .string()
    .min(2, "Bairro obrigatório")
    .max(100, "Nome de bairro muito longo")
    .trim(),

  // UTM parameters (opcionais — vindos da URL da campanha)
  utmSource: z.string().max(50).optional(),
  utmMedium: z.string().max(50).optional(),
  utmCampaign: z.string().max(100).optional(),
  utmContent: z.string().max(100).optional(),
})

export type LeadInput = z.infer<typeof LeadSchema>

// -------------------------------------------------------------
// Schema: Progresso do Quiz (POST /api/quiz/progress)
// -------------------------------------------------------------
export const QuizProgressSchema = z.object({
  // UUID gerado no cliente para identificar o visitante anonimamente
  session: z
    .string()
    .length(SESSION_UUID_LENGTH, "Session ID inválido")
    .regex(/^[0-9a-f-]{36}$/, "Session ID deve ser um UUID válido"),

  // Pergunta atual (1 a MAX_QUIZ_QUESTIONS; 6 = concluiu)
  pergunta: z
    .number()
    .int()
    .min(1)
    .max(MAX_QUIZ_QUESTIONS + 1),

  // Respostas parciais (JSON serializado)
  respostas: z
    .object({
      q1: z.enum(PROBLEMAS_VALIDOS).optional(),
      q2: z.enum(LOCAIS_VALIDOS).optional(),
      q3: z.enum(EQUIPAMENTOS_VALIDOS).optional(),
      q4: z.enum(URGENCIAS_VALIDAS).optional(),
      q5: z.string().max(100).optional(),
    })
    .strict(),
})

export type QuizProgressInput = z.infer<typeof QuizProgressSchema>

// -------------------------------------------------------------
// Helpers de resposta de API (padronização)
// -------------------------------------------------------------
export interface ApiSuccess<T = unknown> {
  ok: true
  data: T
}

export interface ApiError {
  ok: false
  error: string
  details?: z.ZodError["errors"]
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError
