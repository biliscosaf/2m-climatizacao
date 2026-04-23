// Perguntas frequentes — usadas na seção FAQ com accordion e schema.org FAQPage
// content-seo refina os textos antes do go-live

export interface FaqItem {
  id: string
  pergunta: string
  resposta: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    pergunta: "Quanto tempo demora uma limpeza de ar-condicionado?",
    resposta:
      "Uma limpeza técnica básica leva entre 30 e 60 minutos por unidade, dependendo " +
      "do tamanho do aparelho e do nível de sujeira. A higienização profunda pode levar " +
      "de 1 a 2 horas. O técnico avalia no local e informa antes de começar.",
  },
  {
    id: "faq-2",
    pergunta: "O serviço tem garantia?",
    resposta:
      "Sim! Todos os nossos serviços têm garantia de 90 dias. Se o problema voltar " +
      "dentro desse prazo por falha do serviço prestado, retornamos sem custo adicional.",
  },
  {
    id: "faq-3",
    pergunta: "Atendem no final de semana?",
    resposta:
      "Atendemos de segunda a sábado, das 8h às 18h. Para emergências aos domingos, " +
      "entre em contato via WhatsApp e verificamos disponibilidade.",
  },
  {
    id: "faq-4",
    pergunta: "Preciso estar em casa durante o serviço?",
    resposta:
      "Sim, é necessário que um responsável maior de 18 anos esteja presente durante " +
      "toda a execução do serviço para autorizar e acompanhar o trabalho.",
  },
  {
    id: "faq-5",
    pergunta: "Vocês trazem todos os equipamentos necessários?",
    resposta:
      "Sim! Nossos técnicos chegam com todos os equipamentos, produtos de limpeza " +
      "e ferramentas necessárias. Você não precisa providenciar nada.",
  },
  {
    id: "faq-6",
    pergunta: "Como funciona o pagamento?",
    resposta:
      "Aceitamos Pix, cartão de crédito e débito, e dinheiro. O pagamento é feito " +
      "após a conclusão e aprovação do serviço.",
  },
  {
    id: "faq-7",
    pergunta: "Qual é a área de atendimento?",
    resposta:
      "Atendemos toda Salvador e região metropolitana: Lauro de Freitas, Camaçari, " +
      "Simões Filho e Dias d'Ávila. Para outras localidades, consulte disponibilidade.",
  },
  {
    id: "faq-8",
    pergunta: "O diagnóstico tem custo?",
    resposta:
      "O diagnóstico inicial é gratuito. O orçamento do reparo ou serviço é fornecido " +
      "antes de qualquer trabalho ser iniciado. Você decide se quer prosseguir.",
  },
]
