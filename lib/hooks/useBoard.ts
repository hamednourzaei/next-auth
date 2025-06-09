'use client'
import { useState } from 'react'

type TaskStatus = 'todo' | 'inProgress' | 'done'

type Task = {
  id: string
  content: string
  status: TaskStatus
}

export function useBoard() {
  const [columns, setColumns] = useState<{ [key in TaskStatus]: Task[] }>({
    todo: [],
    inProgress: [],
    done: [],
  })

  const moveTask = (id: string, from: TaskStatus, to: TaskStatus) => {
    setColumns(prev => {
      const task = prev[from].find(t => t.id === id)
      if (!task) return prev
      return {
        ...prev,
        [from]: prev[from].filter(t => t.id !== id),
        [to]: [...prev[to], { ...task, status: to }],
      }
    })
  }

  const addTask = (task: Task) => {
    setColumns(prev => ({
      ...prev,
      [task.status]: [...prev[task.status], task],
    }))
  }

  const removeTask = (id: string, from: TaskStatus) => {
    setColumns(prev => ({
      ...prev,
      [from]: prev[from].filter(t => t.id !== id),
    }))
  }

  return { columns, setColumns, moveTask, addTask, removeTask }
}
