// Configuração completa do quiz — perguntas, opções e microcopy
// Centralizado aqui para facilitar ajustes sem tocar nos componentes React
// Todos os valores de "value" correspondem aos enums de lib/validation.ts

export interface QuizOption {
  value: string
  label: string
  icon?: string   // Emoji ou nome de ícone Lucide
  description?: string
}

export interface QuizQuestion {
  id: string
  step: number    // 1-5
  pergunta: string
  subtitulo?: string
  opcoes: QuizOption[]
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // =========================================================
  // PERGUNTA 1 — Qual é o problema?
  // =========================================================
  {
    id: "q1",
    step: 1,
    pergunta: "O que está acontecendo com o seu ar-condicionado?",
    subtitulo: "Escolha a opção que melhor descreve sua situação",
    opcoes: [
      {
        value: "cheiro-ruim",
        label: "Está com cheiro ruim ou sujo",
        icon: "wind",
        description: "Ar com odor estranho, fungo ou sujeira visível",
      },
      {
        value: "nao-resfria",
        label: "Parou de funcionar ou resfria mal",
        icon: "thermometer",
        description: "Liga mas não gela, ou parou completamente",
      },
      {
        value: "instalacao",
        label: "Quero instalar um equipamento novo",
        icon: "package",
        description: "Comprei um ar-condicionado e preciso instalar",
      },
      {
        value: "manutencao",
        label: "Quero fazer manutenção preventiva",
        icon: "shield-check",
        description: "Revisão periódica para evitar problemas",
      },
    ],
  },

  // =========================================================
  // PERGUNTA 2 — Onde fica o equipamento?
  // =========================================================
  {
    id: "q2",
    step: 2,
    pergunta: "O ar-condicionado fica em qual ambiente?",
    subtitulo: "Isso nos ajuda a estimar o tempo e custo do serviço",
    opcoes: [
      {
        value: "quarto",
        label: "Quarto",
        icon: "bed",
      },
      {
        value: "sala",
        label: "Sala",
        icon: "sofa",
      },
      {
        value: "cozinha",
        label: "Cozinha / Área de serviço",
        icon: "utensils",
        description: "Maior acúmulo de gordura e sujeira",
      },
      {
        value: "escritorio",
        label: "Escritório / Comércio",
        icon: "building-2",
        description: "Empresa, loja, clínica ou escritório",
      },
      {
        value: "outro",
        label: "Outro ambiente",
        icon: "more-horizontal",
      },
    ],
  },

  // =========================================================
  // PERGUNTA 3 — Tipo/capacidade do aparelho
  // =========================================================
  {
    id: "q3",
    step: 3,
    pergunta: "Você sabe a potência do seu ar-condicionado?",
    subtitulo: "Geralmente está na etiqueta do aparelho ou na caixa",
    opcoes: [
      {
        value: "nao-sei",
        label: "Não sei / não tenho certeza",
        icon: "help-circle",
        description: "O técnico verifica no local — sem problema",
      },
      {
        value: "9000",
        label: "Pequeno (9.000 BTUs)",
        icon: "airVent",
        description: "Quartos pequenos e ambientes de até 20m²",
      },
      {
        value: "12000",
        label: "Médio (12.000 BTUs)",
        icon: "airVent",
        description: "O mais comum — salas e quartos médios",
      },
      {
        value: "18000",
        label: "Grande (18.000 BTUs)",
        icon: "airVent",
        description: "Salas grandes, escritórios e comércios",
      },
      {
        value: "24000+",
        label: "Muito grande (24.000 BTUs ou mais)",
        icon: "airVent",
        description: "Ambientes grandes, industriais ou múltiplos splits",
      },
    ],
  },

  // =========================================================
  // PERGUNTA 4 — Urgência
  // =========================================================
  {
    id: "q4",
    step: 4,
    pergunta: "Quando você precisa do atendimento?",
    subtitulo: "Assim priorizamos sua solicitação",
    opcoes: [
      {
        value: "hoje",
        label: "Hoje mesmo!",
        icon: "zap",
        description: "Atendimento emergencial — verificamos disponibilidade",
      },
      {
        value: "esta-semana",
        label: "Essa semana",
        icon: "calendar",
        description: "Agendamos para os próximos dias",
      },
      {
        value: "duas-semanas",
        label: "Nas próximas 2 semanas",
        icon: "calendar-days",
        description: "Temos flexibilidade de horário",
      },
      {
        value: "pesquisando",
        label: "Ainda estou pesquisando",
        icon: "search",
        description: "Receba a estimativa e nos contate quando quiser",
      },
    ],
  },

  // =========================================================
  // PERGUNTA 5 — Bairro
  // Nota: as opções aqui são PLACEHOLDER — config/areas.ts tem a lista real
  // O componente Quiz.tsx deve carregar a lista de config/areas.ts
  // =========================================================
  {
    id: "q5",
    step: 5,
    pergunta: "Em qual bairro / região você está?",
    subtitulo: "Verificamos a disponibilidade e calculamos o deslocamento",
    opcoes: [], // Preenchido dinamicamente a partir de config/areas.ts
  },
]

// Microcopy de progresso exibido na ProgressBar
export const QUIZ_PROGRESS_LABELS: Record<number, string> = {
  1: "Vamos entender seu problema",
  2: "Quase lá!",
  3: "Só mais um pouco...",
  4: "Última etapa antes do resultado",
  5: "Calculando sua estimativa...",
}

// Texto do botão de avanço por etapa
export const QUIZ_CTA_LABELS: Record<number, string> = {
  1: "Próxima pergunta →",
  2: "Próxima pergunta →",
  3: "Próxima pergunta →",
  4: "Próxima pergunta →",
  5: "Ver minha estimativa →",
}
