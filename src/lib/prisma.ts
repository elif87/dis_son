import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'error', 'warn'],
  })
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Event tipleri için interface'ler
interface QueryEvent {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

interface ErrorEvent {
  message: string
  target: string
}

// Event handler'ları
prisma.$on('query' as never, (e: QueryEvent) => {
  console.log('Query:', {
    query: e.query,
    params: e.params,
    duration: e.duration,
    timestamp: e.timestamp
  })
})

prisma.$on('error' as never, (e: ErrorEvent) => {
  console.error('Prisma Error:', e)
  // Bağlantıyı yeniden kurmayı dene
  try {
    prisma.$connect()
  } catch (error) {
    console.error('Bağlantı yeniden kurulamadı:', error)
  }
})

// Uygulama kapanırken bağlantıyı düzgün şekilde kapat
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

// Beklenmeyen hatalar için
process.on('uncaughtException', async (error) => {
  console.error('Beklenmeyen hata:', error)
  await prisma.$disconnect()
  process.exit(1)
})

process.on('unhandledRejection', async (error) => {
  console.error('İşlenmeyen Promise reddi:', error)
  await prisma.$disconnect()
  process.exit(1)
}) 