// Tabela de preços estimados por serviço e capacidade
// Usada na tela de resultado do quiz para exibir a faixa de preço
// IMPORTANTE: São estimativas visuais para fins de conversão
// O orçamento real é dado pelo técnico após avaliação

// Chaves: problema (Q1) + equipamento (Q3)
// Formato: { min: number, max: number, nota?: string }

export interface PriceRange {
  min: number
  max: number
  nota?: string  // Exibida como disclaimer na tela de resultado
}

// Preços base por serviço [PLACEHOLDER — cliente confirma antes do go-live]
export const PRICING: Record<string, Record<string, PriceRange>> = {
  "cheiro-ruim": {
    "nao-sei":   { min: 120, max: 350 },
    "9000":      { min: 120, max: 200, nota: "Limpeza técnica" },
    "12000":     { min: 150, max: 250, nota: "Limpeza técnica" },
    "18000":     { min: 200, max: 300, nota: "Higienização profunda" },
    "24000+":    { min: 280, max: 400, nota: "Higienização profunda" },
  },
  "nao-resfria": {
    "nao-sei":   { min: 150, max: 600, nota: "Depende da peça necessária" },
    "9000":      { min: 180, max: 350 },
    "12000":     { min: 200, max: 450 },
    "18000":     { min: 280, max: 500 },
    "24000+":    { min: 350, max: 700 },
  },
  "instalacao": {
    "nao-sei":   { min: 350, max: 900 },
    "9000":      { min: 350, max: 500 },
    "12000":     { min: 450, max: 700 },
    "18000":     { min: 600, max: 900 },
    "24000+":    { min: 800, max: 1200, nota: "Pode variar com infraestrutura" },
  },
  "manutencao": {
    "nao-sei":   { min: 150, max: 300 },
    "9000":      { min: 150, max: 220 },
    "12000":     { min: 180, max: 280 },
    "18000":     { min: 200, max: 300 },
    "24000+":    { min: 250, max: 400 },
  },
}

/**
 * Retorna a faixa de preço estimada com base nas respostas do quiz.
 * Fallback para valores genéricos se a combinação não for encontrada.
 */
export function getPriceEstimate(
  problema: string,
  equipamento: string
): PriceRange {
  const servicePrices = PRICING[problema]
  if (!servicePrices) {
    return { min: 120, max: 900, nota: "Orçamento personalizado após diagnóstico" }
  }

  return (
    servicePrices[equipamento] ??
    servicePrices["nao-sei"] ?? { min: 120, max: 900 }
  )
}

// Labels amigáveis dos serviços para exibição na tela de resultado
export const SERVICO_LABELS: Record<string, string> = {
  "cheiro-ruim": "Limpeza Técnica / Higienização",
  "nao-resfria": "Reparo / Recarga de Gás",
  "instalacao": "Instalação de Equipamento",
  "manutencao": "Manutenção Preventiva",
}
