// lib/db.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // این کار برای جلوگیری از ایجاد چندین instance Prisma هنگام توسعه است
  // چون در حالت توسعه Next.js رفرش می‌شود و باعث خطا می‌شود
  // در production نیازی به این نیست
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // لاگ کوئری‌ها برای دیباگ (اختیاری)
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
