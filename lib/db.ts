// Prisma Client singleton — evita múltiplas conexões em desenvolvimento (hot reload do Next.js)
// Em produção, cada instância serverless cria sua própria conexão (comportamento esperado)

import { PrismaClient } from "@prisma/client"

// Declaração do global para TypeScript
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["warn", "error"],
  })

// Em desenvolvimento, reutiliza a conexão entre hot reloads
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
