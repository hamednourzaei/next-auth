import React from 'react'

interface AlertProps {
  variant?: 'error' | 'info' | 'success'
  children: React.ReactNode
}

export default function Alert({ variant = 'info', children }: AlertProps) {
  const baseClasses = 'p-3 rounded mb-4 text-sm font-medium'
  const variants = {
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
  }
  return <div className={`${baseClasses} ${variants[variant]}`}>{children}</div>
}
