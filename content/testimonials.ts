// ATENÇÃO: Depoimentos abaixo são 100% FICTÍCIOS [PLACEHOLDER]
// Criados apenas para desenvolvimento — o cliente enviará depoimentos reais
// antes do go-live. O componente Testimonials.tsx exibe aviso visual em DEV.
//
// Instruções para o cliente: veja docs/manual-cliente.md

export interface Testimonial {
  id: string
  nome: string
  bairro: string
  servico: string
  rating: number    // 1-5 estrelas
  texto: string
  avatarInitials: string  // Iniciais para avatar gerado (sem foto real)
  isPlaceholder: true     // Flag obrigatória — nunca remover sem substituir por real
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    nome: "Maria Aparecida S.", // [PLACEHOLDER — fictício]
    bairro: "Pituba",
    servico: "Limpeza técnica",
    rating: 5,
    texto:
      "Excelente serviço! O técnico chegou no horário combinado, explicou tudo que fazia " +
      "e o ar ficou como novo. Recomendo demais para quem mora em Salvador.",
    avatarInitials: "MA",
    isPlaceholder: true,
  },
  {
    id: "t2",
    nome: "Carlos Eduardo R.", // [PLACEHOLDER — fictício]
    bairro: "Barra",
    servico: "Instalação de split",
    rating: 5,
    texto:
      "Instalaram meu ar-condicionado novo com muito cuidado e limpeza. " +
      "Preço justo e acabamento perfeito. Já indiquei para os vizinhos.",
    avatarInitials: "CE",
    isPlaceholder: true,
  },
  {
    id: "t3",
    nome: "Joana P.", // [PLACEHOLDER — fictício]
    bairro: "Lauro de Freitas",
    servico: "Reparo de emergência",
    rating: 5,
    texto:
      "Meu ar parou em pleno verão de Salvador. Chamei a 2M e o técnico veio no mesmo dia. " +
      "Resolveu rápido e com garantia. Atendimento top!",
    avatarInitials: "JP",
    isPlaceholder: true,
  },
]
