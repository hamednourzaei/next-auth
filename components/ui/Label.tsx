import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export default function Label({ children, ...props }: LabelProps) {
  return (
    <label className="block mb-1 font-medium text-gray-700" {...props}>
      {children}
    </label>
  )
}
