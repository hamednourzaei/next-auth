'use client'

import { useUser } from '@/lib/hooks/useUser'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import BoardDnD from '@/components/BoardDnD'
import { signOut } from 'next-auth/react'

export default function BoardPage() {
  const { user, isLoading, isAuthenticated } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/api/auth/signin')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">در حال بارگذاری...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    // این حالت به خاطر redirect در useEffect شاید نیازی به رندر نداشته باشد اما برای اطمینان
    return null
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          خوش آمدی، {user?.name || 'کاربر'}
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          خروج
        </button>
      </header>

      <main>
        <BoardDnD />
      </main>
    </div>
  )
}
