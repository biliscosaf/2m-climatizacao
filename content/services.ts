// Cards dos 6 serviços oferecidos pela 2M Climatização
// Cada card tem: ícone, título, descrição e CTA vinculado ao quiz
// Copy: content-seo refina os textos antes do go-live

export interface Service {
  id: string
  icon: string        // Nome do ícone Lucide
  title: string
  description: string
  ctaLabel: string
  quizStep?: string   // Qual passo do quiz abre ao clicar no CTA (ex: "q1=manutencao")
}

export const SERVICES: Service[] = [
  {
    id: "instalacao",
    icon: "package",
    title: "Instalação de Equipamento Novo",
    description:
      "Instalação completa de splits e sistemas de ar-condicionado com garantia de serviço. " +
      "Atendemos todas as marcas e modelos.",
    ctaLabel: "Solicitar instalação",
    quizStep: "q1=instalacao",
  },
  {
    id: "limpeza",
    icon: "droplets",
    title: "Limpeza Técnica",
    description:
      "Limpeza preventiva de filtros e serpentinas para manter o ar puro e o aparelho funcionando " +
      "com eficiência máxima.",
    ctaLabel: "Solicitar limpeza",
    quizStep: "q1=cheiro-ruim",
  },
  {
    id: "manutencao",
    icon: "shield-check",
    title: "Manutenção Preventiva",
    description:
      "Revisão periódica completa para evitar falhas e prolongar a vida útil do seu equipamento. " +
      "Recomendada a cada 6 meses.",
    ctaLabel: "Solicitar manutenção",
    quizStep: "q1=manutencao",
  },
  {
    id: "reparo",
    icon: "wrench",
    title: "Reparo de Emergência",
    description:
      "Atendimento urgente para equipamentos com defeito. Diagnóstico no local e solução " +
      "no mesmo dia sempre que possível.",
    ctaLabel: "Solicitar reparo urgente",
    quizStep: "q1=nao-resfria",
  },
  {
    id: "recarga-gas",
    icon: "flame",
    title: "Recarga de Gás Refrigerante",
    description:
      "Recarga de fluido refrigerante (R-22, R-410A) com equipamentos calibrados e " +
      "materiais homologados.",
    ctaLabel: "Solicitar recarga",
    quizStep: "q1=nao-resfria",
  },
  {
    id: "higienizacao",
    icon: "sparkles",
    title: "Higienização Profunda",
    description:
      "Limpeza com produtos bactericidas e fungicidas que eliminam fungos, bactérias e ácaros. " +
      "Ideal para alergias e doenças respiratórias.",
    ctaLabel: "Solicitar higienização",
    quizStep: "q1=cheiro-ruim",
  },
]
