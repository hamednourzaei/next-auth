'use client'

import React from 'react'
import type { Task, TaskStatus } from '@/lib/types'

type ColumnProps = {
  id: string
  title: string
  tasks: Task[]
  onMoveTask: (id: string, from: TaskStatus, to: TaskStatus) => Promise<void>
  onRemoveTask: (id: string, from: TaskStatus) => Promise<void>
  loading?: boolean
}

export function Column({ title, tasks, loading }: ColumnProps) {
  return (
    <div
      className={`w-1/3 p-4 bg-gray-100 rounded-xl shadow ${
        loading ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {tasks.map(task => (
        <div key={task.id} className="p-2 bg-white rounded shadow mb-2">
          {task.content}
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  )
}
