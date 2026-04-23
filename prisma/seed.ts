// =============================================================
// SOLUÇÕES 2M CLIMATIZAÇÃO — Prisma Seed
// =============================================================
// Dados fictícios para desenvolvimento e testes.
// Todos os dados abaixo são PLACEHOLDERS — NÃO representam clientes reais.
//
// Para executar: npm run db:seed
// =============================================================

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Iniciando seed com dados fictícios [PLACEHOLDER]...")

  // Limpa dados existentes para seed idempotente
  await prisma.quizProgress.deleteMany()
  await prisma.lead.deleteMany()

  // Seed com dados fictícios para desenvolvimento e testes
  // Todos os dados abaixo são 100% PLACEHOLDERS
  const leads = await prisma.lead.createMany({
    data: [
      {
        nome: "Maria Silva [PLACEHOLDER]",
        whatsapp: "5571900000001",
        problema: "cheiro-ruim",
        local: "quarto",
        equipamento: "12000",
        urgencia: "esta-semana",
        bairro: "Pituba",
        convertido: true,
        utmSource: "facebook",
        utmMedium: "cpc",
        utmCampaign: "ar-condicionado-salvador",
      },
      {
        nome: "João Santos [PLACEHOLDER]",
        whatsapp: "5571900000002",
        problema: "nao-resfria",
        local: "sala",
        equipamento: "18000",
        urgencia: "hoje",
        bairro: "Barra",
        convertido: false,
        utmSource: "facebook",
        utmMedium: "cpc",
        utmCampaign: "ar-condicionado-salvador",
      },
      {
        nome: "Antônio Oliveira [PLACEHOLDER]",
        whatsapp: "5571900000003",
        problema: "instalacao",
        local: "escritorio",
        equipamento: "24000+",
        urgencia: "duas-semanas",
        bairro: "Lauro de Freitas",
        convertido: true,
        utmSource: "facebook",
        utmMedium: "cpc",
        utmCampaign: "ar-condicionado-salvador",
      },
      {
        nome: "Carla Costa [PLACEHOLDER]",
        whatsapp: "5571900000004",
        problema: "manutencao",
        local: "cozinha",
        equipamento: "9000",
        urgencia: "pesquisando",
        bairro: "Cajazeiras",
        convertido: false,
        utmSource: "facebook",
        utmMedium: "cpc",
        utmCampaign: "ar-condicionado-salvador",
      },
    ],
  })

  // Quiz progress fictício (abandono em diferentes etapas)
  const quizProgresses = await prisma.quizProgress.createMany({
    data: [
      {
        session: "12345678-1234-1234-1234-123456789abc",
        pergunta: 2, // Abandonou na pergunta 2
        respostas: JSON.stringify({ q1: "cheiro-ruim" }),
      },
      {
        session: "87654321-4321-4321-4321-dcba98765432",
        pergunta: 4, // Abandonou na pergunta 4
        respostas: JSON.stringify({
          q1: "nao-resfria",
          q2: "sala",
          q3: "12000",
        }),
      },
      {
        session: "abcdef12-3456-7890-abcd-ef1234567890",
        pergunta: 6, // Completou o quiz
        respostas: JSON.stringify({
          q1: "instalacao",
          q2: "escritorio",
          q3: "18000",
          q4: "esta-semana",
          q5: "Barra",
        }),
      },
    ],
  })

  console.log(
    `Seed concluído com sucesso:\n` +
    `  - ${leads.count} leads criados\n` +
    `  - ${quizProgresses.count} quiz progresses criados\n` +
    `Banco de dados pronto para desenvolvimento.`
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("Erro no seed:", e)
    await prisma.$disconnect()
    process.exit(1)
  })
