'use client'

import React, { useState, FormEvent } from 'react'

type AddTaskFormProps = {
  onAdd: (content: string) => void | Promise<void>
  loading?: boolean
}

export function AddTaskForm({ onAdd, loading = false }: AddTaskFormProps) {
  const [content, setContent] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    await onAdd(content.trim())
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add new task"
        disabled={loading}
        className="flex-grow rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}
