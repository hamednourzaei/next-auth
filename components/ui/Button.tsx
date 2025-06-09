import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  fullWidth?: boolean
}

export default function Button({ children, fullWidth = false, ...props }: ButtonProps) {
  return (
    <button
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed ${
        fullWidth ? 'w-full' : 'inline-block'
      }`}
      {...props}
    >
      {children}
    </button>
  )
}
